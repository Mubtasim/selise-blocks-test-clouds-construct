/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useCallback } from 'react';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { useForgotPassword, useResendActivation } from 'features/auth/hooks/use-auth';
import { useGetUsersQuery } from 'features/iam/hooks/use-iam';
import { createIamTableColumns } from 'features/iam/components/iam-table/iam-table-columns';
import { IamTableToolbar } from 'features/iam/components/iam-table/iam-table-toolbar';
import { IamData } from 'features/iam/services/user-service';
import { useIsMobile } from 'hooks/use-mobile';
import { UserDetails } from 'features/iam/components/user-details/user-details';
import ExpandedUserDetails from 'features/iam/components/user-details-mobile-view/expanded-user-details';
import { Table } from '@tanstack/react-table';
import DataTable from 'components/blocks/data-table/data-table';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

const TableToolbar = ({
  table,
  onSearch,
  columns,
}: {
  table: Table<IamData>;
  onSearch: (filters: { email: string; name: string }) => void;
  columns: any[];
}) => {
  return <IamTableToolbar table={table} onSearch={onSearch} columns={columns} />;
};

const IamTablePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IamData | null>(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isResendActivationModalOpen, setIsResendActivationModalOpen] = useState(false);
  const { mutateAsync: resetPassword } = useForgotPassword();
  const { mutateAsync: resendActivation } = useResendActivation();

  const [filters, setFilters] = useState({
    email: '',
    name: '',
  });

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });

  const queryParams = {
    page: paginationState.pageIndex,
    pageSize: paginationState.pageSize,
    filter: filters,
  };

  const { data, isLoading, error } = useGetUsersQuery(queryParams);

  const handlePaginationChange = useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      setPaginationState((prev) => ({
        ...prev,
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      }));
    },
    []
  );

  useEffect(() => {
    if (data?.totalCount !== undefined) {
      setPaginationState((prev) => ({
        ...prev,
        totalCount: data.totalCount,
      }));
    }
  }, [data?.totalCount]);

  const handleSearch = useCallback((newFilters: { email: string; name: string }) => {
    setFilters(newFilters);
    setPaginationState((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, []);

  const handleConfirmResetPassword = async () => {
    if (!selectedUser) return;
    try {
      await resetPassword({ email: selectedUser.email });
      setIsResetPasswordModalOpen(false);
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  const handleConfirmActivation = async () => {
    if (!selectedUser) return;
    try {
      await resendActivation({ userId: selectedUser.itemId });
      setIsResendActivationModalOpen(false);
    } catch (error) {
      console.error('Failed to resend activation:', error);
    }
  };

  const handleViewDetails = (user: IamData) => {
    setSelectedUser(user);
    setOpenSheet(true);
  };

  //Disabled the scrolling when userDetails sheet open
  useEffect(() => {
    if (openSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openSheet]);

  const handleResetPassword = (user: IamData) => {
    setSelectedUser(user);
    setIsResetPasswordModalOpen(true);
  };

  const handleResendActivation = (user: IamData) => {
    setSelectedUser(user);
    setIsResendActivationModalOpen(true);
  };

  const columns = createIamTableColumns({
    onViewDetails: handleViewDetails,
    onResetPassword: handleResetPassword,
    onResendActivation: handleResendActivation,
  });

  if (error) {
    return <div className="p-4 text-error">Error loading users: {error.error?.message}</div>;
  }

  const renderExpandedContent = (user: IamData) => {
    return (
      <ExpandedUserDetails
        user={user}
        onResetPassword={handleResetPassword}
        onResendActivation={handleResendActivation}
      />
    );
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-full flex-col flex w-full gap-6 md:gap-8">
        <h2 className="text-2xl font-bold tracking-tight">Identity Access Management</h2>
        <DataTable
          data={data?.data || []}
          columns={columns}
          onRowClick={handleViewDetails}
          isLoading={isLoading}
          error={error}
          toolbar={(table: Table<IamData>) => (
            <TableToolbar table={table} onSearch={handleSearch} columns={columns} />
          )}
          pagination={{
            pageIndex: paginationState.pageIndex,
            pageSize: paginationState.pageSize,
            totalCount: paginationState.totalCount,
          }}
          onPaginationChange={handlePaginationChange}
          manualPagination={true}
          expandedContent={renderExpandedContent}
          mobileColumns={['fullName']}
          expandable={true}
        />
      </div>

      {!isMobile && (
        <UserDetails open={openSheet} onOpenChange={setOpenSheet} selectedUser={selectedUser} />
      )}

      <ConfirmationModal
        open={isResetPasswordModalOpen}
        onOpenChange={setIsResetPasswordModalOpen}
        title="Reset password for this user?"
        description={`Resetting the password for ${selectedUser?.firstName} ${selectedUser?.lastName} (${selectedUser?.email}) will send a password reset email to the user. Are you sure you want to proceed?`}
        onConfirm={handleConfirmResetPassword}
      />

      <ConfirmationModal
        open={isResendActivationModalOpen}
        onOpenChange={setIsResendActivationModalOpen}
        title="Activate this user?"
        description={`Activating the user ${selectedUser?.firstName} ${selectedUser?.lastName} (${selectedUser?.email}) will restore their access. Are you sure you want to proceed?`}
        onConfirm={handleConfirmActivation}
      />
    </div>
  );
};

export default IamTablePage;

/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { IamData } from '../../services/user-service';
import { useState } from 'react';
import { EditIamProfileDetails } from 'features/profile/component/modals/edit-iam-profile-details/edit-iam-profile-details';

interface ExpandedUserDetailsProps {
  user: IamData;
  onResetPassword: (user: IamData) => void;
  onResendActivation: (user: IamData) => void;
}

const ExpandedUserDetails: React.FC<ExpandedUserDetailsProps> = ({
  user,
  onResetPassword,
  // onResendActivation,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const formatLastLoginTime = (lastLoggedInTime: string | Date | null | undefined) => {
    if (!lastLoggedInTime) {
      return '-';
    }

    const date = new Date(lastLoggedInTime);

    if (date.getFullYear() === 1) {
      return '-';
    }

    try {
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return '-';
    }
  };
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-medium-emphasis">Email</h3>
          <p className="text-sm text-high-emphasis">{user.email}</p>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-medium-emphasis">Mobile no.</h3>
            <p className="text-sm text-high-emphasis">{user.phoneNumber ?? '-'}</p>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-medium-emphasis">Role(s)</h3>
            <p className="text-sm text-high-emphasis first-letter:uppercase">
              {user.roles && user.roles.length > 0
                ? user.roles.map((role) => `- ${role}`).join('\n')
                : '-'}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-medium-emphasis">Joined on</h3>
            <p className="text-sm text-high-emphasis">
              {new Date(user.createdDate).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-medium-emphasis">Last log in</h3>
            <div className="text-sm text-high-emphasis">
              {user.lastLoggedInTime && new Date(user.lastLoggedInTime).getFullYear() !== 1 ? (
                formatLastLoginTime(user.lastLoggedInTime)
              ) : (
                <div className="text-muted-foreground">-</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <h3 className="text-sm  text-medium-emphasis">Status</h3>
            <h3 className={user.active ? 'text-success ' : 'text-error'}>
              {user.active ? 'Active' : 'Deactivated'}
            </h3>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-medium-emphasis">MFA</h3>
            <p className="text-sm text-high-emphasis">{user.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button size="sm" className="w-full" onClick={handleEditClick}>
          Edit
        </Button>
        <div className="flex w-full flex-row gap-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onResetPassword(user)}
          >
            {user?.active ? 'Reset Password' : 'Resend Activation Link'}
          </Button>
          {user?.active && (
            <Button
              variant="outline"
              size="sm"
              className="w-full disabled cursor-not-allowed opacity-50 text-error hover:text-error hover:opacity-50"
              onClick={() => {}}
            >
              Deactivate User
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {user && <EditIamProfileDetails userInfo={user} onClose={handleCloseEditModal} />}
      </Dialog>
    </div>
  );
};

export default ExpandedUserDetails;

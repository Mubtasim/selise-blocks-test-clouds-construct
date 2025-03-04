import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@tanstack/react-table';
import { AdvancedTableColumnsToolbar } from 'features/inventory/component/advance-table-columns-toolbar/advance-table-columns-toolbar';
import AdvanceDataTable from 'features/inventory/component/advance-data-table/advance-data-table';
import { createAdvanceTableColumns } from 'features/inventory/component/advance-table-columns/advance-table-columns';
import { InventoryData, inventoryData } from 'features/inventory/services/inventory-service';
import { AdvanceTableFilterToolbar } from 'features/inventory/component/advance-table-filter-toolbar/advance-table-filter-toolbar';
import { AdvanceExpandRowContent } from 'features/inventory/component/advance-expand-row-content/advance-expand-row-content';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export function Inventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<InventoryData[]>([]);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: inventoryData.length,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(inventoryData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleInventoryDetails = (data: InventoryData) => {
    navigate(`/inventory-details/${data.itemId}`);
  };

  const columns = createAdvanceTableColumns();

  const renderColumnsToolbar = (table: Table<InventoryData>) => (
    <AdvancedTableColumnsToolbar
      disabledColumns={['itemName', 'stock', 'price', 'status']}
      table={table}
      title="Inventory"
    />
  );

  return (
    <div className="flex w-full flex-col">
      <AdvanceDataTable
        data={data}
        columns={columns}
        onRowClick={handleInventoryDetails}
        isLoading={isLoading}
        error={null}
        columnsToolbar={(table) => renderColumnsToolbar(table)}
        filterToolbar={(table) => <AdvanceTableFilterToolbar table={table} />}
        expandRowContent={(rowId, colSpan) => (
          <AdvanceExpandRowContent rowId={rowId} colSpan={colSpan} data={data} />
        )}
        pagination={{
          pageIndex: paginationState.pageIndex,
          pageSize: paginationState.pageSize,
          totalCount: paginationState.totalCount,
        }}
        columnPinningConfig={{ left: ['select', 'itemName'] }}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}

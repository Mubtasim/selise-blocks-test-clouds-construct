import { Loader2, Monitor, Smartphone, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState, useEffect, useMemo, useRef } from 'react';
import { IDeviceSession } from '../../services/device.service';
import { useGetSessions } from '../../hooks/use-sessions';
import { ScrollArea, ScrollBar } from 'components/ui/scroll-area';

interface IBrowserCellProps {
  deviceInfo?: {
    Browser?: string;
  };
}

export const Devices = () => {
  const [deviceSessions, setDeviceSessions] = useState<IDeviceSession[]>([]);
  const [hasMore, setHasMore] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 10;

  const { data: sessions, isLoading, isFetching } = useGetSessions(page, PAGE_SIZE);

  const parseMongoSession = (sessionStr: string) => {
    try {
      const cleanedJson = sessionStr
        .replace(/ObjectId\("([^"]*)"\)/g, '"$1"')
        .replace(/ISODate\("([^"]*)"\)/g, '"$1"')
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');

      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error('Error parsing session:', error);
      return null;
    }
  };

  useEffect(() => {
    if (sessions) {
      const sessionsArray = sessions as unknown as string[];

      const processedSessions = sessionsArray
        .map((sessionStr) => {
          const parsed = parseMongoSession(sessionStr);
          if (!parsed) return null;

          return {
            ...parsed,
            IssuedUtc: new Date(parsed.IssuedUtc),
            ExpiresUtc: new Date(parsed.ExpiresUtc),
            CreateDate: new Date(parsed.CreateDate),
            UpdateDate: new Date(parsed.UpdateDate),
          } as IDeviceSession;
        })
        .filter((session): session is IDeviceSession => session !== null);

      setDeviceSessions((prev) => {
        const newSessions = page === 0 ? processedSessions : [...prev, ...processedSessions];
        return newSessions;
      });
      setHasMore(processedSessions.length === PAGE_SIZE);
    } else {
      if (page === 0) {
        setDeviceSessions([]);
      }
      setHasMore(false);
    }
  }, [sessions, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading && !isFetching) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoadingRef = loadingRef.current;
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [hasMore, isLoading, isFetching]);

  const getDeviceIcon = (deviceInfo: IDeviceSession['DeviceInformation']) => {
    if (!deviceInfo?.Device) return <Monitor className="w-5 h-5 text-secondary" />;

    const deviceType = deviceInfo.Device.toLowerCase();
    if (
      deviceType.includes('mobile') ||
      deviceType.includes('iphone') ||
      deviceType.includes('android') ||
      deviceType.includes('smartphone')
    ) {
      return <Smartphone className="w-5 h-5 text-secondary" />;
    }
    return <Monitor className="w-5 h-5 text-secondary" />;
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  };

  const BrowserCell = ({ deviceInfo }: IBrowserCellProps) => {
    return <span>{deviceInfo?.Browser ?? 'Unknown Browser'}</span>;
  };

  const columns = useMemo<ColumnDef<IDeviceSession>[]>(
    () => [
      {
        id: 'device',
        header: () => <span className="flex w-[150px] items-center md:w-[200px]">Device</span>,
        cell: ({ row }) => (
          <div className="flex w-[150px] items-center md:w-[200px]">
            {getDeviceIcon(row.original.DeviceInformation)}
            <span className="ml-2">
              {(row.original.DeviceInformation?.Brand || row.original.DeviceInformation?.Device) ??
                'Unknown Device'}
            </span>
          </div>
        ),
      },
      {
        id: 'browser',
        header: () => <span className="flex w-[150px] items-center md:w-[200px]">Browser</span>,
        cell: ({ row }) => <BrowserCell deviceInfo={row.original.DeviceInformation} />,
      },
      {
        id: 'lastAccessed',
        header: () => (
          <span className="flex w-[150px] items-center md:w-[200px]">Last Accessed</span>
        ),
        cell: ({ row }) => <span>{formatDate(row.original.UpdateDate)}</span>,
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: () => (
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full opacity-50 cursor-not-allowed"
          >
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: deviceSessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderTableContent = () => {
    if (isLoading || isFetching) {
      return (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      );
    }

    if (deviceSessions.length === 0) {
      return <p className="text-center">No devices found.</p>;
    }

    return null;
  };

  return (
    <div className="flex">
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-high-emphasis">My Devices</CardTitle>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              <Trash className="w-3 h-3 opacity-50 cursor-not-allowed" />
              <span className="text-sm font-bold sr-only sm:not-sr-only sm:whitespace-nowrap opacity-50 cursor-not-allowed">
                Remove all devices
              </span>
            </Button>
          </div>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <Table className="text-sm">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="px-4 py-3 hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="font-bold text-medium-emphasis">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {deviceSessions.length > 0 ? (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="cursor-pointer font-normal text-medium-emphasis"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        <div ref={loadingRef} className="h-8 flex items-center justify-center">
                          {renderTableContent()}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {renderTableContent()}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Devices;

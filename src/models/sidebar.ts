export interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon?:
    | 'LayoutDashboard'
    | 'Users'
    | 'FileUser'
    | 'ChevronRight'
    | 'User'
    | 'Server'
    | 'Store'
    | 'CircleHelp'
    | 'FileClock';
  children?: MenuItem[];
}

export interface SidebarMenuItemProps {
  item: MenuItem;
  showText: boolean;
  isActive: boolean;
}

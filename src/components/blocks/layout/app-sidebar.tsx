import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '../../ui/sidebar';
import { menuItems } from 'constant/sidebar-menu';
import { SidebarMenuItemComponent } from './sidebar-menu-Item';
import logo from '../../../assets/images/selise_Blocks_logo.svg';

export function AppSidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showText, setShowText] = useState(true);
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel className="mt-2 mb-4 flex flex-start items-center w-full">
          <div className="w-20 h-10">
            <img src={logo} alt="logo" />
          </div>
        </SidebarGroupLabel>
      </SidebarHeader>
      <div className="ml-6 my-2 text-[10px] font-medium capitalize text-medium-emphasis">
        OVERVIEW
      </div>
      <SidebarContent className="text-base ml-4 mr-2 my-3 text-high-emphasis font-normal">
        {menuItems.map((item) => (
          <SidebarMenu key={item.id}>
            <SidebarMenuItemComponent
              item={item}
              showText={showText}
              isActive={pathname.includes(item.path)}
            />
          </SidebarMenu>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

import { Bell, Library } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from 'components/blocks/layout/app-sidebar';
import { UProfileMenu } from 'components/blocks/u-profile-menu';
import { SidebarProvider, SidebarTrigger } from 'components/ui/sidebar';
import LanguageSelector from 'components/blocks/language-selector/language-selector';
import { Button } from 'components/ui/button';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full h-full">
          <div className="sticky bg-card z-50 top-0 border-b py-2 px-4 sm:px-8 flex justify-between items-center w-full">
            <SidebarTrigger />
            <div className="flex justify-between items-center gap-1 sm:gap-8">
              <Button variant="ghost" size="icon">
                <Library className="!w-5 !h-5 text-medium-emphasis" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="!w-5 !h-5 text-medium-emphasis" />
              </Button>
              <LanguageSelector />
              <div className="border-l border-gray-300 h-4"></div>
              <UProfileMenu />
            </div>
          </div>
          <div className="flex h-full bg-surface p-4 sm:p-8">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}

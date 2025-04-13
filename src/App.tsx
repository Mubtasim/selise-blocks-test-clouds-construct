import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'components/ui/toaster';
import { ClientMiddleware } from 'state/client-middleware';
import MainLayout from 'pages/main/main-layout';
import { AuthLayout } from './pages/auth/auth-layout';
import { SigninPage } from 'pages/auth/signin/signin-page';
import { SignupPage } from 'pages/auth/signup/signup-page';
import { EmailVerification } from 'pages/auth/email-verification/email-verification';
import { Dashboard } from 'pages/main/dashboard/dashboard';
import { SetPasswordPage } from './pages/auth/set-password/set-password';
import { ActivationSuccess } from './pages/auth/activation-success/activation-success';
import { VerificationFailed } from './pages/auth/verification-failed/verification-failed';
import { ResetPasswordPage } from './pages/auth/reset-password/reset-password';
import { ForgotPasswordPage } from './pages/auth/forgot-password/forgot-password';
import TaskPage from './pages/main/iam-table';
import { Profile } from './pages/profile/profile';
import { Storage } from './pages/services/storage/storage';
import { Mail } from './pages/services/mail/mail';
import { Help } from './pages/help/help';
import { ThemeProvider } from './components/core/theme-provider';
import { Inventory } from './pages/inventory/inventory';
import { InventoryDetails } from './pages/inventory/inventory-details';
import { SidebarProvider } from 'components/ui/sidebar';
import { Email } from './pages/email/email';
import { VerifyOtpKey } from './pages/auth/verify-otp-key/verify-otp-key';
import ActivityLog from './pages/activity-log-v2/activity-log';
import { InventoryForm } from './features/inventory/component/inventory-form/inventory-form';
import TaskManager from './pages/task-manager/task-manager';
import { CalendarPage } from './pages/calendar/calendar';
// import { MyCalendar } from './pages/big-calendar/big-calendar';

const queryClient = new QueryClient();

function RedirectHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/success') {
      const headers = new Headers();
      headers.set('x-current-path', location.pathname);

      setTimeout(() => {
        window.location.href = '/';
      }, 10000);
    }
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <RedirectHandler />
      <ClientMiddleware>
        <ThemeProvider>
          <SidebarProvider>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/sent-email" element={<EmailVerification />} />
                <Route path="/activate" element={<SetPasswordPage />} />
                <Route path="/resetpassword" element={<ResetPasswordPage />} />
                <Route path="/success" element={<ActivationSuccess />} />
                <Route path="/activate-failed" element={<VerificationFailed />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-key" element={<VerifyOtpKey />} />
              </Route>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/add" element={<InventoryForm />} />
                <Route path="/inventory/:itemId" element={<InventoryDetails />} />
                <Route path="/activity-log-v2" element={<ActivityLog />} />
                <Route path="/mail/:category" element={<Email />} />
                <Route path="/mail/:category/:emailId" element={<Email />} />
                <Route path="/mail/:category/:labels/:emailId" element={<Email />} />
                <Route path="/help" element={<Help />} />
                <Route path="/identity-management" element={<TaskPage />} />
                <Route path="/services/storage" element={<Storage />} />
                <Route path="/services/mail" element={<Mail />} />
                <Route path="/task-manager" element={<TaskManager />} />
                <Route path="/calendar" element={<CalendarPage />} />
                {/* <Route path="/bg-calendar" element={<MyCalendar />} /> */}
              </Route>

              {/* redirecting */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {/* <Route path="*" element={<Navigate to="/login" replace />}/> */}
            </Routes>
          </SidebarProvider>
        </ThemeProvider>
      </ClientMiddleware>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

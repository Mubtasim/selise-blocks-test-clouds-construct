import { useState } from 'react';
import { Download, Mail, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { useAuthStore } from 'state/store/auth';
import { useSignoutMutation } from 'features/auth/hooks/use-auth';
import { useToast } from 'hooks/use-toast';
import { MfaDialogState } from 'features/profile/enums/mfa-dialog-state.enum';
import { User } from '/types/user.type';
import { UserMfaType } from '../../../enums/user-mfa-type-enum';
import { useDisableUserMfa } from '../../../hooks/use-mfa';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { ConfirmOtpVerification } from '../confirm-otp-verification/confirm-otp-verification';

/**
 * `ManageTwoFactorAuthentication` component allows users to manage their Multi-Factor Authentication (MFA) settings,
 * including enabling/disabling MFA, switching the MFA method (Authenticator App or Email Verification), and downloading recovery codes.
 *
 * @component
 * @example
 * <ManageTwoFactorAuthentication
 *   userInfo={userInfo}
 *   onClose={handleClose}
 *   dialogState={dialogState}
 * />
 *
 * @param {object} props - The component props.
 * @param {User} [props.userInfo] - The user's information, including MFA settings.
 * @param {Function} props.onClose - A function to close the dialog.
 * @param {MfaDialogState} props.dialogState - The current state of the MFA dialog (e.g., setup state).
 *
 * @returns {React.Element} The rendered component.
 */

type ManageTwoFactorAuthenticationProps = {
  userInfo?: User;
  onClose: () => void;
  dialogState: MfaDialogState;
};

export const ManageTwoFactorAuthentication: React.FC<
  Readonly<ManageTwoFactorAuthenticationProps>
> = ({ userInfo, onClose, dialogState }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuthStore();
  const { mutateAsync, isPending } = useSignoutMutation();
  const disableUserMfaMutation = useDisableUserMfa();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const [disabledMfaType, setDisabledMfaType] = useState<UserMfaType | null>(null);

  const handleDownloadRecoveryCodes = () => {
    //TODO: later adding with real recovery code data
    const dummyRecoveryCodes = `Recovery Codes:\n\nABC123-DEF456\nGHI789-JKL012\nMNO345-PQR678\nSTU901-VWX234\nYZA567-BCD890`;

    const blob = new Blob([dummyRecoveryCodes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recovery-codes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      variant: 'success',
      title: 'Recovery Codes Downloaded',
      description: 'Your recovery codes have been downloaded. Store them in a safe place.',
    });
  };

  const logoutHandler = async () => {
    try {
      const res = await mutateAsync();
      if (res.isSuccess) {
        logout();
        navigate('/login');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Error!',
        description: 'Something went wrong while logging out.',
      });
    }
  };

  const handleDisableClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDisable = () => {
    setShowDeleteDialog(false);
    setShowOtpVerification(true);
  };

  const handleVerifiedOtp = () => {
    if (!userInfo) return;
    setShowOtpVerification(false);
    setIsDisabling(true);
    setDisabledMfaType(userInfo.userMfaType);
    disableUserMfaMutation.mutate(userInfo.itemId, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'MFA Disabled',
          description: 'Multi-factor authentication has been disabled successfully.',
        });
      },
      onError: (error: { error?: { message?: string } }) => {
        toast({
          variant: 'destructive',
          title: 'Failed to Disable MFA',
          description:
            error?.error?.message ?? 'An error occurred while disabling MFA. Please try again.',
        });
        setIsDisabling(false);
      },
    });
  };

  const getMethodName = () => {
    const mfaType = isDisabling ? disabledMfaType : userInfo?.userMfaType;
    return mfaType === UserMfaType.AUTHENTICATOR_APP ? 'Authenticator App' : 'Email Verification';
  };

  const getSuccessMessage = () => {
    if (dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP) {
      return 'Authentication app linked successfully! For your security, we will sign you out of all your sessions. Please log in again to continue.';
    } else if (dialogState === MfaDialogState.EMAIL_VERIFICATION) {
      return 'Email verification enabled successfully! For your security, we will sign you out of all your sessions. Please log in again to continue.';
    }
    return '';
  };

  const initialMfaUserState = JSON.parse(localStorage.getItem('initialMfaUserState') || 'false');

  const onCancelOtpVerification = () => {
    setShowOtpVerification(false);
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent
          hideClose
          className="rounded-md sm:max-w-[432px] overflow-y-auto max-h-screen"
        >
          <DialogHeader>
            <DialogTitle>Manage your 2-factor authentication</DialogTitle>
            <DialogDescription>
              If you’d like to change your authentication method, please disable your current method
              first.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full">
            {!initialMfaUserState && (
              <div className="rounded-lg bg-success-background border border-success p-4 my-6">
                <p className="text-xs font-normal text-success-high-emphasis">
                  {getSuccessMessage()}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-surface rounded-md">
                  {!initialMfaUserState &&
                  dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP ? (
                    <Smartphone className="text-secondary" size={24} />
                  ) : !initialMfaUserState && dialogState === MfaDialogState.EMAIL_VERIFICATION ? (
                    <Mail className="text-secondary" size={24} />
                  ) : isDisabling && disabledMfaType === UserMfaType.AUTHENTICATOR_APP ? (
                    <Smartphone className="text-secondary" size={24} />
                  ) : isDisabling && disabledMfaType !== UserMfaType.AUTHENTICATOR_APP ? (
                    <Mail className="text-secondary" size={24} />
                  ) : userInfo?.userMfaType === UserMfaType.AUTHENTICATOR_APP ? (
                    <Smartphone className="text-secondary" size={24} />
                  ) : (
                    <Mail className="text-secondary" size={24} />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-high-emphasis">
                  {!initialMfaUserState
                    ? dialogState === MfaDialogState.AUTHENTICATOR_APP_SETUP
                      ? 'Authenticator App'
                      : 'Email Verification'
                    : getMethodName()}
                </h3>
              </div>
              <div className="py-[6px] px-3 cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!initialMfaUserState || disableUserMfaMutation.isPending || isDisabling}
                  onClick={handleDisableClick}
                  className={`font-bold text-sm ${
                    !initialMfaUserState || disableUserMfaMutation.isPending || isDisabling
                      ? 'text-neutral-400 cursor-not-allowed'
                      : 'text-destructive hover:text-destructive'
                  }`}
                >
                  {disableUserMfaMutation.isPending || isDisabling ? 'Disabled' : 'Disable'}
                </Button>
              </div>
            </div>
            {(userInfo?.userMfaType === UserMfaType.AUTHENTICATOR_APP ||
              (isDisabling && disabledMfaType === UserMfaType.AUTHENTICATOR_APP)) && (
              <Button
                variant="ghost"
                className="text-primary hover:text-primary-700 w-[225px]"
                onClick={handleDownloadRecoveryCodes}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-bold">Download recovery codes</span>
              </Button>
            )}
          </div>

          <DialogFooter className="mt-5 flex w-full items-center !justify-end">
            <div className="flex">
              {!initialMfaUserState ? (
                <Button onClick={logoutHandler} disabled={isPending} className="min-w-[118px]">
                  Log out
                </Button>
              ) : (
                <Button variant="outline" onClick={() => onClose()} className="min-w-[118px]">
                  Close
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmationModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Disable MFA?"
        confirmText="Yes"
        description="Are you sure you want to disable MFA? You'll be asked to verify yourself."
        onConfirm={handleConfirmDisable}
      />
      {showOtpVerification && (
        <ConfirmOtpVerification
          onClose={onCancelOtpVerification}
          onVerified={handleVerifiedOtp}
          mfaType={userInfo?.userMfaType || UserMfaType.NONE}
          userInfo={userInfo}
        />
      )}
    </>
  );
};

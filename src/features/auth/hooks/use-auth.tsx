import { useState } from 'react';
import {
  accountActivation,
  forgotPassword,
  resendActivation,
  resetPassword,
  signin,
  signout,
  logoutAll,
  PasswordSigninPayload,
  MFASigninPayload,
} from '../services/auth.service';
import { useGlobalMutation } from 'state/query-client/hooks';
import { ErrorResponse, useCustomToast } from './use-custom-toast/use-custom-toast';

export const useSigninMutation = <T extends 'password' | 'mfa_code'>() => {
  const [errorDetails, setErrorDetails] = useState({
    title: '',
    message: '',
  });

  const mutation = useGlobalMutation({
    mutationKey: ['signin'],
    mutationFn: async (payload: PasswordSigninPayload | MFASigninPayload) => signin<T>(payload),
    onSuccess: () => {
      setErrorDetails({ title: '', message: '' });
    },
    onError: (error: any) => {
      let errorObj = error;
      try {
        if (typeof error === 'string') {
          errorObj = JSON.parse(error);
        }
      } catch (e) {
        console.error('Error parsing error response:', e);
      }

      const isInvalidCredentials =
        (errorObj?.status === 400 && errorObj?.error?.error === 'invalid_username_password') ||
        (errorObj?.response?.status === 400 &&
          (errorObj?.response?.data?.error === 'invalid_username_password' ||
            errorObj?.response?.data?.error?.error === 'invalid_username_password'));

      setErrorDetails({
        title: isInvalidCredentials ? 'Invalid Credentials' : 'Something went wrong',
        message: isInvalidCredentials
          ? 'Your email or password is not valid.'
          : 'Please try again.',
      });
    },
  });

  return {
    ...mutation,
    errorDetails,
  };
};

export const useSignoutMutation = () => {
  return useGlobalMutation({
    mutationKey: ['signout'],
    mutationFn: signout,
  });
};

export const useAccountActivation = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  return useGlobalMutation({
    mutationKey: ['accountActivation'],
    mutationFn: accountActivation,

    onSuccess: () => {
      showSuccessToast({
        description: 'You are sucessfully acctivated your account',
      });
    },
    onError: ({ error }: ErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useForgotPassword = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  return useGlobalMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: forgotPassword,
    onSuccess: () => {
      showSuccessToast({
        description: 'A link has been sent your email',
      });
    },
    onError: ({ error }: ErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useResetPassword = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  return useGlobalMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPassword,
    onSuccess: () => {
      showSuccessToast({
        description: 'You have successfully set your password',
      });
    },
    onError: ({ error }: ErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useResendActivation = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();

  return useGlobalMutation({
    mutationKey: ['resendActivation'],
    mutationFn: resendActivation,
    onSuccess: () => {
      showSuccessToast({
        description: 'A link has been sent your email',
      });
    },
    onError: ({ error }: ErrorResponse) => {
      showErrorToast(error);
    },
  });
};

export const useLogoutAllMutation = () => {
  return useGlobalMutation({
    mutationKey: ['logoutAll'],
    mutationFn: logoutAll,
  });
};

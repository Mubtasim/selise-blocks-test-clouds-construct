import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { signupFormDefaultValue, signupFormType, signupFormValidationSchema } from './utils';
import { UCheckbox } from 'components/core/uCheckbox';
import { ReCaptcha } from '../../../../features/captcha/reCaptcha';

export const SignupForm = () => {
  const [captchaToken, setCaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<signupFormType>({
    defaultValues: signupFormDefaultValue,
    resolver: zodResolver(signupFormValidationSchema),
  });

  const handleCaptchaVerify = (token: SetStateAction<string>) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken('');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitHandler = async (values: signupFormType) => {
    if (!captchaToken) {
      // Show error or alert that captcha is required
      return;
    }

    setIsSubmitting(true);
    try {
      // Include captcha token with the sign-up request
      // await signupMutation({ ...values, captchaToken });
      // Handle successful signup
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-high-emphasis font-normal">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-2">
          <ReCaptcha
            siteKey="6LckI90qAAAAAK8RP2t0Nohwii1CeKOETsXPVNQA"
            onVerify={handleCaptchaVerify}
            onExpired={handleCaptchaExpired}
            theme="light"
            size="normal"
            type="reCaptcha"
          />
        </div>

        <div className="flex justify-between items-center">
          <UCheckbox
            label={
              <>
                I agree to the{' '}
                <span className="text-primary underline hover:text-primary-600">
                  {' '}
                  <a href="https://selisegroup.com/software-development-terms/">
                    Terms of Service
                  </a>{' '}
                </span>{' '}
                and acknowledge that I have read the{' '}
                <span className="text-primary underline hover:text-primary-600">
                  <a href="https://selisegroup.com/privacy-policy/">Privacy policy</a>{' '}
                </span>
                .
              </>
            }
            labelClassName="text-medium-emphasis font-normal mt-5 leading-5"
          />
        </div>

        <div className="flex gap-10 mt-2">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            disabled={isSubmitting || !captchaToken}
          >
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};

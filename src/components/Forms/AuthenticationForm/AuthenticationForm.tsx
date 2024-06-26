'use client';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormValues } from '../../../..';
import { useForm } from '@mantine/form';
import { useFormState } from 'react-dom';
import { login } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import CustomNotification from '../../CustomNotification/CustomNotification';
import { GoogleIcon } from './GoogleIcon';
import { signIn } from 'next-auth/react';
import { IconBrandGithub } from '@tabler/icons-react';
import { LoginData } from '@/app/lib/store/features/authProfile/types/authProfileSchema';

export interface Payload {
  loginData: LoginData;
  callbackUrl: string | null;
}

export type SignUpFormInitialStateT = {
  error: boolean;
  message: string;
  validatedErrors?: InputErrorsT;
  credentials?: {
    message: string;
    statusCode: number;
    error: string;
  };
};

type SignUpFormErrorStateT = {
  error: boolean;
  message: string;
  validatedErrors?: InputErrorsT;
  credentials?: {
    message: string;
    statusCode: number;
    error: string;
  };
};

export type InputErrorsT = {
  email?: string[];
  password?: string[];
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
  error: false,
  message: '',
  // status: 'idle',
};

export default function AuthenticationForm({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';
  const [formState, formAction] = useFormState<SignUpFormStateT, Payload>(login, initialState);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? value.length <= 25
            ? null
            : 'Длина ящика не более 25 символов'
          : 'Минимальное наименование email n@m',
      name: (value) =>
        value && value.length < 2 ? 'Имя должно быть от 2' : value && value.length > 20 ? 'Имя должно быть до 20 символов' : null,
      password: (value) => {
        return value.length < 5 ? 'Минимальный пароль 5 символов' : null;
      },
    },
  });

  const loginData = { email: form.values.email, password: form.values.password };

  useEffect(() => {
    form.setFieldError('email', formState.validatedErrors?.email);
  }, [formState.validatedErrors?.email]);

  useEffect(() => {
    form.setFieldError('password', formState.validatedErrors?.password);
  }, [formState.validatedErrors?.password]);

  useEffect(() => {
    if (formState.error) {
      CustomNotification({
        title: 'Пользователь',
        message: formState.credentials?.message ?? formState.message,
        variant: 'error',
        statusCode: formState.credentials?.statusCode,
        additionalMessage: formState.credentials?.error,
      });
    }
  }, [formState.credentials]);

  const toogleForm = () => {
    if (setIsLogin) {
      setIsLogin((isLogin: boolean) => !isLogin);
    }
  };

  const googleSignIn = () => {
    signIn('google', { callbackUrl });
  };
  const githubSignIn = () => {
    signIn('github', { callbackUrl });
  };

  return (
    <>
      <Group style={{ fontWeight: '400 !important' }} mb='md' justify='space-between'>
        <Button onClick={googleSignIn} leftSection={<GoogleIcon />} variant='default' color='gray'>
          Google
        </Button>
        <Button onClick={githubSignIn} leftSection={<IconBrandGithub />} variant='default' color='gray'>
          GitHub
        </Button>
      </Group>
      <form action={() => formAction({ loginData, callbackUrl })}>
        <TextInput label='email' placeholder='your@email.com' required {...form.getInputProps('email')} error={form.errors.email} />
        <PasswordInput
          mt='md'
          withAsterisk
          label='password'
          placeholder='Your password'
          required
          {...form.getInputProps('password')}
          error={form.errors.password}
        />
        <Group style={{ fontWeight: '400 !important' }} mt='md' justify='space-between'>
          <Button variant='default' onClick={toogleForm}>
            Регистрация
          </Button>
          <Button style={{ background: '#005bff' }} type='submit'>
            Войти
          </Button>
        </Group>
      </form>
    </>
  );
}

import React, { ReactElement, useRef } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';

import logo from 'assets/fastfeet-logo.png';
import Input from 'components/Input';
import { RootState } from 'store/modules/rootReducer';
import { signInRequest } from 'store/modules/auth/actions';

interface FormData {
  email: string;
  password: string;
}

const SignIn = (): ReactElement => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    async function validation(formData: FormData) {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Email inválido')
            .required('Insira um e-mail'),
          password: Yup.string()
            .min(6, 'No mínimo 6 caracteres')
            .required('A senha é obrigatória'),
        });
        await schema.validate(formData, { abortEarly: false });
        formRef.current?.setErrors({});
        dispatch(signInRequest(formData.email, formData.password));
        reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errorMessages: { [index: string]: string } = {};
          err.inner.forEach(error => {
            return (errorMessages[error.path] = error.message);
          });
          formRef.current?.setErrors(errorMessages);
        }
      }
    }
    validation(data);
  };

  return (
    <>
      <img src={logo} alt="fastfeet" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <label>SEU EMAIL</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <label>SUA SENHA</label>
        <Input name="password" type="password" placeholder="******" />
        <button type="submit">
          {loading ? <FaSpinner size={30} color="#FFF" /> : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
};
export default SignIn;

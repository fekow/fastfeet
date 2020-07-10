import React, { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiCheckCircle } from 'react-icons/fi';
import { MdDone, MdArrowBack } from 'react-icons/md';

import AvatarInput from './Input';
import Input from 'components/Input';
import history from 'services/history';
import { Container, Finished, Wrapper } from './styles';
import api from 'services/api';

interface FormData {
  name: string;
  email: string;
  avatar_id: string;
}

const CourierRegister: FC = () => {
  const [finished, setFinished] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = data => {
    async function createCourier() {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Digite seu nome'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('Escolha um destinatário'),
          avatar_id: Yup.string(),
        });
        console.tron.log(data);
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});

        await api.post('/couriers', data);

        setFinished(true);

        setTimeout(() => {
          history.push('/couriers');
        }, 2000);
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
    createCourier();
  };

  return (
    <Container>
      {finished ? (
        <Finished>
          <FiCheckCircle color="#7d40e7" size={60} />
          <h1>Cadastro concluído!</h1>
        </Finished>
      ) : null}

      <Form ref={formRef} onSubmit={handleSubmit}>
        <header>
          <div>
            <h1>Cadastro de Entregadores</h1>
          </div>
          <aside>
            <Link to="/couriers">
              <MdArrowBack size={20} color="#fff" />
              Voltar
            </Link>
            <button type="submit">
              <MdDone size={20} color="#fff" /> Salvar
            </button>
          </aside>
        </header>
        <Wrapper>
          <AvatarInput name="avatar_id" />
          <label>Nome</label>
          <Input name="name" type="text" placeholder="John Doe" />
          <label>Email</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </Wrapper>
      </Form>
    </Container>
  );
};
export default CourierRegister;

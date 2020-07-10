import React, { ReactElement, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiCheckCircle } from 'react-icons/fi';
import { MdDone, MdArrowBack } from 'react-icons/md';

import AvatarInput from '../Register/Input';
import Input from 'components/Input';
import history from 'services/history';
import api from 'services/api';
import CourierContext from '../CourierContext';

import { RouteComponentProps } from 'react-router-dom';
import { Container, Finished, Wrapper } from '../Register/styles';

interface FormData {
  name: string;
  email: string;
  avatar_id: string;
}
interface MatchParams {
  id: string;
}

const CourierUpdate = ({
  match,
}: RouteComponentProps<MatchParams>): ReactElement => {
  const { courierPrevious, resetCourierState } = useContext(CourierContext);
  const { id } = match.params;
  const [finished, setFinished] = useState(false);
  const data = {
    ...courierPrevious,
    avatar_id: { ...courierPrevious.avatar, id: courierPrevious.avatar_id },
  };
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = data => {
    async function createCourier() {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Digite seu nome'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('Insira um email'),
          avatar_id: Yup.string().required('Erro no upload da imagem'),
        });
        console.tron.log(data);
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});
        const formData = Object.assign({
          ...data,
          id,
        });
        const response = await api.put('/couriers', formData).catch(err => {
          if (err.response.status === 400) {
            formRef.current?.setErrors({
              avatar_id: 'O usuário que deseja atualizar não existe',
            });
          } else {
            formRef.current?.setErrors({ email: 'Email indisponível' });
          }
          return;
        });
        if (response) {
          setFinished(true);
          resetCourierState()
          setTimeout(() => {
            history.push('/couriers');
          }, 2000);
        }
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
          <h1>Atualização concluída!</h1>
        </Finished>
      ) : null}

      <Form initialData={data} ref={formRef} onSubmit={handleSubmit}>
        <header>
          <div>
            <h1>Atualização de Entregadores</h1>
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
export default CourierUpdate;

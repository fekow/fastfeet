import React, { FC, useRef, useState } from 'react';
import AsyncSelect from 'components/AsyncSelect';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiCheckCircle } from 'react-icons/fi';
import { MdDone, MdArrowBack } from 'react-icons/md';

import history from 'services/history';
import Input from 'components/Input';
import { Container, Finished, Inputs, Wrapper } from './styles';
import api from 'services/api';

interface FormData {
  courier_id: number;
  recipient_id: number;
  product: string;
}

const OrderRegister: FC = () => {
  const [finished, setFinished] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = data => {
    async function createOrder(formData: FormData) {
      try {
        const schema = Yup.object().shape({
          courier_id: Yup.number()
            .required('Escolha um entregador')
            .typeError('Erro de validação'),
          recipient_id: Yup.number()
            .required('Escolha um destinatário')
            .typeError('Erro de validação'),
          product: Yup.string().required('Insira um produto'),
        });
        await schema.validate(formData, { abortEarly: false });
        formRef.current?.setErrors({});
        const { product, courier_id, recipient_id } = formData;
        await api.post('/orders', {
          product,
          courier_id,
          recipient_id,
        });
        setFinished(true);
        setTimeout(() => {
          history.push('/orders');
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
    createOrder(data);
  };
  const loadCouriers = async (inputText: string) => {
    const data = await api
      .get('/couriers', {
        params: {
          courier: String(inputText),
        },
      })
      .then(response =>
        response.data.map((option: { name: string; id: number }) => ({
          value: option.id,
          label: option.name,
        }))
      );
    return data;
  };

  async function loadRecipients(inputValue: string) {
    const data = await api
      .get('/recipients', {
        params: {
          name: inputValue,
        },
      })
      .then(response =>
        response.data.map((recipient: { name: string; id: number }) => ({
          value: recipient.id,
          label: recipient.name,
        }))
      );
    return data;
  }

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
            <h1>Cadastro de encomendas</h1>
          </div>
          <aside>
            <Link to="/orders">
              <MdArrowBack size={20} color="#fff" />
              Voltar
            </Link>
            <button type="submit">
              <MdDone size={20} color="#fff" /> Salvar
            </button>
          </aside>
        </header>
        <Wrapper>
          <Inputs>
            <div className="first">
              <label>Destinatário</label>
              <AsyncSelect
                type="text"
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
                name="recipient_id"
                loadOptions={loadRecipients}
                placeholder="Selecione um endereço..."
              />
            </div>
            <div>
              <label>Entregador</label>
              <AsyncSelect
                type="text"
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
                name="courier_id"
                loadOptions={loadCouriers}
                placeholder="Selecione um entregador..."
              />
            </div>
          </Inputs>
          <div className="product">
            <label>Nome do produto</label>
            <Input name="product" type="text" placeholder="Produto" />
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
};
export default OrderRegister;

import React, { FC, useState, useRef, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiCheckCircle } from 'react-icons/fi';
import { MdDone, MdArrowBack } from 'react-icons/md';

import Input from 'components/Input';
import history from 'services/history';
import { Container, Finished, Wrapper, InputRow } from './styles';
import { toast } from 'react-toastify';

import api from 'services/api';

interface FormData {
  name: string;
  address_name: string;
  address_number: string;
  street_add_on?: string;
  state: string;
  city: string;
  postal_code: string;
}

const RecipientRegister: FC = () => {
  const [finished, setFinished] = useState(false);
  const [cep, setCep] = useState('');
  const [selectedCep, setSelectedCep] = useState<string[]>([]);

  async function handleCep(e: ChangeEvent<HTMLInputElement>) {
    setCep(e.target.value);
  }

  async function findCep() {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        const { logradouro: address_name, localidade: city, uf: state } = data;
        const defaultValues = Object.assign({ address_name, city, state });
        setSelectedCep(defaultValues);
        const numberInput = formRef.current?.getFieldRef('address_number');
        numberInput.focus();
      })
      // eslint-disable-next-line
      .catch(err => {
        cepNotFound();
      });
  }
  function cepNotFound() {
    toast.error('CEP não encontrado');
  }
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = data => {
    async function createRecipient(formData: FormData) {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Insira um nome'),
          address_name: Yup.string().required('Insira um Endereço'),
          address_number: Yup.string().required('Insira um número'),
          street_add_on: Yup.string(),
          state: Yup.string().required('Insira um estado'),
          city: Yup.string().required('Insira uma cidade'),
          postal_code: Yup.string().required('Insira um CEP'),
        });
        await schema.validate(formData, { abortEarly: false });
        formRef.current?.setErrors({});
        await api.post('/recipients', formData);
        setFinished(true);
        setTimeout(() => {
          history.push('/recipients');
        }, 2000);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.tron.log(err);
          const errorMessages: { [index: string]: string } = {};
          err.inner.forEach(error => {
            return (errorMessages[error.path] = error.message);
          });
          formRef.current?.setErrors(errorMessages);
        }
      }
    }
    createRecipient(data);
  };
  return (
    <Container>
      {finished ? (
        <Finished>
          <FiCheckCircle color="#7d40e7" size={60} />
          <h1>Cadastro concluído!</h1>
        </Finished>
      ) : null}

      <Form ref={formRef} initialData={selectedCep} onSubmit={handleSubmit}>
        <header>
          <div>
            <h1>Cadastro de Destinatários</h1>
          </div>
          <aside>
            <Link to="/recipients">
              <MdArrowBack size={20} color="#fff" />
              Voltar
            </Link>
            <button type="submit">
              <MdDone size={20} color="#fff" /> Salvar
            </button>
          </aside>
        </header>
        <Wrapper>
          <label>Nome</label>
          <Input name="name" type="text" placeholder="John Doe" />
          <InputRow>
            <div>
              <label>CEP</label>
              <Input
                name="postal_code"
                type="text"
                value={cep}
                onChange={handleCep}
                placeholder="Busca por CEP"
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    findCep();
                  }
                }}
              />
            </div>
            <div className="first">
              <label>Rua</label>
              <Input
                name="address_name"
                type="text"
                readOnly
                placeholder="Rua dos lobos"
              />
            </div>
            <div>
              <label>Número</label>
              <Input name="address_number" type="text" placeholder="1337" />
            </div>
          </InputRow>
          <InputRow>
            <div>
              <label>Complemento</label>
              <Input
                name="street_add_on"
                type="text"
                placeholder="Apartamento 420"
              />
            </div>
            <div>
              <label>Cidade</label>
              <Input
                name="city"
                type="text"
                placeholder="Porto Alegre"
                readOnly
              />
            </div>
            <div>
              <label>Estado</label>
              <Input
                name="state"
                readOnly
                type="text"
                placeholder="Rio Grande do Sul"
              />
            </div>
          </InputRow>
          <button type="button" onClick={findCep}>
            Buscar por CEP
          </button>
        </Wrapper>
      </Form>
    </Container>
  );
};
export default RecipientRegister;

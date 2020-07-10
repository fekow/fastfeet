import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Container, Pagination } from './styles';
import { FiPlus } from 'react-icons/fi';
import { MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from 'services/api';
import Actions from './Actions';
import { Recipient } from 'types';

const ListRecipients = (): ReactElement => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  function handleQueryInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  async function reloadRecipients() {
    console.tron.log('test');
    const response = await api.get('/recipients');
    setRecipients(response.data);
    setQuery('');
  }
  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          name: query,
          page,
        },
      });
      if (response.data.length === 0) {
        toast.warn('Nenhum destinatário encontrado');
      }
      setRecipients(response.data);
    }
    loadRecipients();
  }, [query, page]);
  function handlePage(action: string) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }
  return (
    <>
      <Container>
        <h1>Gerenciando destinatários</h1>
        <header>
          <div>
            <MdSearch size={16} color="#999999" />
            <input
              type="text"
              placeholder="Buscar por destinatários"
              onChange={handleQueryInput}
              value={query}
            />
          </div>
          <Link to="/recipients/register">
            <FiPlus size={20} color="#FFF" />
            ADICIONAR
          </Link>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>#{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.address_name}, {recipient.address_number},{' '}
                  {recipient.street_add_on} - {recipient.city},{' '}
                  {recipient.state} - {recipient.postal_code}
                </td>
                <td>
                  <Actions
                    selectedRecipient={recipient}
                    updadeList={reloadRecipients}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination>
          <button
            disabled={page < 2}
            type="button"
            onClick={() => handlePage('back')}
          >
            <MdArrowBack size={24} color="#7d40e7" />
          </button>
          <small>Página {page}</small>
          <button type="button" onClick={() => handlePage('next')}>
            <MdArrowForward size={24} color="#7d40e7" />
          </button>
        </Pagination>
      </Container>
    </>
  );
};
export default ListRecipients;

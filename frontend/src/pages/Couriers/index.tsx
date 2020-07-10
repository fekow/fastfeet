import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Container, Pagination } from './styles';
import { FiPlus } from 'react-icons/fi';
import { MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md';
import Avatar from 'react-avatar';
import Actions from './Actions';
import api from 'services/api';
import { Couriers } from 'types';

const ListCouriers = (): ReactElement => {
  const [couriers, setCouriers] = useState<Couriers[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  function handleQueryInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  async function reloadCouriers() {
    const response = await api.get('/couriers');
    setCouriers(response.data);
    setQuery('');
  }
  useEffect(() => {
    async function loadCouriers() {
      const response = await api.get('/couriers', {
        params: {
          courier: query,
          page,
        },
      });
      setCouriers(response.data);
    }
    loadCouriers();
  }, [query, page]);
  function handlePage(action: string) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }
  return (
    <>
      <Container>
        <h1>Gerenciando entregadores</h1>
        <header>
          <div>
            <MdSearch size={16} color="#999999" />
            <input
              type="text"
              placeholder="Buscar por entregadores"
              onChange={handleQueryInput}
              value={query}
            />
          </div>
          <Link to="/couriers/register">
            <FiPlus size={20} color="#FFF" />
            ADICIONAR
          </Link>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map(courier => (
              <tr key={courier.id}>
                <td>#{courier.id}</td>
                <td>
                  <strong>
                    {courier.avatar ? (
                      <img src={courier.avatar.url} alt={courier.name} />
                    ) : (
                      <Avatar
                        name={courier.name}
                        size="36"
                        textSizeRatio={1.2}
                        round="18px"
                      />
                    )}
                  </strong>
                </td>
                <td>{courier.name}</td>
                <td>{courier.email}</td>
                <td>
                  <Actions
                    selectedCourier={courier}
                    updateList={reloadCouriers}
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
export default ListCouriers;

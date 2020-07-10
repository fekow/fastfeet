import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Status, Pagination } from './styles';
import { FiPlus } from 'react-icons/fi';
import { MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md';
import Avatar from 'react-avatar';
import Actions from './Actions';
import api from 'services/api';
import { Orders } from 'types';
import formatDate from 'util/formatDate';

const ListOrders = (): ReactElement => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  function handleQueryInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  async function reloadOrders() {
    const response = await api.get('/orders');
    const data = response.data.map((order: Orders) => ({
      ...order,
      formatedStartDate: order.start_date
        ? formatDate(order.start_date)
        : undefined,
      formatedEndDate: order.end_date ? formatDate(order.end_date) : undefined,
    }));
    if (data.length === 0) {
      toast.warn('Nenhuma encomenda cadastrada');
    }
    setOrders(data);
    setQuery('');
  }
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders', {
        params: {
          product: query,
          page,
        },
      });
      const data = response.data.map((order: Orders) => ({
        ...order,
        formatedStartDate: order.start_date
          ? formatDate(order.start_date)
          : undefined,
        formatedEndDate: order.end_date
          ? formatDate(order.end_date)
          : undefined,
      }));
      if (data.length === 0) {
        toast.warn('Nenhuma encomenda cadastrada');
      }
      setOrders(data);
    }
    loadOrders();
  }, [query, page]);

  function handlePage(action: string) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  return (
    <>
      <Container>
        <h1>Gerenciando encomendas</h1>
        <header>
          <div>
            <MdSearch size={16} color="#999999" />
            <input
              onChange={handleQueryInput}
              type="text"
              value={query}
              placeholder="Buscar por encomendas"
            />
          </div>
          <Link to="/orders/register">
            <FiPlus size={20} color="#FFF" />
            ADICIONAR
          </Link>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {order.recipient ? order.recipient.name : 'Sem destinatário'}
                </td>
                <td>
                  <strong>
                    {!order.courier ? (
                      'Sem Entregador'
                    ) : (
                      <>
                        {order.courier.avatar ? (
                          <img
                            src={order.courier.avatar.url}
                            alt={order.courier.name}
                          />
                        ) : (
                          <Avatar
                            name={order.courier.name}
                            size="36"
                            textSizeRatio={1.2}
                            round="18px"
                          />
                        )}
                        {order.courier.name}{' '}
                      </>
                    )}
                  </strong>
                </td>
                <td>
                  {order.recipient ? order.recipient.city : 'Sem destinatário'}
                </td>
                <td>
                  {order.recipient ? order.recipient.state : 'Sem destinatário'}
                </td>
                <Status status={order.status}>
                  <div>
                    <div></div>
                    <strong>{order.status}</strong>
                  </div>
                </Status>
                <td>
                  <Actions selectedOrder={order} updadeList={reloadOrders} />
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
export default ListOrders;

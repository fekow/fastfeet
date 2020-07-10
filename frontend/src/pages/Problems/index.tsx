import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { Container, Pagination } from './styles';
import { MdSearch, MdArrowBack, MdArrowForward } from 'react-icons/md';
import Actions from './Actions';
import api from 'services/api';
import { Problems } from 'types';

const ListProblems = (): ReactElement => {
  const [problems, setProblems] = useState<Problems[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  function handleQueryInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/problems', {
        params: {
          page,
        },
      });
      setProblems(response.data);
    }
    async function loadProblemById() {
      if (page !== 1) {
        setPage(1);
      }
      const response = await api.get(`/delivery/${query}/problems`);
      setProblems(response.data);
    }
    if (query) {
      loadProblemById();
    } else {
      loadRecipients();
    }
  }, [page, query]);
  function handlePage(action: string) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }
  return (
    <>
      <Container>
        <header>
          <h1>Problemas na entrega</h1>
          <div>
            <MdSearch size={16} color="#999999" />
            <input
              type="text"
              placeholder="Busca por ID de destinatários"
              onChange={handleQueryInput}
              value={query}
            />
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>#{problem.order_id}</td>
                <td>
                  {problem.description.length > 100
                    ? problem.description.substring(0, 100) + ' ...'
                    : problem.description}
                </td>
                <td>
                  <Actions selectedProblem={problem} />
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
export default ListProblems;

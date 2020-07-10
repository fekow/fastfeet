import React, { useState, useContext } from 'react';
import { Container, ActionList } from './styles';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import CourierContext from '../CourierContext';
import { Couriers } from 'types';
import api from 'services/api';
import history from 'services/history';

const Actions = ({
  selectedCourier,
  updateList,
}: {
  selectedCourier: Couriers;
  updateList: CallableFunction;
}): React.ReactElement => {
  const context = useContext(CourierContext);
  const [visible, setVisible] = useState(false);
  function handleToggleVisible() {
    setVisible(!visible);
  }
  async function handleDeleteRequest(id: number) {
    confirmAlert({
      title: 'Aviso',
      message: `Quer mesmo deletar o entregador #${id}?`,
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }
  async function handleDelete(id: number) {
    await api.delete(`/couriers/${String(id)}`);
    updateList();
  }
  function handleEdit() {
    context.setCourierState(selectedCourier);
    history.push(`/courier/update/${selectedCourier.id}`);
  }
  return (
    <>
      <Container>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={24} color="#C6C6c6" />
        </button>
        <ActionList visible={visible}>
          <button type="button" onClick={handleEdit}>
            <MdEdit size={15} color="#4D85EE" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => handleDeleteRequest(selectedCourier.id)}
          >
            <MdDeleteForever size={15} color="#DE3B3B" />
            Excluir
          </button>
        </ActionList>
      </Container>
    </>
  );
};

export default Actions;

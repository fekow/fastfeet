import React, { useState, useContext } from 'react';
import { Container, ActionList } from './styles';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import RecipientContext from 'pages/Recipients/RecipientContext';

import history from 'services/history';
import { Recipient } from 'types';
import api from 'services/api';

const Actions = ({
  selectedRecipient,
  updadeList,
}: {
  selectedRecipient: Recipient;
  updadeList: CallableFunction;
}): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const context = useContext(RecipientContext);

  function handleToggleVisible() {
    setVisible(!visible);
  }
  async function handleDeleteRequest(id: number) {
    confirmAlert({
      title: 'Aviso',
      message: `Quer mesmo deletar o destinatário #${id}?`,
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
    await api.delete(`/recipients/${String(id)}`);
    updadeList();
  }

  function handleEdit() {
    context.setRecipientState(selectedRecipient);
    history.push(`/recipient/update/${selectedRecipient.id}`);
  }

  return (
    <>
      <Container>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={24} color="#C6C6c6" />
        </button>
        <ActionList visible={visible}>
          <button onClick={handleEdit} type="button">
            <MdEdit size={15} color="#4D85EE" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => handleDeleteRequest(selectedRecipient.id)}
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

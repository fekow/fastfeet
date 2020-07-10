import React, { useState } from 'react';
import { Container, ActionList, ModalContainer } from './styles';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import Modal from 'react-modal';

import { Problems } from 'types';
import api from 'services/api';
import history from 'services/history';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 'rgba(0, 0, 0,0.2) 0px 0px 10px',
  },
  overlay: {
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

const Actions = ({
  selectedProblem,
}: {
  selectedProblem: Problems;
}): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }
  async function handleDeleteRequest(id: number) {
    confirmAlert({
      title: 'Aviso',
      message: `Quer mesmo cancelar a entrega #${id}?`,
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
    await api.delete(`/problem/${String(id)}/cancel-delivery`);
    history.push('/');
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Descrição do problema"
        ariaHideApp={false}
      >
        <ModalContainer>
          <div>
            <strong>Visualizar problema</strong>
          </div>
          <p>{selectedProblem.description}</p>
        </ModalContainer>
      </Modal>
      <Container>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={24} color="#C6C6c6" />
        </button>
        <ActionList visible={visible}>
          <div>
            <button type="button" onClick={openModal}>
              <MdVisibility size={18} color="#8E5BE8" />
              Visualizar
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleDeleteRequest(selectedProblem.id)}
            >
              <MdDeleteForever size={18} color="#DE3B3B" />
              Cancelar Encomenda
            </button>
          </div>
        </ActionList>
      </Container>
    </>
  );
};

export default Actions;

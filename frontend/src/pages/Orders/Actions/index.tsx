import React, { useState, useContext } from 'react';
import {
  MdVisibility,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import { Container, ActionList, ModalContainer } from './styles';
import { Orders } from 'types';
import Modal from 'react-modal';
import api from 'services/api';
import OrderContext from '../OrderContext';
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
  selectedOrder,
  updadeList,
}: {
  selectedOrder: Orders;
  updadeList: CallableFunction;
}): React.ReactElement => {
  const context = useContext(OrderContext);
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
      message: `Quer mesmo deletar a encomenda #${id}?`,
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
    await api.delete(`/orders/${String(id)}`);
    updadeList();
  }

  function handleEdit() {
    context.setOrderContext(selectedOrder);
    history.push(`/order/update/${selectedOrder.id}`);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Descrição da encomenta"
      >
        <ModalContainer>
          <strong>Informações da encomenda</strong>
          <div>
            {selectedOrder.recipient ? (
              <p>
                {selectedOrder.recipient.address_name},{' '}
                {selectedOrder.recipient.address_number} <br />
                {selectedOrder.recipient.city} - {selectedOrder.recipient.state}
                <br />
                {selectedOrder.recipient.postal_code} <br />{' '}
              </p>
            ) : (
              <p>Sem destinatário</p>
            )}
          </div>
          <div>
            <strong>Datas</strong>
            {selectedOrder.formatedStartDate ? (
              <>
                <p>
                  <strong>Retirada</strong>: {selectedOrder.formatedStartDate}
                </p>
              </>
            ) : (
              <p>Não iniciada</p>
            )}

            {selectedOrder.formatedEndDate && (
              <p>
                <strong>Entrega</strong>: {selectedOrder.formatedEndDate}
              </p>
            )}
          </div>
          {selectedOrder.formatedEndDate && (
            <>
              <strong>Assinatura do destinatário</strong>
              <main>
                <img src={selectedOrder.signature?.url} alt="assinatura" />
              </main>
            </>
          )}
        </ModalContainer>
      </Modal>
      <Container>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={24} color="#C6C6c6" />
        </button>
        <ActionList visible={visible}>
          <button type="button" onClick={openModal}>
            <MdVisibility size={15} color="#8E5BE8" />
            Visualizar
          </button>
          <button type="button" onClick={handleEdit}>
            <MdEdit size={15} color="#4D85EE" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => handleDeleteRequest(selectedOrder.id)}
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

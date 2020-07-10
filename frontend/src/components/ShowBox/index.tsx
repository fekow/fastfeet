import React from 'react';
import { Container } from './styles';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ShowBox: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Container>
          <div>
            <strong>Informações da encomenda</strong>
            <p>
              Rua colombo <br />
              Porto alegre - RS <br />
              91420-452 <br />
            </p>
            <strong>Datas</strong>
            <p>
              <strong>Retirada</strong>: 25/06/2020
            </p>
            <p>
              <strong>Entrega</strong>: 25/06/2020
            </p>
            <strong>Assinatura do destinatário</strong>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Assinatura_de_Jo%C3%A3o_Goulart.jpg"
              alt="assinatura"
            />
          </div>
        </Container>
      </Modal>
    </>
  );
};

export default ShowBox;

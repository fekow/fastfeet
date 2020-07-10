import React from 'react';
import PropTypes from 'prop-types';
import { Container, Points, Point, Line, Labels, Label } from './styles';

interface Props {
  status: string;
}
const Progress: React.FC<Props> = ({ status }) => {
  return (
    <Container>
      <Points>
        <Point finished />
        <Line />
        <Point finished={status === 'Retirada' || status === 'Entregue'} />
        <Line />
        <Point finished={status === 'Entregue'} />
      </Points>
      <Labels>
        <Label>Aguardando Retirada</Label>
        <Label>Retirada</Label>
        <Label>Entregue</Label>
      </Labels>
    </Container>
  );
};

Progress.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Progress;

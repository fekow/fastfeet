/* eslint-disable react/prop-types */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Progress from '~/components/Progress';

import formatDate from '~/util/formatDate';

import {
  Container,
  OrderId,
  Id,
  OrderInfo,
  OrderDetails,
  InfoBig,
  InfoSmall,
  DetailsButton,
  DetailsText,
} from './styles';

interface Props {
  navigation: any;
  id: number;
  product: string;
  created_at: string;
  city?: string;
  status: string;
}
const Deliveries: React.FC<Props> = ({
  navigation,
  city,
  status,
  created_at,
  id,
}) => {
  const dateFormated = formatDate(created_at);
  return (
    <Container>
      <OrderId>
        <Icon name="local-shipping" size={30} color="#7d40e7" />
        <Id>
          Entrega-
          {id}
        </Id>
      </OrderId>
      <Progress status={status} />
      <OrderInfo>
        <OrderDetails>
          <InfoSmall>Data</InfoSmall>
          <InfoBig>{dateFormated}</InfoBig>
        </OrderDetails>
        <OrderDetails>
          <InfoSmall>Cidade</InfoSmall>
          <InfoBig>{city}</InfoBig>
        </OrderDetails>
        <DetailsButton onPress={() => navigation.navigate('Details', { id })}>
          <DetailsText>Ver detalhes</DetailsText>
        </DetailsButton>
      </OrderInfo>
    </Container>
  );
};

export default Deliveries;

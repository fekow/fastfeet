import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import {
  Container,
  Welcome,
  Avatar,
  CourierInfo,
  Message,
  Pending,
  Done,
  Heading,
  SwitchLinks,
  SwitchNavigation,
  SwitchLink,
  DeliveryHeading,
} from './styles';

import { RootState } from '~/store/modules/rootReducer';

interface Props {
  navigation: any;
  status: string;
  setStatus: any;
}
const Header: React.FC<Props> = ({ navigation, status, setStatus }) => {
  const courier = useSelector((state: RootState) => state.user.profile);
  return (
    <Container>
      <Welcome>
        <Avatar
          source={{
            uri: courier.avatar?.url
              ? courier.avatar.url
              : `https://api.adorable.io/avatar/75/feko.png`,
          }}
        />
        <CourierInfo>
          <Message>Bem vindo de volta,</Message>
          <Heading>{courier.name}</Heading>
        </CourierInfo>
        <RectButton onPress={() => navigation.navigate('Profile')}>
          <Icon name="exit-to-app" color="#e74040" size={30} />
        </RectButton>
      </Welcome>
      <SwitchNavigation>
        <SwitchLink onPress={() => setStatus('')}>
          <DeliveryHeading status={status}>Entregas</DeliveryHeading>
        </SwitchLink>
        <SwitchLinks>
          <SwitchLink onPress={() => setStatus('Pendente')}>
            <Pending status={status}>Pendentes</Pending>
          </SwitchLink>
          <SwitchLink onPress={() => setStatus('Entregue')}>
            <Done status={status}>Entregues</Done>
          </SwitchLink>
        </SwitchLinks>
      </SwitchNavigation>
    </Container>
  );
};

Header.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default Header;

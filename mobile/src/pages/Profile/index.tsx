import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  Avatar,
  CourierInfo,
  Description,
  Info,
  SubmitButton,
} from './styles';
import formatDate from '~/util/formatDate';
import { RootState } from '~/store/modules/rootReducer';

const Deliveries: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const courier = useSelector((state: RootState) => state.user.profile);
  function handleLogout() {
    navigation.reset({
      routes: [{ name: 'Delivery' }],
    });
    dispatch(signOut());
  }
  const formatedDate = useMemo(() => formatDate(courier.created_at), [courier]);
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Avatar
        source={{
          uri: courier.avatar?.url
            ? courier.avatar.url
            : `https://api.adorable.io/avatar/100/${courier.name}.png`,
        }}
      />
      <CourierInfo>
        <Description>Nome Completo</Description>
        <Info>{courier.name}</Info>
        <Description>Email</Description>
        <Info>{courier.email}</Info>
        <Description>Data de Cadastro</Description>
        <Info>{formatedDate}</Info>
        <SubmitButton onPress={handleLogout}>Logout</SubmitButton>
      </CourierInfo>
    </Container>
  );
};

export default Deliveries;

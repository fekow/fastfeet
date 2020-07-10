import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {
  Container,
  TitleView,
  Title,
  DeliveryInfoView,
  Label,
  Info,
  StatusView,
  DateView,
  ActionsView,
  OptionView,
  OptionButton,
  OptionDescription,
  StartButton,
} from './styles';

import Background from '~/components/Background';
import api from '~/services/api';
import { RootState } from '~/store/modules/rootReducer';
import formatDate from '~/util/formatDate';
import { Orders } from '~/types';
import { RootStackParamList } from '~/routes/delivery.routes';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const Details: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const courierId = useSelector((state: RootState) => state.user.profile.id);
  const [order, setOrder] = useState<Orders>({
    id: -1,
    status: '',
    product: '',
    created_at: '',
  });
  useEffect(() => {
    async function loadOrder() {
      const { data } = await api.get(`/deliveryman/${courierId}/order/${id}`);
      setOrder({
        ...data,
        formatedStartDate: data.start_date
          ? formatDate(data.start_date)
          : '- - / - - / - -',
        formatedEndDate: data.end_date
          ? formatDate(data.end_date)
          : '- - / - - / - -',
      });
    }
    loadOrder();
  }, []); //eslint-disable-line
  async function handleStart() {
    try {
      const data = new FormData();
      data.append('order_id', String(id));
      await api.put(`/deliveryman/${courierId}`, data);
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível aceitar a entrega.');
    }
  }
  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Background>
        <Container>
          <TitleView>
            <Icon name="local-shipping" size={20} color="#7d40e7" />
            <Title>Informações da entrega</Title>
          </TitleView>
          <DeliveryInfoView>
            <Label>DESTINATÁRIO</Label>
            <Info>
              {order.recipient?.name ? order.recipient.name : 'Sem nome'}
            </Info>
          </DeliveryInfoView>
          <DeliveryInfoView>
            <Label>ENDEREÇO DE ENTREGA</Label>
            <Info>
              {order.recipient
                ? `${order.recipient.address_name}, ${
                    order.recipient.address_number
                  }, ${order.recipient.street_add_on || 'Sem Complemento'}, ${
                    order.recipient.city
                  } - ${order.recipient.state}`
                : 'Sem endereco'}
            </Info>
          </DeliveryInfoView>
          <DeliveryInfoView>
            <Label>PRODUTO</Label>
            <Info>{order.product}</Info>
          </DeliveryInfoView>
          <StatusView>
            <Icon name="event" size={20} color="#7d40e7" />
            <Title>Situação da entrega</Title>
          </StatusView>
          <DeliveryInfoView>
            <Label>STATUS</Label>
            <Info>{order.status}</Info>
          </DeliveryInfoView>
          <DateView>
            <DeliveryInfoView>
              <Label>DATA DE RETIRADA</Label>
              <Info>{order.formatedStartDate}</Info>
            </DeliveryInfoView>
            <DeliveryInfoView>
              <Label>DATA DE ENTREGA</Label>
              <Info>{order.formatedEndDate}</Info>
            </DeliveryInfoView>
          </DateView>
          {order.status === 'Pendente' ? (
            <StartButton onPress={handleStart}>Iniciar entrega</StartButton>
          ) : (
            <ActionsView>
              <OptionView
                style={{
                  borderRightColor: '#eee',
                  borderRightWidth: 1,
                  paddingRight: 20,
                }}
              >
                <OptionButton
                  onPress={() =>
                    navigation.navigate('CreateProblem', { id, courierId })}
                >
                  <Icon name="highlight-off" size={30} color="#e74040" />
                  <OptionDescription>Informar problema</OptionDescription>
                </OptionButton>
              </OptionView>
              <OptionView
                style={{
                  borderRightColor: '#eee',
                  borderRightWidth: 1,
                  paddingRight: 20,
                }}
              >
                <OptionButton
                  onPress={() => navigation.navigate('Problems', { id })}
                >
                  <Icon name="info-outline" size={30} color="#e7ba40" />
                  <OptionDescription>Visualizar problemas</OptionDescription>
                </OptionButton>
              </OptionView>
              <OptionView>
                <OptionButton
                  onPress={() =>
                    navigation.navigate('Signature', { id, courierId })}
                >
                  <Icon name="check-circle" size={30} color="#7d40e7" />
                  <OptionDescription>Confirmar Entrega</OptionDescription>
                </OptionButton>
              </OptionView>
            </ActionsView>
          )}
        </Container>
      </Background>
    </>
  );
};

export default Details;

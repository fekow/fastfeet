/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Image, Platform, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Background from '~/components/Background';
import Camera from '~/components/Camera';
import api from '~/services/api';

import { Container, SubmitButton, SubmitOptionButton } from './styles';

import { RootStackParamList } from '~/routes/delivery.routes';

type SignatureNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signature'
>;

type SignatureRouteProp = RouteProp<RootStackParamList, 'Signature'>;

type Props = {
  navigation: SignatureNavigationProp;
  route: SignatureRouteProp;
};

const Signature: React.FC<Props> = ({ route, navigation }) => {
  const { id, courierId } = route.params;
  const [cameraOpen, setCameraOpen] = useState(true);
  const [image, setImage] = useState('');

  async function submitSignature() {
    try {
      const data = new FormData();
      data.append('order_id', String(id));
      data.append('signature', {
        name: image.split('/')[9],
        uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        type: 'image/jpeg',
      });
      await api.put(`/deliveryman/${courierId}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Bom trabalho!', 'Entrega finalizada com sucesso.');
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Houve um problema no upload da foto, tente novamente.',
      );
    }
  }
  return (
    <Background>
      <Container>
        {!cameraOpen ? (
          image ? (
            <>
              <Image
                style={{ flex: 1, borderRadius: 4 }}
                source={{ uri: image }}
              />
              <SubmitOptionButton onPress={() => submitSignature()}>
                Enviar
              </SubmitOptionButton>
              <SubmitOptionButton
                onPress={() => setCameraOpen(true)}
                style={{ backgroundColor: '#e74040', marginBottom: 0 }}
              >
                Tirar outra foto
              </SubmitOptionButton>
            </>
          ) : (
            <SubmitButton onPress={() => setCameraOpen(true)}>
              Abrir Câmera
            </SubmitButton>
          )
        ) : (
          <Camera setImage={setImage} setCameraOpen={setCameraOpen} />
        )}
      </Container>
    </Background>
  );
};

export default Signature;

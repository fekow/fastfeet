import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Background from '~/components/Background';
import { Container, ProblemInput, SubmitProblem } from './styles';
import { RootStackParamList } from '~/routes/delivery.routes';
import api from '~/services/api';

type CreateProblemScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateProblem'
>;

type CreateProblemScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreateProblem'
>;

type Props = {
  navigation: CreateProblemScreenNavigationProp;
  route: CreateProblemScreenRouteProp;
};
const CreateProblem: React.FC<Props> = ({ navigation, route }) => {
  const [problem, setProblem] = useState('');
  const { id, courierId } = route.params;
  async function handleSubmit() {
    try {
      await api.post(`/delivery/${id}/problems`, {
        courier_id: courierId,
        description: problem,
      });
      Alert.alert('Aviso', 'Problema registrado com sucesso!');
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao enviar seu problema, tente novamente.',
      );
    }
  }
  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Background>
        <Container>
          <ProblemInput
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            multiline
            autoCorrect={false}
            numberOfLines={12}
            textAlignVertical="top"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setProblem}
          />
          <SubmitProblem onPress={handleSubmit}>Enviar</SubmitProblem>
        </Container>
      </Background>
    </>
  );
};

export default CreateProblem;

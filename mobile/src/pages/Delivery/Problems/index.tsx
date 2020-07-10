import React, { useState, useEffect } from 'react';
import { StatusBar, View, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Background from '~/components/Background';
import {
  Container,
  Title,
  ProblemView,
  ProblemDescription,
  ProblemDate,
  ProblemTitle,
  ModalCentered,
  ModalContainer,
  ModalDescription,
  HideButton,
} from './styles';
import { RootStackParamList } from '~/routes/delivery.routes';

import api from '~/services/api';
import formatDate from '~/util/formatDate';

type ProblemsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Problems'
>;

type ProblemsScreenRouteProp = RouteProp<RootStackParamList, 'Problems'>;

type Props = {
  navigation: ProblemsScreenNavigationProp;
  route: ProblemsScreenRouteProp;
};

interface ProblemsResponse {
  description: string;
  created_at: string;
  id: number;
  formatedDate?: string;
}

const Problems: React.FC<Props> = ({ route }) => {
  const [problems, setProblems] = useState<ProblemsResponse[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<ProblemsResponse>({
    description: '',
    created_at: '',
    id: -1,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = route.params;
  useEffect(() => {
    async function handleSubmit() {
      const response: { data: ProblemsResponse[] } = await api.get(
        `/delivery/${id}/problems`,
      );
      const data = response.data.map(problem => {
        return {
          ...problem,
          formatedDate: formatDate(problem.created_at),
        };
      });
      setProblems(data);
    }
    handleSubmit();
  }, [id]);
  function handleModal(item: ProblemsResponse) {
    setModalVisible(true);
    setSelectedProblem(item);
  }
  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Background>
        <>
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <ModalCentered>
              <ModalContainer>
                <ProblemTitle>{`Problema ${selectedProblem.id}`}</ProblemTitle>
                <ModalDescription>
                  {selectedProblem.description}
                </ModalDescription>
                <HideButton onPress={() => setModalVisible(false)}>
                  <ProblemTitle>Ocultar</ProblemTitle>
                </HideButton>
              </ModalContainer>
            </ModalCentered>
          </Modal>
          <Title>{`Encomenda ${id}`}</Title>
          <Container>
            <FlatList
              data={problems}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <ProblemView onPress={() => handleModal(item)}>
                  <View style={{ flex: 1 }}>
                    <ProblemDescription>{item.description}</ProblemDescription>
                  </View>
                  <ProblemDate>{item.formatedDate}</ProblemDate>
                </ProblemView>
              )}
            />
          </Container>
        </>
      </Background>
    </>
  );
};

export default Problems;

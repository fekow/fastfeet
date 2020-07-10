import React, { useCallback, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '~/components/Header';
import { Container } from './styles';
import { RootState } from '~/store/modules/rootReducer';
import Deliveries from '~/components/Deliveries';
import { RootStackParamList } from '~/routes/delivery.routes';

import { deliveriesRequest } from '~/store/modules/deliveries/actions';

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const { id } = useSelector((state: RootState) => state.user.profile);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(deliveriesRequest(id, status));
    }, [status, id, dispatch]),
  );

  const { deliveries, loading, totalPages } = useSelector(
    (state: RootState) => state.deliveries,
  );

  function loadMoreDeliveires() {
    if (page < totalPages) {
      setPage(page + 1);
      dispatch(deliveriesRequest(id, status, page));
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <FlatList
          ListHeaderComponent={() => (
            <Header
              navigation={navigation}
              setStatus={setStatus}
              status={status}
            />
          )}
          data={deliveries}
          progressViewOffset={140}
          onRefresh={() => dispatch(deliveriesRequest(id, status))}
          keyExtractor={item => String(item.id)}
          refreshing={loading}
          onEndReached={loadMoreDeliveires}
          onEndReachedThreshold={0.2}
          renderItem={({ item }) => (
            <Deliveries
              navigation={navigation}
              id={item.id}
              product={item.product}
              created_at={item.created_at}
              city={item.recipient?.city}
              status={item.status}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Dashboard;

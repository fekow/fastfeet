import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const OrderId = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
export const Id = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const InfoSmall = styled.Text`
  font-size: 10px;
  color: #999;
`;
export const InfoBig = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

export const OrderInfo = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const OrderDetails = styled.View``;

export const DetailsButton = styled(RectButton)``;

export const DetailsText = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
`;

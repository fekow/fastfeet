import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: #fff;
  margin: 10px 25px 40px;
  border-radius: 4px;
  padding: 10px;
`;
export const TitleView = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const DeliveryInfoView = styled.View`
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #999;
  margin-top: 7px;
`;

export const Info = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #666;
`;
export const StatusView = styled.View`
  flex-direction: row;
  margin: 20px 0 10px;
`;

export const DateView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;
export const ActionsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OptionButton = styled(RectButton)`
  align-items: center;
  border-radius: 4px;
`;
export const OptionView = styled.View``;

export const OptionDescription = styled.Text`
  width: 80px;
  color: #999;
  font-size: 14px;
  text-align: center;
`;

export const StartButton = styled(Button)``;

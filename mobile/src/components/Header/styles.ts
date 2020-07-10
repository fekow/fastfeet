import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
`;

export const Welcome = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* justify-content: center; */
`;
export const Avatar = styled.Image`
  width: 76px;
  height: 76px;
  border-radius: 38px;
`;

export const CourierInfo = styled.View`
  flex-grow: 2;
  margin-left: 20px;
`;
export const Message = styled.Text`
  color: #999;
  font-size: 14px;
`;

export const Heading = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;

export const SwitchNavigation = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
export const DeliveryHeading = styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-decoration: ${(props: { status: string }) =>
    props.status === '' ? 'underline' : 'none'};
`;

export const Pending = styled.Text`
  color: ${(props: { status: string }) =>
    props.status === 'Pendente' ? '#7d40e7' : '#999'};
  font-size: 14px;
  font-weight: bold;
  text-decoration: ${(props: { status: string }) =>
    props.status === 'Pendente' ? 'underline' : 'none'};
`;
export const Done = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-decoration: ${(props: { status: string }) =>
    props.status === 'Entregue' ? 'underline' : 'none'};
  color: ${(props: { status: string }) =>
    props.status === 'Entregue' ? '#7d40e7' : '#999'};
`;

export const SwitchLinks = styled.View`
  flex-direction: row;
`;

export const SwitchLink = styled.TouchableOpacity`
  margin-left: 10px;
`;

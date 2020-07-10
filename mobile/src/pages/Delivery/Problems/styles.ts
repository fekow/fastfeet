import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  margin: 10px 25px 40px;
  border-radius: 4px;
  padding: 15px 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: #7d40e7;
  font-weight: bold;
`;

export const ProblemView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  flex: 1;
  padding-bottom: 7px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const ProblemDescription = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 18px;
  color: #999;
`;

export const ProblemDate = styled.Text`
  font-size: 14px;
  color: #c1c1c1;
`;

export const ModalCentered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  margin: 20px;
  background-color: #7d40e7;
  border-radius: 4px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: red;
  shadow-offset: 0px 0px;
  elevation: 5;
`;

export const ProblemTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ModalDescription = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const HideButton = styled.TouchableOpacity`
  background: #e7ba40;
  margin-top: 10px;
  align-self: stretch;
  align-items: center;
  border-radius: 4px;
  padding-top: 5px;
`;

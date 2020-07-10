import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
`;
export const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

export const CourierInfo = styled.View`
  margin-top: 20px;
  padding: 0 30px;
  align-self: stretch;
`;

export const Description = styled.Text`
  margin-top: 10px;
  color: #666;
  font-size: 14px;
`;

export const Info = styled.Text`
  color: #444;
  font-size: 20px;
  font-weight: bold;
`;

export const SubmitButton = styled(Button)`
  margin-top: 40px;
  background: #e74040;
`;

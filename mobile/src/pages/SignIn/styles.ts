import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #7d40e7;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
export const Form = styled.SafeAreaView`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled.TextInput`
  background: #fff;
  border-radius: 4px;
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  background: #82bf18;
  margin-top: 20px;
`;

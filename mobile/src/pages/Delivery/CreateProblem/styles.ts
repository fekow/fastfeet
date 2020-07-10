import styled from 'styled-components/native';
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

export const ProblemInput = styled.TextInput`
  background: #fff;
  padding: 10px;
  font-size: 18px;
`;

export const SubmitProblem = styled(Button)``;

export const SubmitText = styled.Text``;

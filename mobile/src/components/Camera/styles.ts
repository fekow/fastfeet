import styled from 'styled-components/native';
import Button from '~/components/Button';

export const CameraButton = styled.TouchableOpacity`
  align-self: center;
  justify-content: center;
`;
export const CameraView = styled.View`
  align-self: center;
  margin-bottom: 20px;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 35px;
  width: 70px;
  height: 70px;
`;
export const FlashView = styled.View`
  margin: 20px 0 0 20px;
`;

export const FlashButton = styled.TouchableOpacity``;

export const SubmitOptionButton = styled(Button)`
  margin: 10px 0 10px;
`;

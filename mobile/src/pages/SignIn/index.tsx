import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import logo from '~/assets/fastfeet-logo.png';
import { Container, Form, FormInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

const SignIn: React.FC = () => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  function handleSubmit() {
    dispatch(signInRequest(id));
  }
  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Insira seu ID de cadastro"
          returnKeyType="send"
          value={id}
          onChangeText={setId}
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignIn;

import React, { ChangeEvent, useRef, useEffect, useState } from 'react';
import api from 'services/api';
import { MdError } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import { Container } from './styles';

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const AvatarInput: React.FC<InputProps> = ({ name }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // default value vem do initialstate do form, que vem do meu state redux user
  const { registerField, defaultValue, fieldName, error } = useField(name);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(
    defaultValue
      ? defaultValue.url
      : 'https://api.adorable.io/avatars/285/avatar.png'
  );

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const data = new FormData();
    // sempre vem um array do file, escolhe o 1
    const file = e.target.files?.[0];
    // nome do campo esperado pelo backend(file)
    if (file) {
      data.append('file', file);
      const response = await api.post('/files', data);
      if (!response) {
        toast.error('Falha no upload');
      }
      const { id, url } = response.data;
      setPreview(url);
      setFile(id);
    }
  }

  useEffect(() => {
    // cadastra filed pro unfform reconhecer ele
    // name é como vai aparecer no formData pro update profile
    //tem que usar esse dataset.file quando usa data-file
    registerField({
      name: fieldName,
      path: 'dataset.file',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container>
        <label htmlFor="avatar_id">
          <span>+</span>
          {preview && <img src={preview} alt="avatar" />}
          <input
            type="file"
            ref={inputRef}
            id={fieldName}
            // passa o id pro unform????
            data-file={file}
            onChange={handleChange}
            accept="image/*"
          />
        </label>
      </Container>
      {error && (
        <span
          style={{
            color: '#de3b3b ',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MdError
            size={18}
            color="#de3b3b"
            style={{ alignSelf: 'center', marginRight: '5px' }}
          />
          {error}
        </span>
      )}
    </>
  );
};

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AvatarInput;

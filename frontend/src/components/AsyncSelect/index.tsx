import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import { MdError } from 'react-icons/md';
import PropTypes from 'prop-types';
interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
}

const AsyncSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option: any) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <Select
        {...rest}
        ref={selectRef}
        classNamePrefix="react-select"
        defaultOptions
        cacheOptions
      />{' '}
      {error && (
        <span
          style={{
            color: '#de3b3b ',
            display: 'flex',
            margin: '10px 0 0',
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

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AsyncSelect;

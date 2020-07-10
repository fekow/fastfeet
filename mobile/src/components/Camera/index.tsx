import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CameraView, CameraButton, FlashButton, FlashView } from './styles';

interface Props {
  setImage: (value: string) => void;
  setCameraOpen: (value: boolean) => void;
}

const CameraComponent: React.FC<Props> = ({ setImage, setCameraOpen }) => {
  const [flash, setFlash] = useState(false);

  async function takePicture(camera: RNCamera) {
    const options = { quality: 0.5 };
    const data = await camera.takePictureAsync(options);
    setImage(data.uri);
    setCameraOpen(false);
  }

  return (
    <RNCamera
      style={{ flex: 1, justifyContent: 'space-between' }}
      type={RNCamera.Constants.Type.back}
      flashMode={
        flash
          ? RNCamera.Constants.FlashMode.on
          : RNCamera.Constants.FlashMode.off
      }
      captureAudio={false}
    >
      {({ camera, status }) => {
        return (
          <>
            <FlashView>
              <FlashButton
                disabled={status !== 'READY'}
                onPress={() => setFlash(!flash)}
              >
                <Icon
                  name={flash ? 'flash-on' : 'flash-off'}
                  size={30}
                  color="#999"
                />
              </FlashButton>
            </FlashView>
            <CameraView>
              <CameraButton
                disabled={status !== 'READY'}
                onPress={() => takePicture(camera)}
              >
                <Icon name="photo-camera" size={30} color="#999" />
              </CameraButton>
            </CameraView>
          </>
        );
      }}
    </RNCamera>
  );
};

CameraComponent.propTypes = {
  setImage: PropTypes.func.isRequired,
  setCameraOpen: PropTypes.func.isRequired,
};

export default CameraComponent;

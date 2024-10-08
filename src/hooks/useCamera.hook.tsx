import React, {useRef, useState} from 'react';

import {Camera, useCameraDevice} from 'react-native-vision-camera';

export enum CameraPermissionEnum {
  GRANTED = 'granted',
  NOT_DETERMINED = 'not-determined',
  DENIED = 'denied',
  RESTRICTED = 'restricted',
}

export enum FlashModeEnum {
  AUTO = 'auto',
  ON = 'on',
  OFF = 'off',
}

export default function useCameraHook() {
  const cameraRef = useRef<any>(null);
  const device: any = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  const getPermission = async () => {
    await Camera.requestCameraPermission();
  };

  const getPermissionStatus = () => {
    return Camera.getCameraPermissionStatus();
  };

  const capturePhoto = async (flashMode: FlashModeEnum) => {
    if (cameraRef.current !== null) {
      const doesDeviceHasFlash = cameraRef.current.props.device.hasFlash;
      console.log('doesDeviceHasFlash', doesDeviceHasFlash);
      const photo = await cameraRef.current.takePhoto({
        flash: doesDeviceHasFlash ? flashMode : 'off',
      });
      setImageSource(photo.path);
      setShowCamera(false);
    }
  };

  return {
    cameraRef,
    device,
    showCamera,
    imageSource,
    setShowCamera,
    setImageSource,
    getPermission,
    capturePhoto,
    getPermissionStatus,
  };
}

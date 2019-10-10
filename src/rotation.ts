import { Mat4 } from './mat4';

export function rotation(rotX: number, rotY: number, rotZ: number) {
  const matX = new Mat4(4, 4);
  matX.setValue(0, 0, 1);
  matX.setValue(1, 1, Math.cos(rotX));
  matX.setValue(2, 1, -Math.sin(rotX));
  matX.setValue(1, 2, Math.sin(rotX));
  matX.setValue(2, 2, Math.cos(rotX));
  matX.setValue(3, 3, 1);

  const matY = new Mat4(4, 4);
  matY.setValue(0, 0, Math.cos(rotY));
  matY.setValue(2, 0, Math.sin(rotY));
  matY.setValue(1, 1, 1);
  matY.setValue(0, 2, -Math.sin(rotY));
  matY.setValue(2, 2, Math.cos(rotY));
  matY.setValue(3, 3, 1);

  const matZ = new Mat4(4, 4);
  matZ.setValue(0, 0, Math.cos(rotZ));
  matZ.setValue(1, 0, -Math.sin(rotZ));
  matZ.setValue(0, 1, Math.sin(rotZ));
  matZ.setValue(1, 1, Math.cos(rotZ));
  matZ.setValue(2, 2, 1);
  matZ.setValue(3, 3, 1);

  return matX.mul(matY).mul(matZ);
}

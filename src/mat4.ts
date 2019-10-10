export class Mat4 {
  public m: number;
  public n: number;
  private matrix: number[][];

  constructor(m: number, n: number) {
    this.m = m;
    this.n = n;
    this.init();
  }

  public toArray() {
    const arr: number[] = [];
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        arr[i + this.m * j] = this.matrix[i][j];
      }
    }
    return arr;
  }

  public getValue(i: number, j: number) {
    return this.matrix[i][j];
  }

  public setValue(i: number, j: number, value: number) {
    this.matrix[i][j] = value;
  }

  public mul(mat: Mat4) {
    if (this.n !== mat.m) {
      throw new Error('サイズの不一致');
    }

    const newMat = new Mat4(this.m, mat.n);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < mat.n; j++) {
        newMat.setValue(i, j, f(i, j, this, mat));
      }
    }
    return newMat;

    function f(i: number, j: number, mat1: Mat4, mat2: Mat4) {
      let sum = 0;
      for (let k = 0; k < mat1.n; k++) {
        sum += mat1.getValue(i, k) * mat2.getValue(k, j);
      }
      return sum;
    }
  }

  private init() {
    this.matrix = [];
    for (let i = 0; i < this.m; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.n; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }
}

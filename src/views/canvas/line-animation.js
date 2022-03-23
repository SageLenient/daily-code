/*
 * @Author: Yanzhao.Zhang
 * @Date: 2022-03-23 20:20:50
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-23 22:01:05
 * @Description: loading效果
 */
/**
 * @description: 画线loading
 * @param {*
 *  id: canvas的id
 *  length: 正方形边长
 *  color: 渐变色
 *  timeStep: 默认40ms，即1秒走完一圈25帧
 *  lineWidth: 线宽
 * }
 * @return {*}
 */
export default class CreateLine {
  constructor(options) {
    this._init(options);
  }

  _init(options) {
    const {
      id,
      length,
      colors,
      timeStep,
      lineWidth,
    } = options;
    this._id = id;
    this._length = length || 600;
    this._colors = colors ? [...colors] : ['#BD68AB', '#6874F2'];
    this._timeStep = timeStep || 40;
    this._lineWidth = lineWidth || 8;
    this._firstPoint = [this._length / 2, 0];
    this._secondPoint = [this._length, 0];
    this._thirdPoint = [this._length, this._length / 2];
    this._timer = null;
    this._canvas = null;
  }

  draw(length) {
    this._canvas = document.getElementById(this._id);
    this.destroy();
    if (length > 0 && length !== this._length) {
      const scale = this._length / length;
      this._firstPoint = this._scale(this._firstPoint, scale);
      this._secondPoint = this._scale(this._secondPoint, scale);
      this._thirdPoint = this._scale(this._thirdPoint, scale);
      this._length = length;
    }
    if (this._canvas.getContext) {
      this._ctx = this._canvas.getContext('2d');
      this._ctx.lineWidth = this._lineWidth;
      this._timer = setInterval(() => {
        this._roundLine();
        [
          this._firstPoint,
          this._secondPoint,
          this._thirdPoint,
        ] = this._pointChange();
      }, this._timeStep);
    }
  }

  destroy() {
    clearInterval(this._timer);
  }

  _scale(arr, scale) {
    return arr.map((item) => item * scale);
  }

  _roundLine() {
    this._ctx.clearRect(0, 0, 600, 600);
    this._ctx.beginPath();
    this._ctx.moveTo(...this._firstPoint);
    this._ctx.lineTo(...this._secondPoint);
    this._ctx.lineTo(...this._thirdPoint);
    const grd = this._ctx.createLinearGradient(
      ...this._firstPoint,
      ...this._thirdPoint,
    ); // 线性渐变的起止坐标
    for (let i = 0; i < this._colors.length; i++) {
      grd.addColorStop(i / this._colors.length, this._colors[i]);
    }
    this._ctx.strokeStyle = grd;
    this._ctx.stroke();
  }

  _pointChange() {
    const frame = 1000 / this._timeStep;
    const step = 4 * this._length / frame;
    const l = this._length;
    const fPoint = this._pointArr(this._firstPoint[0], this._firstPoint[1], step, l);
    let sPoint = [...this._secondPoint];
    if (fPoint[0] === 0) {
      sPoint = [0, 0];
    } else if (fPoint[1] === 0) {
      sPoint = [l, 0];
    } else if (fPoint[0] === l) {
      sPoint = [l, l];
    } else if (fPoint[1] === l) {
      sPoint = [0, l];
    }
    const tPoint = this._pointArr(this._thirdPoint[0], this._thirdPoint[1], step, l);
    return [fPoint, sPoint, tPoint];
  }

  _pointArr(x, y, step, l) {
    let nx = x;
    let ny = y;
    if (x === l && y <= l) { // right
      if (y < l - step) {
        ny = y + step;
      } else {
        nx = 2 * l - y - step;
        ny = l;
      }
    } else if (x === 0 && y <= l) { // left
      if (y > step) {
        ny = y - step;
      } else {
        nx = step - y;
        ny = 0;
      }
    } else if (y === l && x < l) { // bottom
      if (x > step) {
        nx = x - step;
      } else {
        ny = l - step + x;
        nx = 0;
      }
    } else if (y === 0 && x < l) { // 上边
      if (x < l - step) {
        nx = x + step;
      } else {
        ny = step + x - l;
        nx = l;
      }
    }
    return [nx, ny];
  }
}

const MAX_FRAMERATE = 30

class SimpleObject {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
    this.rotation = 0
  }

  moveTo(x2, y2, duration) {
    // rotation
    this.rotate(x2, y2)

    // получаем массив координат
    const res = this.#getLinearMotion(x2, y2, duration)

    // move
    this.x = x2
    this.y = y2

    return res
  }

  rotate(x2, y2) {
    const deg = this.#getDegree(x2, y2)

    // Изменяем положение камеры объекта, если все расчеты верны
    if (!Number.isNaN(deg)) this.rotation = x2 >= this.x ? deg : -deg

    return this
  }

  // ? ДОПУСКАЮ, что 50% пути объект ускоряется, затем 50% замедляется
  dynamicMoveTo(x2, y2, duration = 1_000) {
    // rotation
    this.rotate(x2, y2)

    const frameTime = 1000 / MAX_FRAMERATE
    const frames = Math.ceil((duration / 1000) * MAX_FRAMERATE)

    // координаты середины пути
    const xavg = (x2 - this.x) / 2
    const yavg = (y2 - this.y) / 2

    // Координаты при ускорении
    const acceleration = Array.from({ length: frames / 2 + 1 }, (_, idx) => {
      const time = frameTime * idx
      const [x, y] = this.#getUniformAcceleration(
        [this.x, this.y],
        [xavg, yavg],
        duration / 1000 / 2,
        time / 1000
      )
      return { x, y, time: +time.toFixed(2) }
    })

    // Координаты при торможении
    let braking = Array.from({ length: frames / 2 + 1 }, (_, idx) => {
      const time = frameTime * idx
      const [x, y] = this.#getUniformAcceleration(
        [x2, y2],
        [xavg, yavg],
        duration / 1000 / 2,
        time / 1000
      )
      return { x, y, time: +(duration - time).toFixed(2) }
    }).reverse()

    if (braking[0].time - acceleration.at(-1).time < frameTime / 2)
      braking = braking.slice(1)

    // move
    this.x = x2
    this.y = y2

    return [...acceleration, ...braking]
  }

  #getDegree(x2, y2) {
    // Найдем вектор по координатам точек
    const [ABx, ABy] = [0, this.y + 100_000]
    const [CDx, CDy] = [x2 - this.x, y2 - this.y]
    // Найдем скалярное произведение векторов
    const scalar = ABx * CDx + ABy * CDy
    // Найдем длину (модуль) вектора
    const AB = Math.sqrt(Math.pow(ABx, 2) + Math.pow(ABy, 2))
    const CD = Math.sqrt(CDx ** 2 + CDy ** 2)
    // Найдем угол между векторами
    const angle = scalar / (AB * CD)
    const deg = +((Math.acos(angle) * 180) / Math.PI).toFixed(2)

    return deg
  }

  #getLinearMotion(x2, y2, duration) {
    const frameTime = 1000 / MAX_FRAMERATE
    const frames = (duration / 1_000) * MAX_FRAMERATE

    return Array.from({ length: frames + 1 }, (_, idx) => {
      const x = ((x2 - this.x) / duration) * frameTime * idx
      const y = ((y2 - this.y) / duration) * frameTime * idx

      return {
        x: +(this.x + x).toFixed(2),
        y: +(this.y + y).toFixed(2),
        time: +(frameTime * idx).toFixed(2),
      }
    })
  }

  #getUniformAcceleration([x1, y1], [x2, y2], t, tnow) {
    // Скорость V = s/t  px/sec
    const vx = (x2 - x1) / t
    const vy = (y2 - y1) / t
    // Ускорение a = (v - v0) / t
    const ax = (vx - 0) / (t / 2)
    const ay = (vy - 0) / (t / 2)
    // Текущие координаты y = y0 + v0 * t + ((a * t**2)/ 2)
    const x = x1 + 0 * tnow + (ax * Math.pow(tnow, 2)) / 2
    const y = y1 + 0 * tnow + (ay * Math.pow(tnow, 2)) / 2

    return [+x.toFixed(2), Number(y.toFixed(2))]
  }
}

const obj = new SimpleObject(0, 0)

// console.log(obj.moveTo(10, 18, 1_000))
// console.log(obj.rotate(0, -90))
// console.log(obj.dynamicMoveTo(-500, 1000, 1_000))

const MAX_FRAMERATE = 10

class SimpleObject {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
    this.rotation = 0
  }

  moveTo(x2, y2, duration) {
    // rotation
    this.rotate(x2, y2)

    const frameTime = 1000 / MAX_FRAMERATE
    const frames = (duration / 1_000) * MAX_FRAMERATE

    const res = Array.from({ length: frames + 1 }, (_, idx) => {
      const x = ((x2 - this.x) / duration) * frameTime * idx
      const y = ((y2 - this.y) / duration) * frameTime * idx

      return {
        x: +(this.x + x).toFixed(2),
        y: +(this.y + y).toFixed(2),
        time: +(frameTime * idx).toFixed(2),
      }
    })

    // move
    this.x = x2
    this.y = y2

    return res
  }

  rotate(x2, y2) {
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

    // Изменяем положение камеры объекта, если все расчеты верны
    if (!Number.isNaN(deg)) this.rotation = x2 >= this.x ? deg : -deg

    return this
  }

  dynamicMoveTo(x2, y2, duration = 1_000) {
    // const sX = (x2 - this.x) / (duration / 1_000)
    // const sY = (y2 - this.y) / (duration / 1_000)
    // console.log(sX, sY)

    const frameTime = 1000 / MAX_FRAMERATE
    const frames = (duration / 1_000) * MAX_FRAMERATE

    const res = Array.from({ length: frames + 1 }, (_, idx) => {
      const time = frameTime * idx
      const coef = time / duration
      console.log(coef)

      let x = ((x2 - this.x) / duration) * frameTime * idx
      let y = ((y2 - this.y) / duration) * frameTime * idx

      if (time > duration / 2) {
        // торможение
        x += (x2 - x) * coef
        y += (y2 - y) * coef
      } else {
        // ускорение
        x += (x2 - x) * 0.5
        y += (y2 - y) * 0.5
      }

      return {
        x: +(this.x + x).toFixed(2),
        y: +(this.y + y).toFixed(2),
        time: +(frameTime * idx).toFixed(2),
      }
    })

    return res
  }
}

const obj = new SimpleObject(100, 100)

// console.log(obj.moveTo(10, 10, 1_000))
// console.log(obj.rotate(0, -90))
// console.log(obj.dynamicMoveTo(1000, 1000, 1_000))

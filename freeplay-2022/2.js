// const hash = require('object-hash')

class IndexedMap {
  constructor(input) {
    this.data = []
    // this.nextindex = 0
    if (input && input.length) for (let [k, v] of input) this.set(k, v)
  }

  set(key, value) {
    if (!this.has(key)) this.data.push({ key, value })
    return this
  }

  has(key) {
    return !!this.get(key)
  }

  hasIndex(index) {
    return index < this.size
  }

  get(key) {
    const obj = this.data.find(i => i.key === key)
    return obj ? obj.value : null
  }

  getByIndex(index) {
    return this.data[index] || null
  }

  remove(key) {
    this.data = this.data.filter(i => i.key !== key)
    return this
  }

  get size() {
    return this.data.length
  }

  forEach(cb) {
    for (let i = 0; i < this.size; i++) cb(this.data[i], i, this.data)
    return this
  }

  // TODO проверить maps или [maps]
  union(...maps) {
    maps.forEach(map => {
      map.forEach(({ key, value }, idx) => this.set(key, value))
    })

    return this
  }

  uniq() {
    return [...new Set(this.data.map(i => i.value))]
  }

  uniqKeys() {
    return [...new Set(this.data.map(i => i.key))]
  }

  sort(cb) {
    this.data.sort((a, b) => cb(a.value, b.value, a.key, b.key))
    return this
  }

  // ? моя реализация без хэш-таблиц и индексов
  // sortIndexes(cb) {
  //   return this
  // }

  setTo(index, [key, value]) {
    this.data.splice(index, 0, { key, value })
    return this
  }

  removeAt(index, count = 1) {
    this.data.splice(index, count)
    return this
  }
}

// const [keyObj, valueObj] = [{ title: 'Object' }, { desc: 'Simple' }]
// const arr = new IndexedMap([
//   [5, 'Five'],
//   [true, 1],
//   [keyObj, valueObj],
//   ['main', [1, 2, 3]],
// ])

// const data10 = new IndexedMap(
//   Array.from({ length: 10 }, (_, idx) => [idx, `value-${idx}`])
// )
// arr.union(
//   data10,
//   new IndexedMap([
//     ['hi', 'hello'],
//     ['bye', 'goodbye'],
//   ])
// )

// console.log(arr)

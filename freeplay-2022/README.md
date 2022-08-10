# Вакансия
[FreePlay - Junior JavaScript Developer (Playable Ads Developer Trainee)](https://rabota.by/vacancy/68074211)
### Технологии:
  - js
 
### Задание:
**Основное:**
1. Нужно написать набор функций для управления объектом в 2D пространстве:
Перемещение, поворот, перемещение с динамической скоростью (разбег-торможение).
Функции должны выдавать массивы значений, для промежутка времени. Например:
moveTo (from, to, duration, speed) и т.д.
2. Написать коллекцию, в которой ключи будут хранится в строгом порядке, в зависимости
от того, когда элемент был добавлен(что то подобное Map, но с возможностью, обратится
к элементу не только по ключу, но и по индексу).
Реализовать методы set, has, get, remove

**Дополнительное:**
1. Как и в основном задании (1), только для 3D
2. Как в основном задании (2), только реализовать методы:
    - union(объединение коллекций)
    - uniq(достать коллекцию уникальных значений)
    - sortIndex(сортировать индексы, принимает callback)
    - sort(сортировать значения, принимает callback)
    - setTo(добавить после индекса)
    - removeAt(удалить после индекса)

### Пример структуры коллекции:
```
class IndexedMap {
  set(key, value) {
    return this;
  }
  has(key) {
    return false;
  }
  hasIndex(index) {
    return false;
  }
  get(key) {
    return null;
  }
  getByIndex(index) {
    return null;
  }
  remove(key) {
    return this;
  }
  size() {
    return 0;
  }
  forEach(fn(value, key, index)) {
    return this;
  }
  union(...maps) {
    return this;
  }
  uniq() {
    return [];
  }
  uniqKeys() {
    return [];
  }
  sort(fn(value1, value2, key1, key2)) {
    return this;
  }
  sortIndexes(fn(index1, index2) {
    return this;
  }
  setTo(index, value) {
    return this;
  }
  removeAt(index, count = 1) {
    return this;
  }
}
```
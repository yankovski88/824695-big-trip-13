export const SortType = {
  DAY: `day`,
  TIME: `time`,
  PRICE: `price`,
};

// 15 это несколько типов пользовательских действий. Это для связи представление - презентер
export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`, // действие по обновлению данных
  ADD_POINT: `ADD_POINT`, // добавил точку
  DELETE_POINT: `DELETE_POINT` // удалил точку
};

// 16 это несколько типов пользовательских обновлений. Этот тип потребуется для связи презентер - модель - презентер
// в Observer т.е. нашим презентерам будем передовать информацию об этом ТИПе и полезную нагрузку
export const UpdateType = {
  PATCH: `PATCH`, // это требует самого минимального изменения юай
  MINOR: `MINOR`, // это изменение списка точек маршрута
  MAJOR: `MAJOR`, // это требуют перерисовки всей доски
  INIT: `INIT` // это нужно чтобы инициализировать проект когда данные придут с сревера
};

export const FilterType = { // типы фильтров
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

// 5stat
export const MenuItem = {
  ADD_NEW_POINT: `ADD_NEW_POINT`,
  POINTS: `POINTS`,
  STATISTICS: `STATISTICS`
};

// состояние задачи могут быть сохранения или удаления
export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

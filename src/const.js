export const SortType = {
  DAY: `day`,
  TIME: `time`,
  PRICE: `price`,
};

// 15 это несколько типов пользовательских действий. Это для связи представление - презентер
export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

// 16 это несколько типов пользовательских обновлений. Это презентер - модель - презентер
export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

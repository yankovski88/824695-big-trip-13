import {FilterType} from "../const";

const date = new Date();

export const filter = { // 57
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point.dateFrom),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom >= date),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateFrom < date),
};

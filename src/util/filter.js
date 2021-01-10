import {FilterType} from "../const";
import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from "./task";

export const filter = { // 57
  [FilterType.EVERYTHING]: (tasks) => tasks.filter((task) => !task.isArchive),
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => isTaskExpired(task.dueDate)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => isTaskExpiringToday(task.dueDate)),
  [FilterType.FAVORITES]: (tasks) => tasks.filter((task) => task.isFavorite),
  [FilterType.REPEATING]: (tasks) => tasks.filter((task) => isTaskRepeating(task.repeating)),
  [FilterType.ARCHIVE]: (tasks) => tasks.filter((task) => task.isArchive)
};

// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
//
// dayjs.extend(isBetween);
//
// export const countCompletedPointInDateRange = (points, dateFrom, dateTo) => {
//   return points.reduce((counter, point) => {
//     if (point.dueDate === null) {
//       return counter;
//     }
//
//     // С помощью day.js проверям, сколько задач с дедлайном
//     // попадают в диапазон дат
//     if ( //
//       dayjs(point.dueDate).isSame(dateFrom) ||
//       dayjs(point.dueDate).isBetween(dateFrom, dateTo) ||
//       dayjs(point.dueDate).isSame(dateTo)
//     ) {
//       return counter + 1;
//     }
//
//     return counter;
//   }, 0);
// };

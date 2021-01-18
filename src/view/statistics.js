import SmartView from "./smart.js"

const createStatisticsTemplate = (data) => {
//   const {points, dateFrom, dateTo} = data;
//   const completedTaskCount = countCompletedPointInDateRange(points, dateFrom, dateTo);
//   // const completedTaskCount = 0; // Нужно посчитать количество завершенных задач за период

  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>
<div>adsf</div>
          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>
`;
};


export default class statisticsView extends SmartView {
  constructor(){
    super(); // унаследовал от смарт его свойства и методы
    this._btnStatsElement = document.querySelector(`.trip-tabs__btn`);

    this._handleClickBtnStats = this._handleClickBtnStats.bind(this);
  }

  getTemplate(){
    return createStatisticsTemplate();
  }

  _handleClickBtnStats(evt){
    evt.preventDefault();
    this._callback.clickStat();

  }

  setClickStats(callback){
    this._callback.clickStat = callback;
    this._btnStatsElement.addEventListener(`click`, this._handleClickBtnStats)

  }
}



















// import dayjs from "dayjs";
// import flatpickr from "flatpickr";
// import SmartView from "./smart.js";
// import Chart from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import {countCompletedPointInDateRange} from "../util/statistics.js";
//
// const renderColorsChart = (colorsCtx, tasks) => {
//   // Функция для отрисовки графика по цветам
//
//
//   const moneyCtx = document.querySelector(`.statistics__chart--money`);
//   const typeCtx = document.querySelector(`.statistics__chart--transport`);
//   const timeCtx = document.querySelector(`.statistics__chart--time`);
//
// // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
//   const BAR_HEIGHT = 55;
//   moneyCtx.height = BAR_HEIGHT * 5;
//   typeCtx.height = BAR_HEIGHT * 5;
//   timeCtx.height = BAR_HEIGHT * 5;
//
//   const moneyChart = new Chart(moneyCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`],
//       datasets: [{
//         data: [400, 300, 200, 160, 150, 100],
//         backgroundColor: `#ffffff`,
//         hoverBackgroundColor: `#ffffff`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13
//           },
//           color: `#000000`,
//           anchor: `end`,
//           align: `start`,
//           formatter: (val) => `€ ${val}`
//         }
//       },
//       title: {
//         display: true,
//         text: `MONEY`,
//         fontColor: `#000000`,
//         fontSize: 23,
//         position: `left`
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#000000`,
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           minBarLength: 50
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false,
//       }
//     }
//   });
//
//   const typeChart = new Chart(typeCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`],
//       datasets: [{
//         data: [4, 3, 2, 1, 1, 1],
//         backgroundColor: `#ffffff`,
//         hoverBackgroundColor: `#ffffff`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13
//           },
//           color: `#000000`,
//           anchor: `end`,
//           align: `start`,
//           formatter: (val) => `${val}x`
//         }
//       },
//       title: {
//         display: true,
//         text: `TYPE`,
//         fontColor: `#000000`,
//         fontSize: 23,
//         position: `left`
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#000000`,
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           minBarLength: 50
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false,
//       }
//     }
//   });
//
// };
//
// const renderDaysChart = (daysCtx, tasks, dateFrom, dateTo) => {
//   // Функция для отрисовки графика по датам
// };
//
// const createStatisticsTemplate = (data) => {
//   const {points, dateFrom, dateTo} = data;
//   const completedTaskCount = countCompletedPointInDateRange(points, dateFrom, dateTo);
//   // const completedTaskCount = 0; // Нужно посчитать количество завершенных задач за период
//
//   return `<section class="statistics">
//           <h2 class="visually-hidden">Trip statistics</h2>
//<div>adsf</div>
//           <div class="statistics__item statistics__item--money">
//             <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
//           </div>
//
//           <div class="statistics__item statistics__item--transport">
//             <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
//           </div>
//
//           <div class="statistics__item statistics__item--time-spend">
//             <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
//           </div>
//         </section>
// `;
// };
//
// export default class Statistics extends SmartView {
//   constructor(points) {
//     super();
//
//     this._data = {
//       points,
//       // По условиям техзадания по умолчанию интервал - неделя от текущей даты
//       dateFrom: (() => {
//         const daysToFullWeek = 6;
//         return dayjs().subtract(daysToFullWeek, `day`).toDate();
//       })(),
//       dateTo: dayjs().toDate()
//     };
//     this._colorsCart = null;
//     this._daysChart = null;
//
//     this._dateChangeHandler = this._dateChangeHandler.bind(this);
//
//     this._setCharts();
//     this._setDatepicker();
//   }
//
//   removeElement() {
//     super.removeElement();
//
//     if (this._colorsCart !== null || this._daysChart !== null) {
//       this._colorsCart = null;
//       this._daysChart = null;
//     }
//
//     if (this._datepicker) {
//       this._datepicker.destroy();
//       this._datepicker = null;
//     }
//   }
//
//   getTemplate() {
//     return createStatisticsTemplate(this._data);
//   }
//
//   restoreHandlers() {
//     this._setCharts();
//     this._setDatepicker();
//   }
//
//   _dateChangeHandler([dateFrom, dateTo]) {
//     if (!dateFrom || !dateTo) {
//       return;
//     }
//
//     this.updateData({
//       dateFrom,
//       dateTo
//     });
//   }
//
//   _setDatepicker() {
//     if (this._datepicker) {
//       this._datepicker.destroy();
//       this._datepicker = null;
//     }
//
//     // this._datepicker = flatpickr(
//     //   this.getElement().querySelector(`.statistic__period-input`),
//     //   {
//     //     mode: `range`,
//     //     dateFormat: `j F`,
//     //     defaultDate: [this._data.dateFrom, this._data.dateTo],
//     //     onChange: this._dateChangeHandler
//     //   }
//     // );
//   }
//
//   _setCharts() {
//     // Нужно отрисовать два графика
//     // Нужно отрисовать два графика
//     if (this._colorsCart !== null || this._daysChart !== null) {
//       this._colorsCart = null;
//       this._daysChart = null;
//     }
//
//     const {points, dateFrom, dateTo} = this._data;
//     const colorsCtx = this.getElement().querySelector(`.statistic__colors`);
//     const daysCtx = this.getElement().querySelector(`.statistic__days`);
//
//     this._colorsCart = renderColorsChart(colorsCtx, points);
//     this._daysChart = renderDaysChart(daysCtx, points, dateFrom, dateTo);
//   }
// }

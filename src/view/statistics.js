import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getDateInDays} from "../util/render.js";
import dayjs from "dayjs";


const renderMoneyChart = (moneyCtx, labels, points) => {
  const costsByLabel = [];
  labels.forEach((label) => {
    let cost = 0;
    points.forEach((point) => {
      cost += (point.type.toLowerCase() === label.toLowerCase()) ? point.basePrice : 0;
    });
    costsByLabel.push(cost);
  });
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: costsByLabel,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};
const renderTypeChart = (typeCtx, labels, points) => {
  const labelCount = [];
  labels.forEach((label) => {
    let count = 0;
    points.forEach((point) => {
      count += (point.type.toLowerCase() === label.toLowerCase()) ? 1 : 0;
    });
    labelCount.push(count);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: labelCount,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, labels, points) => {
  const timeAmount = [];
  labels.forEach((label) => {
    let startTime = 0;
    let finishTime = 0;

    points.forEach((point) => {
      if (point.type.toLowerCase() === label.toLowerCase()) {
        startTime += dayjs(point.dateFrom);
        finishTime += dayjs(point.dateTo);
      }
    });
    timeAmount.push(dayjs(finishTime) - dayjs(startTime));
  });
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: timeAmount,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${getDateInDays(val)}`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>
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

// - Заведём новый компонент, подключим в точку входа и отобразим по
// умолчанию (временно)
export default class statisticsView extends SmartView {
// - Компонент статистики наследуем от умного компонента, потому что
//   компонент статистики должен уметь сам себя перерисовывать по действию
//   пользователя (выбор периода статистики)

  constructor(points) {
    super();
    this._points = points; // создал свойство с точками маршарута

    this._moneyChart = null; // занулили изначальные типы сортировки
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
    this._labels = [];

    // this._data = tasks;
    // this._data = {
    //   tasks,
    //   // По условиям техзадания по умолчанию интервал - неделя от текущей даты
    //   dateFrom: (() => {
    //     const daysToFullWeek = 6;
    //     return dayjs().subtract(daysToFullWeek, `day`).toDate();
    //   })(),
    //   dateTo: dayjs().toDate()
    // };
    // this._dateChangeHandler = this._dateChangeHandler.bind(this);
    // this._setCharts();
    // this._setDatepicker();
  }

  // метод который выводит разметку статистики
  getTemplate() {
    return createStatisticsTemplate(this._points);
  }

  // метод удаления всех
  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null; // занулили изначальные типы сортировки
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  // пока не знаю что код длеает
  _getUniquePoints() {
    const labelsList = this._points.reduce((acc, value) => [...acc, value.type.toUpperCase()], []);
    this._labels = [...new Set(labelsList)].sort();
  }

  // метод который вызывает повторно другие методы после удаления
  restoreHandlers() {
    this._setCharts();
  }

  // код в который должен отрисовать графики
  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    this._getUniquePoints();

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 80;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderMoneyChart(moneyCtx, this._labels, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._labels, this._points);
    this._timeChart = renderTimeChart(timeCtx, this._labels, this._points);
  }
}


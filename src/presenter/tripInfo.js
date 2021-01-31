// импортируем все вьюхи для Info
import TripInfoCostView from "../view/trip-info-cost";
import TripInfoView from "../view/trip-info.js";
import {renderElement, RenderPosition} from "../util/render";
// import {SortType} from "../const";
import dayjs from "dayjs";


export default class TripInfo {
  constructor(tripInfoContainer, pointsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._destinations = [];
    this._startDateInfo = [];
    this._tripInfoComponent = new TripInfoView(this._destinations, this._startDateInfo);
    this._pointsModel = pointsModel;
  }

  init(tripItems) { // tripItems
    this._tripItems = tripItems;
    this._renderDestination(this._tripItems); // this._pointsModel.getPoints()
    this._renderTotalCost(this._tripItems); // this._pointsModel.getPoints()
  }

  // _getPoints(){
  //   const points = this._pointsModel.getPoints(); // 67 // взяли задачи из другой модели
  // }
  // функция которая рендерит цену
  _renderTotalCost(tripItems) {
    const tripInfoElement = this._tripInfoContainer.querySelector(`.trip-main__trip-info`);
    this._totalPriceItem = 0;

    for (let itemFirst of tripItems) {
      this._totalPriceItem += itemFirst.basePrice; // подсчет основных затрат

      for (let item of itemFirst.offers) { // обошел весь массив через of itemFirst.offers[0].offers

        if (item.price) {
          this._totalPriceItem += parseInt(item.price, 10); // дополнительные затраты
        }
      }
    }

    renderElement(tripInfoElement, new TripInfoCostView(this._totalPriceItem), RenderPosition.BEFOREEND);
  }

  // функция которая выводит дистанцию дат и точек маршрута
  _renderDestination(tripItems) {
    tripItems.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))); // сортируем массив дат по порядку
    for (let i = 0; i < tripItems.length; i++) {
      this._destinations.push(tripItems[i].destination.name);
      this._startDateInfo.push(tripItems[i].dateFrom);
    }

    renderElement(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN); // рендер промежкутка даты
  }
}


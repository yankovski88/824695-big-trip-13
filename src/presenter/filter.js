import TripFilterView from "../view/trip-filter.js";
import {renderElement, RenderPosition, remove, replace} from "../util/render.js"; // replace
import {filter} from "../util/filter.js";
import {FilterType, UpdateType} from "../const.js";

export default class FilterPresenter { // 59
  constructor(filterContainer, filterModel) { // презентер должен уметь получать в себя 3 вещи pointsModel
    // filterContainer контейнер куда рисовать фильтры
    // filterModel модель откуда он будет брать данные для фильтра это флиьтр модель. Это текущий фильтр.
    // pointsModel нужно чтобы по текущему фильтру посчитать колличество точек
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    // this._tasksModel = tasksModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    // this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new TripFilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    // renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND); // рендер фильтр
      return;
    }

    replace(this._filterComponent, prevFilterComponent); // сделать
    // this._filterComponent.replaceWith(prevFilterComponent); // ЧТО ЕСТЬ ЧТО НЕТУ
    // prevFilterComponent.replaceWith(this._filterComponent); // ЧТО ЕСТЬ ЧТО НЕТУ

    remove(prevFilterComponent); // ЧТО ЕСТЬ ЧТО НЕТУ
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  // метод который заново перерисовывает фильтр
  _handleModelEvent() {
    this.init();
  }

  _getFilters() {
    // const tasks = this._tasksModel.getTasks();
    return [
      {
        type: FilterType.EVERYTHING,
        name: `everything`,
        // count: filter[FilterType.ALL](tasks).length
      },
      {
        type: FilterType.FUTURE,
        name: `future`,
        // count: filter[FilterType.OVERDUE](tasks).length
      },
      {
        type: FilterType.PAST,
        name: `past`,
        // count: filter[FilterType.TODAY](tasks).length
      },
    ];
  }
}

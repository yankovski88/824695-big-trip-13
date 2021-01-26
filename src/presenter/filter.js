import TripFilterView from "../view/trip-filter.js";
import {renderElement, RenderPosition, remove, replace} from "../util/render.js";
import {FilterType, UpdateType} from "../const.js";

export default class FilterPresenter {
  constructor(filterContainer, filterModel) { // презентер должен уметь получать в себя 2 вещи
    // filterContainer контейнер куда рисовать фильтры
    // filterModel модель откуда он будет брать данные для фильтра это флиьтр модель. Это текущий фильтр.
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new TripFilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND); // рендер фильтр
      return;
    }

    replace(this._filterComponent, prevFilterComponent); // сделать

    remove(prevFilterComponent);
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
    return [
      {
        type: FilterType.EVERYTHING,
        name: `everything`,
      },
      {
        type: FilterType.FUTURE,
        name: `future`,
      },
      {
        type: FilterType.PAST,
        name: `past`,
      },
    ];
  }
}

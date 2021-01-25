import dayjs from "dayjs";
import EventListEmptyMessageView from "../view/trip-event-msg.js";
import TripEventsList from "../view/trip-events-list.js";
import EventPresenter from "./event.js";

import TripEventsSortView from "../view/trip-events-sort-view";
import PointNewPresenter from "./point-new.js"; // 3add импортируем прзентер добавления точки

import {filter} from "../util/filter.js";
import {renderElement, RenderPosition, remove} from "../util/render";
import {SortType, UpdateType, UserAction, State} from "../const.js";
import LoadingView from "../view/loading.js";

// класс который занимается отрисовкой всего того, что входит в борд
export default class TripBoard {
  constructor(tripBoardContainer, pointsModel, filterModel, api, offersModel, destinationsModel) {
    this._filterModel = filterModel;
    this._pointsModel = pointsModel; // 6 создали свойство класса, чтобы в дальнейшем переиспользовать
    this._destinationsModel = destinationsModel;
    this._tripBoardContainer = tripBoardContainer;
    this._isLoading = true; // по умолчанию делаем состояние лоудинг, типо вечно крутится спинер
    this._api = api;
    this._offersModel = offersModel;

    this._eventListEmptyMessageComponent = new EventListEmptyMessageView();
    this._tripEventsListComponent = new TripEventsList();
    this._loadingComponent = new LoadingView(); // спинер это вот этот компонент
    this._tripEventsSortComponent = null;

    this._eventPresenter = {}; // это объект в котором будут хранится инстансы всех предложений презенторов
    // инстансы это экземляр твоего класса. Пример 1610420383719: Event...

    this._currentSortType = SortType.DAY; // сортировка по умолчанию

    this._main = document.querySelector(`.page-body__page-main`);
    this._pageBodyContainer = this._main.querySelector(`.page-body__container`);

    this._handleModeChange = this._handleModeChange.bind(this); // 1 наблюдатель

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this); // 21 оброботчик вызывает обновление модели
    this._handleModelEvent = this._handleModelEvent.bind(this); // 18 это обработка уведомлений от модели.

    // 4add т.к. мы имопртируем презентер PointNewPresenter, то нужно создать инстанс презентера новой точки маршрута
    this._pointNewPresenter = new PointNewPresenter(this._tripEventsListComponent, this._handleViewAction, this._getOffers(), this._getDestinations());
  }

  // В main.js в управлющем файле инициализируем TripBoard.init(). Он запустит всю логику MVP.  И ТОЛЬКО ПО БОРДУ!
  init() {
    // - Перенесем подписку на модель из конструктора в метод инициализации.
    //   Это нужно для того, чтобы при destroy отписаться от моделей, а при
    // повторной инициализации подписаться

    // модели передали в инициализацию пока не знаю зачем
    this._pointsModel.addObserver(this._handleModelEvent); // 17 stat  В модель точек с помощью обсерверов передали колбек который будет вызывать модель.
    this._filterModel.addObserver(this._handleModelEvent); // 65
    this._renderBoard();
  }

  // 2add метод который создает точку маршрута
  createPoint(blank, callback) { // был толтко blank
    this._pointNewPresenter.init(blank, callback); // должна производится инитицилизация которая отвечает за форму добавления tripItem
  }

  // метод уничтожения
  destroy() { // stat
    this._clearBoard({resetSortType: true});
    remove(this._tripEventsListComponent); // удаляем куда список куда вставляются точки и статистика

    this._pointsModel.removeObserver(this._handleModelEvent); // отписываемся от модели. т.е. удаляем колбек по перерисовке борда
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  // 40 рендарим доску со всеми списками, точками маршрута, а если их нет, то выводим пустое сообщение
  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    // const offers = Object.assign({}, this._getOffers());

    const points = this._getPoints(); // берем все данные из модели по точкам маршрута уже отсортированные и отфильтрованные
    const pointCount = points.length; // считаем их колличество
    if (pointCount === 0) { // если оно равно 0
      this._renderEmptyMessage(); // то вывести этот метод, а он выводит пустое сообщение
      return;
    }

    this._renderSort(); // или вызываем сортировку, и делаем ее по умолчанию
    this._renderList(); // рендерм список в который добавим точки маршрута
    this._renderEventItems(points); // вызываем рендер всех точек маршрута
  }

  _getPoints() { // это и есть метод для хождения в модели. Также этот метод всегда возвращает актуальную сортировку

    const filterType = this._filterModel.getFilter(); // 66 взяли из одной модели тип фильтра
    const points = this._pointsModel.getPoints(); // 67 // взяли задачи из другой модели
    const filtredPoints = filter[filterType](points); // 68 filtredPoints это уже отфильтрованный массив типа будующее, прошлое, все
    // filter в объекте фильтр по типу фильтра [filterType] получаем функцию фильтрации и передаем ей все точки из модели точек (points)
    // далее ниже в свиче идет их сортировка отфильтрованных фильтром

    // теперь любое получение данных из модели будет учитывать любую выбраную пользователем сортировку
    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPoints.slice().sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))); // 69
      case SortType.PRICE:
        return filtredPoints.slice().sort((a, b) => b.basePrice - a.basePrice); // 70
      case SortType.TIME:
        return filtredPoints.slice().sort((a, b) => {
          const timeDurationFirst = a.dateTo - a.dateFrom; // итерируемся по каждому значению разницы времени
          const timeDurationSecond = b.dateTo - b.dateFrom; // также и для вторго времени
          return timeDurationSecond - timeDurationFirst; // возвращаем отсортированный массив от Max
        });
    }
    return this._pointsModel.getPoints(); // возвращает массив в исходном состоянии если не сработал switch
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  // обработать действие просмотра
  _handleViewAction(actionType, updateType, update) { // 20 на основании того что хочет пользователь обновить модель
    // Здесь обрабатываем, что моедель изменилась и сходя из event(changeData)
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать. Нужен только для сообщения
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить. На это опираемся в _handleModelEvent
    // update - обновленные данные. Это уйдет в модель

    switch (actionType) {
      case UserAction.UPDATE_POINT: // на действие пользователя по обновлению точки

        this._eventPresenter[update.id].setViewState(State.SAVING); // 8mod event прзеентеру по определенному id добавили флаг SAVING
        // делаем связь с сервером
        this._api.updatePoint(update).then((response) => { // сперва обновляем точку на сервере и если там ок
          this._pointsModel.updatePoint(updateType, response); // то обновляем точку локально
        }).catch(() => {
          this._eventPresenter[update.id].setViewState(State.ABORTING);
        });
        break;

      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving(); // 8mod

        this._api.addPoint(update).then((response) => {
          this._pointsModel.addPoint(updateType, response);
        }).catch(() => {
          this._pointNewPresenter.setAborting();
        });
        break;

      case UserAction.DELETE_POINT:
        this._eventPresenter[update.id].setViewState(State.DELETING); // 8mod
        this._api.deletePoint(update).then(() => {
          this._pointsModel.deletePoint(updateType, update);
        }).catch(() => {
          this._eventPresenter[update.id].setViewState(State.ABORTING);
        });
        break;
    }
  }

  // обработать событие модели
  // 19 это колбек в котором модель вызывает его по обсерверу. Передаем его как налюдателя
  // этот метод передается как колбек observera. Он должен обработать что модель изменилась. И понять, что перерисовать берем updateType
  _handleModelEvent(updateType, data) { // В зависимости от типа изменений решаем, что делать
    switch (updateType) { // 33
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)

        this._eventPresenter[data.id].init(data, this._getOffers(), this._getDestinations()); //  реинициализируем маленькую частичку типо галочки
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true}); // resetSortType это сброс выбраной сортировки нужен для input
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false; // лодинг типа станет лож
        remove(this._loadingComponent); // удаляем компонент лодинг
        this._renderBoard(); // рендерим доску
        break;
    }
  }

  // 39 очистить доску
  _clearBoard({resetSortType = false} = {}) {

    this._pointNewPresenter.destroy(); // 6add

    Object // удаляем все типа карточки
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy()); // удаляем все значения
    this._eventPresenter = {}; // перезаписываем объект чтобы убить все ссылки на event презентеры

    // очищаем доску полностью

    remove(this._tripEventsSortComponent); // сортировка
    remove(this._eventListEmptyMessageComponent); // заглушка если нет точек

    // если надо сбросить сортировку то мы просто перезаписываем сортировку по дефолту
    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  // метод если форма открыта, то закрыть, воспитатель
  _handleModeChange() { // 2 наблюдатель
    this._pointNewPresenter.destroy(); // 5add

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => {
        presenter.resetView(); // сбрось вью до начальной предложения (карточки)
      });
  }

  _renderLoading() {
    renderElement(this._pageBodyContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  // метод который выводит пустое сообщение если нет Item
  _renderEmptyMessage() {
    renderElement(this._pageBodyContainer, this._eventListEmptyMessageComponent, RenderPosition.BEFOREEND); // вместо удаленнного
    // контейнера проприсовали сообщение
  }


  // метод который сортирует, удаляет старые item и рендерит новые отсортированные item
  _handleSortTypeChange(sortType) { // 13 получаем сигнал из вьюхи что был клик и теперь надо обработать его
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearBoard(); // хочу чтобы доска очистилась и сбросилось число отображенных задач {resetRenderedPointCount: true}
    this._renderBoard();
  }

  // метод который рендерит сортировку
  _renderSort() {
    if (this._tripEventsSortComponent !== null) {
      this._tripEventsSortComponent = null;
    }
    this._tripEventsSortComponent = new TripEventsSortView(this._currentSortType);

    this._tripEventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._tripBoardContainer, this._tripEventsSortComponent, RenderPosition.BEFOREEND);
  }


  // метод который рендерит список в который отрендарим точки маршрута
  _renderList() {
    renderElement(this._tripBoardContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
  }

  // рендарим одну точку маршрута
  _renderItem(tripItem) {
    const eventPresenter = new EventPresenter(this._tripEventsListComponent.getElement(), this._handleViewAction, this._handleModeChange, this._getOffers(), this._getDestinations()); //  27 this._handleEventChange,
    const offers = this._getOffers();

    const destinations = this._getDestinations();
    // 3 наблюдатель
    this._eventPresenter[tripItem.id] = eventPresenter; // в объект записываем id с сылкой на этот event презентер
    // this._eventPresenter[tripItem.id] это 1608250670855: Event {…}
    eventPresenter.init(tripItem, offers, destinations); // .init(tripItem) презентер с id в котором были изменения перерисовывается
    // this._eventPresenter это весь список id: event который был добавлен при рендере Event
    // init этот с renderItem
  }

  // рендарим все точки маршрута
  _renderEventItems(tripItems) { // 14 метод который получает массив объектов точек
    tripItems.forEach((item) => { // проходим по этому массиву
      this._renderItem(item); // передаем каждый объект в this._renderItem где дальше он все отрисует
    });
  }
}


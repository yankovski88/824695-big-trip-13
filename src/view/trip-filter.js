import AbstractView from "./abstract.js";

const createTripFilter = (filter, currentFilterType) => {
  console.log(filter);
  const {type, name, count} = filter[0]; // 51

  return `<form class="trip-filters" action="#" method="get">
<div class="trip-filters__filter">
   <!--value="everything" -->
   <!--checked-->
   <!--value={type}-->
   <!--52-->
   
   <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${type === currentFilterType ? `checked` : ``} ${count === 0 ? `disabled` : ``}>
  <!--{type === currentFilterType ? checked : } {count === 0 ? disabled : }-->

 <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
   </div>

   <div class="trip-filters__filter">
   <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
   <!--{type === currentFilterType ? checked : } {count === 0 ? disabled : }-->

   <label class="trip-filters__filter-label" for="filter-future">Future</label>
   </div>

   <div class="trip-filters__filter">
   <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"> 
<!--{type === currentFilterType ? checked : } {count === 0 ? disabled : }-->
   <label class="trip-filters__filter-label" for="filter-past">Past</label>
   </div>

   <button class="visually-hidden" type="submit">Accept filter</button>
 </form>`;
};

export default class TripFilterView extends AbstractView {
  constructor(filters, currentFilterType) { // 53

    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }


  getTemplate() {
    return createTripFilter(this._filters, this._currentFilter); // 54
  }

  _filterTypeChangeHandler(evt) { // 55
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) { // 56
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}

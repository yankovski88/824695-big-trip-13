const createTripEventsSort = (dataItems) => {
  const {sortItems} = dataItems;

  const getSortItems = () => {
    return sortItems.reduce((total, element) => {
      return total + `
                  <div class="trip-sort__item  trip-sort__item--${element.toLowerCase()}">
      <input id="sort-${element.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" 
      value="sort-${element.toLowerCase()}" disabled>
    <label class="trip-sort__btn" for="sort-${element.toLowerCase()}">${element}</label>
      </div>        
`;
    }, ``);
  };


  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${getSortItems()}
    
          </form>
`;
};

export {createTripEventsSort};

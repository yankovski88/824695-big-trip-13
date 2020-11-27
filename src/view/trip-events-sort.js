const createTripEventsSort = (dataItems) => {
  const {sortItems} = dataItems;
  const getFirstItemOfSort = () => {
    const arrSorts = [];
    for (let i = 0; i < 1; i++) {
      arrSorts.push(
          `<div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">${sortItems[i]}</label>
      </div>
`
      );
    }
    return arrSorts.join(` `);
  };


  const getSortItems = () => {
    const arrSorts = [];
    for (let i = 1; i < sortItems.length; i++) {
      arrSorts.push(
          `
                  <div class="trip-sort__item  trip-sort__item--${sortItems[i].toLowerCase()}">
      <input id="sort-${sortItems[i].toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItems[i]}" disabled>
    <label class="trip-sort__btn" for="sort-${sortItems[i].toLowerCase()}">${sortItems[i]}</label>
      </div>        
`
      );
    }
    return arrSorts.join(` `);
  };


  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${getFirstItemOfSort()}
     ${getSortItems()}
    
          </form>
`;
};

export {createTripEventsSort};

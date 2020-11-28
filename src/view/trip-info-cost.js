import {totalPrice, totalPriceAddantion} from "../main";
const createTripInfoCost = () => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice + totalPriceAddantion}</span>
    </p>`;
};

export {createTripInfoCost};

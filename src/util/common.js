// - Объявим функцию-генератор создаем объект со всеми рандомными данными
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// функция по обновлению данных
export const updateItem = (items, update) => { // принимет массив и принимает тот элемент который надо обновить
  const index = items.findIndex((item) => item.id === update.id); // находит по id который мы завели

  if (index === -1) { // если элемент не найден, то возваращает массив
    return items;
  }

  return [ // если элемент найден то вырезает часть до обновления и часть после обновления и склеивает
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

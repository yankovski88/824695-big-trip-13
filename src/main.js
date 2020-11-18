// В файле src/main.js опишите функцию для рендеринга (вставки в DOM) компонентов. Спецификация функции проста:
// она принимает контейнер (элемент) и вёрстку, которую требуется отрендерить в этот контейнер.

// container = место куда вставляем разметку;
// content = text разметки;
// position = определяет позицию добавляемого элемента;
const render = (container, content, position) => {
  container.insertAdjacentHTML(position , content);
};

export { render };

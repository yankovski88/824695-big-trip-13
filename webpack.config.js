const path = require('path'); // нужно импортировать т.к. не сработает путь

module.exports = { // экспортируем
  entry: './src/main.js', // из папку src файла main.js
  output: { // в
    filename: 'bundle.js', // в файл boundle.js
    path: path.resolve(__dirname, 'public'), // путь для файла указываем корневой плюс папка public в нее и
    // сохранится файл
  },
  devtool: 'source-map', // это дополнительный файл который будет генерироваться во время сборки, который позволит
  // выполнять откладку в браузере появится полноценный код который пишем в валидаторе
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), // сервер следит за папкой public
    watchContentBase: true // если есть изменения в папке public то приложение в браузере изменится
  }
};

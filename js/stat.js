window.renderStatistics = function (ctx, names, times) {
  // тень
  ctx.fillStyle = shadow.color;
  ctx.fillRect(shadow.horizontalCoord, shadow.verticalCoord, shadow.width, shadow.height);

  //облако
  ctx.fillStyle = cloud.color;
  ctx.fillRect(cloud.horizontalCoord, cloud.verticalCoord, cloud.width, cloud.height);

  //текст
  ctx.font = text.size + ' ' + text.font;
  ctx.fillStyle = text.color;
  ctx.fillText(text.text, text.horizontalCoord, text.verticalCoord);

  // поле для грфаика
  ctx.fillStyle = gist.borderColor;
  ctx.fillRect(gist.horizontalCoord, gist.verticalCoord, gist.width, gist.height + 40);

  //самый большой элемент массива
  var maxResult = Math.max.apply(null, times);
  var timeIndex = 0;

  //график
  for (var i = 0; i < times.length; i++) {
    if (times[i] === maxResult) {
      timeIndex = i;
    }
    var columnHeight = gist.height * (times[i] * 100 / maxResult) / 100;

    // for (var j = 0; j < names.length; j++) {
    //облако
    if (names[i] === 'Вы') {
      ctx.fillStyle = gist.mainColor;
    } else {
      ctx.fillStyle = gist.columnColor();
      //console.log(gist.columnColor());
    }
    ctx.fillRect(cloud.horizontalCoord + 30 + cloud.width / 4 * i, gist.verticalCoord + gist.height - columnHeight, gist.columnWidth, columnHeight);
    //console.log(cloud.horizontalCoord + 30 + cloud.width / 4 * i, gist.verticalCoord + gist.height - columnHeight, gist.columnWidth, columnHeight);

    //имя
    ctx.font = text.size + ' ' + text.font;
    ctx.fillStyle = text.color;
    ctx.fillText(names[i], cloud.horizontalCoord + 30 + cloud.width / 4 * i, gist.height + 100);

    //очки
    ctx.font = text.size + ' ' + text.font;
    ctx.fillStyle = text.color;
    ctx.fillText(Math.round(times[i]), cloud.horizontalCoord + 30 + cloud.width / 4 * i, gist.height + 120);
    // }
  }

  //console.log(times, maxResult, timeIndex);
  //console.log(text.size + ' ' + text.font);
};

var cloud = {
  color: 'rgba(255, 255, 255, 1)',
  width: 420,
  height: 270,
  horizontalCoord: 100,
  verticalCoord: 10
}

var shadow = {
  color: 'rgba(0, 0, 0, 0.7)',
  horizontalCoord: cloud.horizontalCoord + 10,
  verticalCoord: cloud.verticalCoord + 10,
  width: cloud.width,
  height: cloud.height
}

var text = {
  text: 'Ура вы победили!\nСписок результатов:',
  font: '"PT Mono"',
  size: '16px',
  horizontalCoord: 130,
  verticalCoord: 50,
  color: 'rgba(0, 0, 0, 1)'
}

var gist = {
  borderColor: 'rgba(0, 0, 0, 0)',
  horizontalCoord: 110,
  verticalCoord: 80,
  height: 150,
  width: cloud.width - 20,
  columnWidth: 40,
  columnGap: 50,
  mainColor: 'rgba(255, 0, 0, 1)',
  columnColor: function () {
    var randomBlue = Math.floor(Math.random() * 100);
    return 'hsl(250, ' + randomBlue + '%, 50%)';
  }
}
//В новом файле js/stat.js определите функцию renderStatistics, которая будет являться методом объекта window, со следующими параметрами:
//
//ctx — канвас на котором рисуется игра.
//names — массив, с именами игроков прошедших уровень. Имя самого игрока — Вы. Массив имён формируется случайным образом.
//times — массив, по длине совпадающий с массивом names. Массив содержит время прохождения уровня соответствующего игрока из массива names. Время прохождения уровня задано в миллисекундах.
//Эта функция будет вызываться каждый раз когда игрок проходит уровень. Чтобы успешно пройти уровень, надо выстрелить фаерболом (клавиша Shift) в забор.
//
//При вызове этой функции на канвас ctx должны быть выведены следующие элементы:
//
//Белое облако с координатами [100, 10] высотой 270px и шириной 420px. Облако может быть как правильным многоугольником, нарисованным методом fillRect, так и неправильным нарисованным с помощью методов beginPath, moveTo, closePath, fill и других.
//Под облаком должна располагаться тень: многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный), смещённый относительно белого на 10px вниз и вправо.
//На облаке должен быть отрисован текст сообщения ’Ура вы победили!\nСписок результатов:’ с помощью метода fillText. Текст должен быть набран шрифтом PT Mono размером 16px.
//Обратите внимание. Особенностью отрисовки текста на канвасе является то, что он не поддерживает перенос, поэтому каждая новая строчка должна быть отрисована новым вызовом метода fillText или strokeText.
//После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:
//Высота гистограммы 150px.
//Ширина колонки 40px.
//Расстояние между колонками 50px.
//Цвет колонки игрока Вы rgba(255, 0, 0, 1).
//Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.
//Обратите внимание. В rgba последний параметр — это прозрачность, а не насыщенность. Поэтому для задания цвета колонок других игроков нужно использовать hsl.
//Обратите внимание. Функцию отрисовки статистики вызывать не надо. Её будет вызывать непосредственно сама игра из файла js/game.js.
//Обратите внимание. Время прохождения игры должно быть округлено к целому числу.

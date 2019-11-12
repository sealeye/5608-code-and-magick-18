'use strict';

//document.querySelector('.setup').classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];
var WIZARDS_QUANTITY = 4;

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var wizardCoatValue = document.querySelector('input[name="coat-color"]');
var wizardEyesValue = document.querySelector('input[name="eyes-color"]');
var wizardFireballValue = document.querySelector('input[name="fireball-color"]');

var wizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var random = function (array) {
  return array[Math.floor((Math.random() * array.length))];
};

// создание данных волшебников с рандомными данными
var createWizard = function () {
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    var wizard = {
      name: random(names) + ' ' + random(surnames),
      coatColor: random(coatColors),
      eyesColor: random(eyesColors)
    };
    wizards.push(wizard);
  }
  console.log(wizards);
  return wizards;
};
createWizard();

// создание волшебников по шаблону
var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

// вставка волшебников на страницу
var renderWizards = function (wizard) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  wizardsList.appendChild(fragment);
}();

document.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = document.querySelector('.setup-user-name');

// валидация имени
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// изменение параметров персоонажа при клике

wizardCoat.addEventListener('click', function () {
  var wizardCoatColor = random(coatColors);
  wizardCoat.style.fill = wizardCoatColor;
  wizardCoatValue.value = wizardCoatColor;
});


wizardEyes.addEventListener('click', function () {
  var wizardEyesColor = random(eyesColors);
  wizardEyes.style.fill = wizardEyesColor;
  wizardEyesValue.value = wizardEyesColor;
});

wizardFireball.addEventListener('click', function () {
  var wizardFireballColor = random(fireballColors);
  wizardFireball.style.background = wizardFireballColor;
  wizardFireballValue.value = wizardFireballColor;
});

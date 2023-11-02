window.addEventListener('DOMContentLoaded', () => {
  // hamburger

  const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger__active');
    menu.classList.toggle('menu__active');
  });

  menuItem.forEach((item) => {
    item.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger__active');
      menu.classList.toggle('menu__active');
    });
  });

  // timer
  const deadline = '2024-09-17';

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock(); // чтобы предотвратить мегание таймера при перезагрузке/загрузке, вызываем ф-ю тут, чтобы она каждый раз не ждала обновления через 1 сек в setInterval

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  setClock('.timer', deadline);

  // Tabs

  const tab = document.querySelectorAll('.tabheader__item');
  const tabParent = document.querySelector('.tabheader__items');
  const tabContent = document.querySelectorAll('.tabcontent');

  function hideTabsContent() {
    tabContent.forEach((item) => {
      item.style.display = 'none';
    });
    tab.forEach((item) => {
      item.classList.remove('tabheader__item-active');
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = 'flex';
    tab[i].classList.add('tabheader__item-active');
  }

  hideTabsContent();
  showTabContent();

  tabParent.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
      tab.forEach((item, i) => {
        if (e.target === item) {
          hideTabsContent();
          showTabContent(i);
        }
      });
    }
  });
});

// calculator

const result = document.querySelector('.calculating__result span');

let sex = 'female',
  height,
  weight,
  age,
  ratio = 1.375;

function calcTotal() {
  if (!sex || !height || !weight || !age || !ratio) {
    result.textContent = '0';
    return;
  }
  if (sex === 'female') {
    result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
  } else {
    result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
  }
}

calcTotal();

function getStaticInformation(parentSelector, activeClass) {
  const elements = document.querySelectorAll(`${parentSelector} div`);

  elements.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
      } else {
        sex = e.target.getAttribute('id');
      }

      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });

      e.target.classList.add(activeClass);

      calcTotal();
    });
  });
}

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {
    switch (input.getAttribute('id')) {
      case 'height':
        height = +input.value;
        break;
      case 'weight':
        weight = +input.value;
        break;
      case 'age':
        age = +input.value;
        break;
    }

    calcTotal();
  });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

// accordeon

const acc = document.querySelectorAll('.accordion__control');

acc.forEach((item, i) => {
  acc[i].addEventListener('click', () => {
    item.classList.toggle('active');
    const panel = item.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
});

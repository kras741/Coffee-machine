"use strict"
let balance = document.querySelector(".balance");

let state = "waiting"; // cooing, ready

function cookCoffee(name, price, elem) {
  if (state != "waiting") {
    return;
  }
  
  let buttonCup = elem.querySelector("img");
  let cupSrc = buttonCup.src;
  if (balance.value >= price) {
    balance.value -= price;
    balance.style.backgroundColor = "";
    changeDisplayText("Ваш кофе " + name + " готовится...");
    cup.changeCupImage(cupSrc);
    state = "cooking";
    startCooking();
  } else {
    changeDisplayText("Недостаточно средств.");
    balance.style.backgroundColor = "rgb(255, 50, 50)";
  }
}

function startCooking() {
  cup.showCup();
  changeProgress(100, 5);//5 - параметр, определяющий сколько секунд будет готовиться кофе
  setTimeout(function() {
    state = "ready";
    changeDisplayText("Ваш кофе готов!");
    cup.toggleActive();
    cup.elem.onclick = function() {
      takeCoffee();
    }
  }, 5000);
}

function takeCoffee() {
  if (state != "ready") {
    return;
  }
  state = "waiting";
  changeProgress(0);
  cup.hideCup();
  changeDisplayText("Выберите кофе!");
  cup.toggleActive();
}

let cup = {
  elem: document.querySelector(".cup"),
  
  changeCupImage(src){
    let cupImage = cup.elem.querySelector("img");
    cupImage.src = src;
  },
  showCup() {
    cup.elem.style.display = "block";
    cup.elem.style.transition = "opacity 5s";
    setTimeout(function() {
    cup.elem.style.opacity = "1";  
    }, 10);
  },
  hideCup() {
    cup.elem.style.display = "none";
    cup.elem.style.opacity = "0";  
  },
  toggleActive() {
    cup.elem.classList.toggle("pointer");
  }
}

function changeProgress(percent, sec=0) { //Устанавливает начальное значение необязательного параметра "sec"
  let progress = document.querySelector(".progress-bar");
  progress.style.width = percent + "%";
  progress.style.transition = `width ${sec}s`;
}

function changeDisplayText(text) {
  let displayText = document.querySelector(".display-text");
  if (text.length > 25) {
    displayText.innerHTML = text.slice(0, 25) + "...";
  } else {
    displayText.innerHTML = text;
  }
}
//  By Friday Main Goals
// -Input field - type in confirm √
// -find coin and display current price √
// -add coins to a list √
// -arrow button that increases or decreases coin amount

//Maybes

//may need to save info into an array?
// -delete a coin button -√
//-compare two coins
//-display a graph?

// Stretch:
// -Difference in delta over a Week

//**************************************************** */
//adds event listener, sends ticker to fetch request.
coinInput();

function coinInput() {
  renderDropdown();
  const form = document.querySelector("#formInput");
  //sandbox is weird and made me put this if to clear an error
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const coinValue = event.target.tickerInput.value;
      getAPI(coinValue);
      getWeeklyValue(coinValue);
    });
  }
}

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
function getAPI(coinValue) {
  const request = require('request');
  const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${coinValue}&to_currency=USD&apikey=B3BGRQPX1AOZLTLP`;

  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" }
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        console.log(data);
        renderCoinObj(data);
      }
    }
  );
}
//show the coin chosen
const coinDiv = document.createElement("div");
function renderCoinObj(coin) {
  const p = document.createElement("p");
  const parentCoinDiv = document.querySelector("#coins");
  const removeBtn = document.createElement("button");
  const increaseBtn = document.createElement("button");

  let currentUsd = [];
  currentUsd.push(
    parseInt(coin["Realtime Currency Exchange Rate"]["5. Exchange Rate"], 10)
  );
  // let counter = 1;

  const ticker =
    coin["Realtime Currency Exchange Rate"]["1. From_Currency Code"];
  // console.log(counter);

  increaseBtn.innerText = "^";
  increaseBtn.style.fontSize = "16px";

  removeBtn.innerText = "X";
  removeBtn.style.fontSize = "10px";

  //Need this to update the original amount somehow
  increaseBtn.addEventListener("click", (event) => {
    for (let element of currentUsd) {
      element += currentUsd[currentUsd.length - 1];
      currentUsd.push(element);
      console.log("this is last value:", currentUsd[currentUsd.length - 1]);
      console.log("this is array:", currentUsd);
      p.textContent = ticker + "  $" + currentUsd[currentUsd.length - 1];
      return;
    }
  });

  p.textContent = ticker + "  $" + currentUsd[currentUsd.length - 1];
  coinDiv.append(increaseBtn, p, removeBtn);
  parentCoinDiv.append(coinDiv);

  //remove the coin
  removeBtn.addEventListener("click", (event) => {
    event.target.parentNode.remove();
  });
}

function getWeeklyValue(coinValue) {
  var request = require("request");
  var url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${coinValue}&market=USD&apikey=B3BGRQPX1AOZLTLP`;
  //https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=CNY&apikey=demo
  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" }
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        // renderWeeklyObj(data);
        console.log(data);
        renderWeeklyObj(data);
      }
    }
  );
}
//let array empty do something with it
function renderWeeklyObj(coinWeekly) {
  const span = document.createElement("span");
  const divP = coinDiv.querySelector("p");

  let currentWeeklyUsd = [];
  currentWeeklyUsd.push(
    parseInt(
      coinWeekly["Time Series (Digital Currency Weekly)"]["2021-12-07"]["4a. close (USD)"],10));

  const weekKey = Object.keys(coinWeekly["Time Series (Digital Currency Weekly)"]); 


  span.textContent = parseInt(currentWeeklyUsd, 10);
  divP.append(`   Week of ${weekKey[0]}:$`, span);
  console.log("This is weekKey:",weekKey[0]);
}
function renderDropdown(weeklyObj) {
  const weeksDrop = document.querySelectorAll(".weeks");  
  for (let i = 1; i < (weeksDrop.length + 1); i++) {
    weeksDrop[i-1].innerText = `Week ${i}`;
  }
}

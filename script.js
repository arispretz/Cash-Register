function checkCashRegister(price, cash, cid) {
  let moneyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  };

  let totalCid = 0;
  for (let denomination of cid) {
    totalCid += denomination[1];
  }
  totalCid = totalCid.toFixed(2);

  let changeDue = cash - price;
  let change = [];

  if (changeDue > totalCid) {
    return {status: "INSUFFICIENT_FUNDS", change: change};
  } else if (changeDue.toFixed(2) === totalCid) {
    return {status: "CLOSED", change: cid};
  } else {
    cid = cid.reverse();
    for (let currency of cid) {
      let littleBox = [currency[0], 0];
      while (changeDue >= moneyUnits[currency[0]] && currency[1] > 0) {
        littleBox[1] += moneyUnits[currency[0]];
        currency[1] -= moneyUnits[currency[0]];
        changeDue -= moneyUnits[currency[0]];
        changeDue = changeDue.toFixed(2);
      }
      if (littleBox[1] > 0) {
        change.push(littleBox);
      }
    }
  }

  if (changeDue > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else {
    return {status: "OPEN", change: change};
  }
}

let button = document.querySelector("#calculate");
let priceInput = document.querySelector("#price");
let cashInput = document.querySelector("#cash");
let cidInput = document.querySelector("#cid");
let resultDiv = document.querySelector("#result");
let clearButton = document.querySelector("#clear");

button.addEventListener('click', function(e) {
  e.preventDefault();
  let price = parseFloat(priceInput.value.trim());
  let cash = parseFloat(cashInput.value.trim());
  let cid = JSON.parse(cidInput.value.trim());
  let result = checkCashRegister(price, cash, cid);
  resultDiv.textContent = JSON.stringify(result, null, 2);
});

clearButton.addEventListener('click', function(e) {
  e.preventDefault(); 
  priceInput.value = ""; 
  cashInput.value = ""; 
  cidInput.value = ""; 
  resultDiv.textContent = ""; 
});

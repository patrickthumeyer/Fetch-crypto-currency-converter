// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
import "regenerator-runtime/runtime";
import "bootstrap/dist/css/bootstrap.css";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/
const baseURL = "https://api.cryptonator.com/api/ticker/";

const selectedFiat = document.querySelector(".currency");
const selectedCrypto = document.querySelector(".crypto-currency");
const moneyInputElement = document.querySelector(".money-input");

document.querySelector("button").addEventListener("click", e => {
  e.preventDefault();
  const finalURL = `${baseURL}${selectedCrypto.value}-${selectedFiat.value}`;
  fetch(finalURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .then(data => {
      let cryptoObject = data;
      let base = (selectedFiat.value = cryptoObject.ticker.base);
      let crypto = (selectedFiat.value = cryptoObject.ticker.target);
      let calculatedValue = moneyInputElement.value * cryptoObject.ticker.price;

      console.log(base);
      console.log(moneyInputElement.value);
      console.log(crypto);
      console.log(calculatedValue);

      let output = document.querySelector(".output");
      output.value = Number(calculatedValue).toFixed(2);
    })
    .catch(e => {
      console.log(e);
    });
});

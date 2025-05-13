const input = document.getElementById("input");
const result = document.getElementById("result");
const currencySelector = document.getElementById("currency");
const symbolSpan = document.getElementById("symbol");

result.textContent = "0"; // 初期値を0に設定

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  KRW: "₩",
  CNY: "¥",
};

async function fetchRateAndConvert() {
  const currency = parseFloat(input.value);
  const selectedCurrency = currencySelector.value;

  // 通貨記号をinputの左に表示
  symbolSpan.textContent = symbols[selectedCurrency] || "";

  if (isNaN(currency)) {
    result.textContent = "0";
    return;
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${currency}&from=${selectedCurrency}&to=JPY`
    );
    const data = await response.json();
    const converted = data.rates.JPY;

    result.textContent = converted.toFixed(2);
  } catch (error) {
    result.textContent = "取得失敗";
    console.error("為替取得エラー:", error);
  }
}

input.addEventListener("input", fetchRateAndConvert);
currencySelector.addEventListener("change", fetchRateAndConvert);
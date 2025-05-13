const input = document.getElementById("input");
const result = document.getElementById("result");
const currencySelector = document.getElementById("currency");
const symbolSpan = document.getElementById("symbol");

result.textContent = 0; // 初期値を0に設定

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
  const currency = parseFloat(input.value); // 入力されたcurrencyの値を取得
  const selectedCurrency = currencySelector.value; // 選択された通貨を取得
  const baseCurrency = selectedCurrency; // 入力された通貨を基準通貨に設定

  if (isNaN(currency)) {
    symbolSpan.textContent = "";
    return;
  }

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${currency}&from=${baseCurrency}&to=JPY`); // 入力された通貨をJPYに変換
    const data = await response.json(); // レスポンスをJSON形式で取得
    const converted = data.rates.JPY; // 取得したJPYレートを使用

    symbolSpan.textContent = symbols["JPY"] || ""; // JPYの通貨シンボルを取得
    result.textContent = (currency * converted).toFixed(2); // 入力された通貨を日本円に換算し、小数点以下2桁にフォーマット
  } catch (error) {
    result.textContent = "取得失敗";
    symbolSpan.textContent = "";
    console.error(error);
  }
}

input.addEventListener("input", fetchRateAndConvert); // 入力が変更されたときに関数を呼び出す
currencySelector.addEventListener("change", fetchRateAndConvert); // 通貨が変更されたときに関数を呼び出す
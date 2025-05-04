const input = document.getElementById("input");
const result = document.getElementById("result");
const currencySelector = document.getElementById("currency");
const symbolSpan = document.getElementById("symbol");

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  KRW: "₩",
  CNY: "¥",
};

const API_KEY = "API_KEY"; // ここにAPIキーを入れてください

async function fetchRateAndConvert() {
  const currency = parseFloat(input.value); // 入力されたcurrencyの値を取得
  console.log(currency); // レスポンスをコンソールに表示
  const targetCurrency = currencySelector.value; // 選択された通貨を取得

  if (isNaN(currency)) {
    symbolSpan.textContent = "";
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${targetCurrency}`); // APIから最新のレートを取得
    const data = await response.json(); // レスポンスをJSON形式で取得
    const rate = data.conversion_rates["JPY"]; // 取得したレートを使用
    const converted = currency * rate; // currencyから選択した通貨に変換

    symbolSpan.textContent = symbols[targetCurrency] || ""; // 通貨シンボルを取得
    result.textContent = converted.toFixed(2); // 小数点以下2桁にフォーマット
  } catch (error) {
    result.textContent = "取得失敗";
    symbolSpan.textContent = "";
    console.error(error);
  }
}

input.addEventListener("input", fetchRateAndConvert); // 入力が変更されたときに関数を呼び出す
currencySelector.addEventListener("change", fetchRateAndConvert); // 通貨が変更されたときに関数を呼び出す
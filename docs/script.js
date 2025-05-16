const input = document.getElementById("input"); // input要素を取得
const result = document.getElementById("result"); // 結果を表示する要素を取得
const currencySelector = document.getElementById("currency"); // 通貨セレクタを取得
const symbolSpan = document.getElementById("symbol"); // 通貨記号を表示する要素を取得

result.textContent = "￥0"; // 初期値を0に設定

const symbols = { // 通貨記号のマッピング
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  KRW: "₩",
  CNY: "¥",
  JPY: "¥",
};

async function fetchRateAndConvert() { // 為替レートを取得して変換する関数

  const currency = parseFloat(input.value); // 入力値を数値に変換
  const selectedCurrency = currencySelector.value; // 選択された通貨を取得

  // 通貨記号をinputの左に表示
  symbolSpan.textContent = symbols[selectedCurrency] || ""; // 通貨記号を表示

  if (isNaN(currency)) { // 入力値が数値でない場合
    result.textContent = `${symbols.JPY}0`;; // NaNの場合は0を表示
    return;
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${currency}&from=${selectedCurrency}&to=JPY` 
    ); 
    const data = await response.json(); // レスポンスをJSON形式に変換
    const converted = data.rates.JPY; // JPYに変換された値を取得

    result.textContent = converted.toFixed(2); // 小数点以下2桁にフォーマット
    result.textContent = `${symbols.JPY}${converted.toFixed(2)}`; // JPYの通貨記号を表示
  } catch (error) {
    result.textContent = "Fetching Error"; // ローディング中のメッセージを表示
    console.error("為替取得エラー:", error); // エラーログを表示
  }
}

input.addEventListener("input", fetchRateAndConvert); // 入力値が変更されたときにfetchRateAndConvertを呼び出す
currencySelector.addEventListener("change", fetchRateAndConvert); // 通貨セレクタが変更されたときにfetchRateAndConvertを呼び出す
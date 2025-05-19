const input = document.getElementById("input"); // input要素を取得
const result = document.getElementById("result"); // 結果を表示する要素を取得
const currencySelector = document.getElementById("currency"); // 通貨セレクタを取得
const symbolSpan = document.getElementById("symbol"); // 通貨記号を表示する要素を取得
const rate = document.getElementById("rate"); // 為替レートを表示する要素を取得

result.textContent = "￥0"; // 初期値を0に設定

const symbols = {
  // 通貨記号のマッピング
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  KRW: "₩",
  CNY: "¥",
  JPY: "¥",
};

async function fetchRate(inputValue, selectedCurrency) {
  // 為替レートを取得する関数
  console.log(selectedCurrency);
  try {
    if (inputValue && selectedCurrency) {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${inputValue}&from=${selectedCurrency}&to=JPY`
      );
      return response; // レスポンスを返す
    } else {
      rate.textContent = ""; // 通貨が選択されていない場合のエラー
      return null; // ここで処理を終了
    }
  } catch (error) {
    rate.textContent = "Fetching Error"; // ローディング中のメッセージを表示
    console.error("為替取得エラー:", error); // エラーログを表示
    return null;
  }
}

async function fetchRateAndConvert() {
  // 為替レートを取得して変換する関数

  result.style.color = "#007acc"; // エラーメッセージを赤色にする

  const currency = parseFloat(input.value); // 入力値を数値に変換
  const selectedCurrency = currencySelector.value; // 選択された通貨を取得

  // 通貨記号をinputの左に表示
  symbolSpan.textContent = symbols[selectedCurrency] || ""; // 通貨記号を表示

  try {
    const response = await fetchRate(1, selectedCurrency); // 為替レートを取得
    const data = await response.json(); // レスポンスをJSON形式に変換
    const converted = data.rates.JPY; // JPYに変換された値を取得
    rate.textContent = `1 ${selectedCurrency} = ${converted} JPY`; // レートを表示
  } catch (error) {
     if (!selectedCurrency) {
      rate.textContent = ""; // 通貨が選択されていない場合のエラー
    } else {
      rate.textContent = "Fetching Error"; // ローディング中のメッセージを表示
    }
    console.error("為替取得エラー:", error); // エラーログを表示
  }

  if (isNaN(currency) || currency <= 0) {
    // 入力値が数値でない場合
    result.textContent = `${symbols.JPY}0`; // NaNの場合は0を表示
    return;
  }

  try {
    const response = await fetchRate(currency, selectedCurrency); // 為替レートを取得
    const data = await response.json(); // レスポンスをJSON形式に変換
    const converted = data.rates.JPY; // JPYに変換された値を取得

    result.textContent = `${symbols.JPY}${converted.toFixed(2)}`; // JPYの通貨記号を表示
  } catch (error) {
    if (!selectedCurrency) {
      result.textContent = "通貨を選択してください。"; // 通貨が選択されていない場合のエラー
      result.style.color = "#ff0000cc"; // エラーメッセージを赤色にする
    } else {
      result.textContent = "Fetching Error"; // ローディング中のメッセージを表示
    }
    console.error("為替取得エラー:", error); // エラーログを表示
  }
}

input.addEventListener("input", fetchRateAndConvert); // 入力値が変更されたときにfetchRateAndConvertを呼び出す
currencySelector.addEventListener("change", fetchRateAndConvert); // 通貨セレクタが変更されたときにfetchRateAndConvertを呼び出す

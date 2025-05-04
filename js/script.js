var result = []; //空の配列を定義
var rate = 142.80; //レートを定義
document.getElementById("input").oninput = function() { //キーボードのキーが押されたときに実行
    var input = document.getElementById("input").value; //HTMLの要素を取得
    var value = input; //入力された値を取得
    var yenValue = function(value) { //mapメソッドを使用して配列の各要素に関数を適用
      return value * rate; //それぞれの値を2倍にする
    };
    var resultValue = 0; //変数を定義
    var resultValue = yenValue(value); //関数を使用して値を2倍にする
    var res = document.getElementById("result"); //HTMLの要素を取得
    res.innerHTML = Number.parseFloat(resultValue).toFixed(2); //小数点以下を切り捨てる
};
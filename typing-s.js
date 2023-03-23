const typedField = document.getElementById('typed');//typeFieldにHTMLのtypedタグの内容を代入
const untypedField = document.getElementById('untyped');//typeFieldにHTMLのtypedタグの内容を代入
const anyField = document.getElementById('any');//anyFieldにHTMLのanyタグの内容を代入
const misstypeField = document.getElementById('miss');

const strs = [
    'Prius',
    'Corolla',
    'Supra',
    'Century',
    'LandCruiser',
    'Crown',
    'Harrier',
    'Alphard',
    'Vellfire',
    'Sienta',
    'Aqua',
    'Coaster',
    'Jpntaxi',
];

let typed = '';
let untyped = 'Start'; //一番初めの文字登録
let typedStart = '';
let startButton;    // startボタン
let stopButton;    // stopボタン
let startTime;          // 開始時間
let showTime;       // 表示時間
let timer;              // setinterval, clearTimeoutで使用
let misstyped = 0;      //misstypeを数える為。必ず=0として数値を宣言
let elapsedTime = 0;    // 経過時間
let holdTime = 0;       // 一時停止用に時間を保持
let count = 0;          //単語のカウントに使用

//randomIntでMath.randomの0～MAXで数値でランダムに数字を返す
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//次の単語を呼び出す時に、配列の長さを取得して、ランダムでアクセス
function NextStrings() {
    const idx = randomInt(strs.length);
    return strs[idx];
}

//テキストがtypedかuntypedで赤文字、黒文字に変える。また、何単語目か数える。
function updateTextField() {
    typedField.textContent = typed;
    untypedField.textContent = untyped;
    anyField.textContent = count + '/' + '5単語';
}

//next()をすると、次の単語が現れる 
function next() {
    typed = '';
    untyped = NextStrings();
    updateTextField();
}

function start() {
    // 開始時間を現在の時刻に設定
    startTime = Date.now();
    // 時間計測
    measureTime();
}

function stop() {

    clearInterval(timer);

}

window.onload = function () {
    startButton = document.getElementById("start");
    showTime = document.getElementById("time");
}

function measureTime() {
    // タイマーを設定
    timer = setTimeout(function () {
        // 経過時間を設定し、画面へ表示
        elapsedTime = Date.now() - startTime;

        showTime.textContent = new Date(elapsedTime).toISOString().slice(14, 23);

        // 関数を呼び出し、時間計測を継続する
        measureTime();
    }, 10);
}



document.addEventListener('keydown', (e) => {
    if (e.key !== untyped.substring(0, 1)) {
        if (event.shiftKey) {
            return;
        }
        misstyped++;
        //console.log(misstyped);
        misstypeField.textContent = misstyped;
        return;
    } //もし打ったkeyがuntypedの先頭文字じゃなかったらreturnで返す（undefined）

    typed += untyped.substring(0, 1); //untypedの文字列から0~1番目の文字をtypedに代入する
    untyped = untyped.substring(1); //untypedの文字列の残りをuntypedに代入
    typedStart = typed;

    console.log(typed);
    console.log(untyped);

    typedField.textContent = typed; //styleを含む文字列内容をすべて取得→.textContent→タイプすると色が変わる
    untypedField.textContent = untyped; //タイプするとuntypedの色が変わっていく。
    //typedStartに入った文字列がStartだったらGame開始
    if (typedStart === 'Start') {
        start();
    }

    updateTextField();

    //untypedが空白になった（全部単語を打ち終わったら）
    //countに1ずつ足していき、もし5以上になったら終了を出現させる。
    //そうでなければnext()を呼び出す。

    if (untyped === '') {
        count++;
        console.log(count);

        if (count > 5) {
            stop();
            typedField.textContent = '終了!!';
        }

        else {
            next();
        }

    }
}

);

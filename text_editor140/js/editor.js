
function submit(){
    console.log(INPUT_OBJECT.value);
    let input_text = INPUT_OBJECT.value;
    if(input_text.length > 140){return}

    let old_text = DISPLAY_TEXT_OBJECT.value;
    let connect = ""
    if(old_text != ""){connect = "\n"}
    let new_text = old_text + connect + input_text

    DISPLAY_TEXT_OBJECT.value = new_text;
    INPUT_OBJECT.value = "";
    COUNT_OBJECT.innerHTML = 0;
}


function checkInput(event){
    let len = INPUT_OBJECT.value.length;
    COUNT_OBJECT.innerHTML = len;
    if(len <= 140){COUNT_OBJECT.className = "count_nomal"}
    if(len > 140){COUNT_OBJECT.className = "count_over"}
}

function clearAll(){
    console.log("clear")
    if(!window.confirm("入力内容を消去します")){return}
    DISPLAY_TEXT_OBJECT.value = ""
}

function copyText(){
    console.log("copy")
    let text = DISPLAY_TEXT_OBJECT.value;
    if(!navigator.clipboard){alert("このブラウザでは、このボタンからはコピーできません。文字列を選択して、直接コピーしてください。")}
    navigator.clipboard.writeText(text).then(
        ()=>{alert("クリップボードにコピーしました")},
        ()=>{alert("コピーに失敗しました。文字列を選択して、直接コピーしてください。")}
        );
}

let DISPLAY_TEXT_OBJECT = document.getElementById("display_text");
let INPUT_OBJECT = document.getElementById("input_text");
let SUBMIT_BUTTON = document.getElementById("submit");
let COUNT_OBJECT = document.getElementById("count");

INPUT_OBJECT.addEventListener("input", checkInput)

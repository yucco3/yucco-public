function submit(){
    console.log(INPUT_OBJECT.value);
    let input_text = INPUT_OBJECT.value;
    if(input_text.length > 140){return}

    let old_text = DISPLAY_TEXT_OBJECT.value;
    let connect = ""
    if(old_text != ""){connect = "\n"}
    let new_text = old_text + connect + input_text

    SUBMIT_COUNT = SUBMIT_COUNT + 1;
    let total_count = new_text.length;

    DISPLAY_TEXT_OBJECT.value = new_text;
    INPUT_OBJECT.value = "";
    COUNT_OBJECT.innerHTML = 0;
    SUBMIT_COUNT_OBJECT.innerHTML = SUBMIT_COUNT;
    TOTAL_COUNT_OBJECT.innerHTML = total_count;
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
    BACKUP = DISPLAY_TEXT_OBJECT.value;

    DISPLAY_TEXT_OBJECT.value = "";
    SUBMIT_COUNT = 0;
    SUBMIT_COUNT_OBJECT.innerHTML = SUBMIT_COUNT;
    TOTAL_COUNT_OBJECT.innerHTML = 0;
}

function copyText(){
    console.log("copy")
    let text = DISPLAY_TEXT_OBJECT.value;
    if(!navigator.clipboard){alert("このブラウザでは、このボタンからはコピーできません。文字列を選択して、直接コピーしてください。")}
    navigator.clipboard.writeText(text).then(
        displayCopyAlert,
        ()=>{alert("コピーに失敗しました。文字列を選択して、直接コピーしてください。")}
        );
}

function displayCopyAlert(){
    document.getElementById("copy_message").innerHTML = "クリップボードにコピーしました";
    setTimeout(() => {
        document.getElementById("copy_message").innerHTML = "";
    }, 3000);
}

function restore(){
    alert("ふっかつのじゅもん！");
    document.getElementById("restore").innerHTML = BACKUP.replace("\n","<br />");
}

let DISPLAY_TEXT_OBJECT = document.getElementById("display_text");
let INPUT_OBJECT = document.getElementById("input_text");
let SUBMIT_BUTTON = document.getElementById("submit");
let COUNT_OBJECT = document.getElementById("count");
let SUBMIT_COUNT_OBJECT = document.getElementById("submit_count");
let TOTAL_COUNT_OBJECT = document.getElementById("total_count");

let SUBMIT_COUNT = 0;
let BACKUP = "";

INPUT_OBJECT.addEventListener("input", checkInput)

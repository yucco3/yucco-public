
function submit(){
    console.log(INPUT_OBJECT.value);
    let input_text = INPUT_OBJECT.value;
    if(input_text.length > 140){return}
    let old_text = DISPLAY_TEXT_OBJECT.value;
    let new_text = old_text + "\n" + input_text;
    DISPLAY_TEXT_OBJECT.value = new_text;
    INPUT_OBJECT.value = "";
}

function check_input(event){
    let len = INPUT_OBJECT.value.length;
    COUNT_OBJECT.innerHTML = len;
    if(len <= 140){COUNT_OBJECT.className = "count_nomal"}
    if(len > 140){COUNT_OBJECT.className = "count_over"}
}


let DISPLAY_TEXT_OBJECT = document.getElementById("display_text");
let INPUT_OBJECT = document.getElementById("input_text");
let SUBMIT_BUTTON = document.getElementById("submit");
let COUNT_OBJECT = document.getElementById("count");

INPUT_OBJECT.addEventListener("input", check_input)

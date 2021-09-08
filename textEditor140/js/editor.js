
function submit(){
    console.log(INPUT_OBJECT.value);
    let input_text = INPUT_OBJECT.value;
    let old_text = DISPLAY_TEXT_OBJECT.value;
    let new_text = old_text + "\n" + input_text;
    DISPLAY_TEXT_OBJECT.value = new_text;
    INPUT_OBJECT.value = "";
}


let DISPLAY_TEXT_OBJECT = document.getElementById("display_text");
let INPUT_OBJECT = document.getElementById("input_text");
let SUBMIT_BUTTON = document.getElementById("submit");


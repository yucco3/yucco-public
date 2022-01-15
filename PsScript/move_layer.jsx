function move_test(){
    var document = app.activeDocument
    var count = document.layers.length

    var key = document.layers[0]
    var target = document.layers[count - 2]
    $.writeln(key.name)
    $.writeln(target.name)
    target.move(key, ElementPlacement.INSIDE)
}

move_test()
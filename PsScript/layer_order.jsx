function reverse_layersets_order(document){
    for(var index = 0; index < document.layerSets.length; index++){
        if(!document.layerSets[index]){continue}
        if(document.layerSets[index].typename != "LayerSet"){continue}

        var key_layer = document.layerSets[0]
        var target_layer = document.layerSets[index]

        if(key_layer.name === target_layer.name){$.writeln("既に最前面のレイヤーです");continue}

        target_layer.move(key_layer, ElementPlacement.PLACEBEFORE)
    }

}

function reverse_layer_order(document){
    for(var index = 0; index < document.layers.length; index++){

        $.writeln(document.layers[index].name)
        var key_layer = document.layers[0]
        var target_layer = document.layers[index]

        if(key_layer.name === target_layer.name){$.writeln("既に最前面のレイヤーです");continue}
        if(target_layer.typename == "ArtLayer" && target_layer.isBackgroundLayer == true){continue}
        target_layer.move(key_layer, ElementPlacement.PLACEBEFORE)
    }
}


function test_revers_layer_order(){
    var document = app.activeDocument
    reverse_layer_order(document)
}

test_revers_layer_order()
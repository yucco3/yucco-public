app.preferences.setBooleanPreference("ShowExternalJSXWarning", false);

function SETTING(){
    this.ARTBORD_SPACING = 100
}
const setting = new SETTING() 

// DOMAIN　////////////////////////////////////////////////////////////////

function Size_A6(){
    this.width = new mm(105);
    this.height = new mm(148);
}

function Size_A5(){
    this.width = new mm(148);
    this.height = new mm(210);
}

function mm(number_mm){
    // 表面的に扱う数値は全部ｍｍだけど各メソッドに渡す時の数値は全部px扱いなので変換用のクラス
    if(Number(number_mm) == NaN){raise("mmクラスのインスタンス生成時に数値以外の値が渡されました")}
    this.number = Number(number_mm);
    this.pt = to_px(this.number)
    this.to_px = function(){return to_px(this.number)}
    this.calc_midpoint_px = function(){return to_px(this.number / 2)}

    function to_px(mm){
        return mm * 2.83465;
    }
}

function Rect(rect){
    // [x1,y1,x2,y2]の配列を受け取って操作しやすくする
    if(rect.length != 4){throw Error("Rectを生成するのには要素数4の配列が必要です")}
    this.x1_px = rect[0];
    this.y1_px = rect[1];
    this.x2_px = rect[2];
    this.y2_px = rect[3];
    this.get_x1_px = function(){return this.x1_px}
    this.get_y1_px = function(){return this.y1_px}
    this.get_x2_px = function(){return this.x2_px}
    this.get_y2_px = function(){return this.y2_px}

    this.w_px = this.x2_px - this.x1_px;
    this.h_px = this.y1_px - this.y2_px;
    this.get_width_px = function(){return this.w_px}
    this.get_height_px = function(){return this.h_px}
}

function BookSize(width_mm, height_mm, se_width_mm){
    this.width = width_mm;
    this.height = height_mm;
    this.se_width = se_width_mm;
    this.sode_width = new mm(70);

    this.frontpage_artboard_width_px = (this.width.to_px() * 2) + this.se_width.to_px();
    this.frontpage_artboard_heigth_px = this.height.to_px();
    this.cover_artboard_width_px = (this.width.to_px() * 2) + this.se_width.to_px() + (this.sode_width.to_px() * 2)

    this.vartical_guide_coodinates = __calc_vartical_guide_coodinates(this.width, this.sode_width, this.se_width)
    this.horizontal_guide_coodinates = __calc_horizontal_guide_coodinates(this.height)

    function __calc_vartical_guide_coodinates(width, sode_width, se_width){
        var mm_3 = new mm(3);

        var x1 = 0;                 // 表紙仕上がりサイズ左端
        var x2 = mm_3.to_px();      // 表紙印刷安全範囲左端
        var x3 = width.to_px() / 2  // 表紙中心
        var x4 = width.to_px();     // 表紙仕上がりサイズ右端＝背幅の左端
        var x5 = width.to_px() + (se_width.to_px() / 2)     // 背中心
        var x6 = width.to_px() + se_width.to_px()           // 背幅の右端＝裏表紙仕上がりサイズ左端
        var x7 = width.to_px() + se_width.to_px() + (width.to_px() / 2)             // 裏表紙中心
        var x8 = width.to_px() + se_width.to_px() + width.to_px() - mm_3.to_px()    // 裏表紙印刷安全範囲右端
        var x9 = width.to_px() + se_width.to_px() + width.to_px()                   // 裏表紙仕上がりサイズ右端

        var x10 = 0 - sode_width.to_px() + mm_3.to_px() // 袖印刷安全範囲左端
        var x11 = width.to_px() + se_width.to_px() + width.to_px() + sode_width.to_px() - mm_3.to_px(); // 袖印刷安全範囲右端

        return [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11]
    }

    function __calc_horizontal_guide_coodinates(height){
        var mm_3 = new mm(3)
        var y1 = height.to_px() - mm_3.to_px() // 表紙印刷安全範囲天
        var y2 = mm_3.to_px() // 表紙印刷安全範囲地
        var y3 = (setting.ARTBORD_SPACING * -1) - mm_3.to_px() // カバー印刷安全範囲天
        var y4 = (setting.ARTBORD_SPACING * -1) - height.to_px() + mm_3.to_px() // カバー印刷安全範囲地
        return [y1, y2, y3, y4]
    }
}


// SERVICE //////////////////////////////////////////////////////////////

function create_new_document(w_px,h_px,num_art_bords){
    var preset = new DocumentPreset;
    preset.artboardLayout = DocumentArtboardLayout.Column
    preset.artboardSpacing = setting.ARTBORD_SPACING
    preset.numArtboards = num_art_bords
    preset.width = w_px
    preset.height = h_px
    preset.colorMode = DocumentColorSpace.CMYK
    preset.rasterResolution = DocumentRasterResolution.HighResolution
    preset.units = RulerUnits.Millimeters

    app.documents.addDocument("",preset);
}

function resize_artboard(target_bord, w_px, h_px){
    var now_target_rect = new Rect(target_bord.artboardRect);

    var w_increment = w_px - now_target_rect.get_width_px();
    var h_increment = h_px - now_target_rect.get_height_px();

    var new_x1 = now_target_rect.get_x1_px() - (w_increment / 2);
    var new_y1 = now_target_rect.get_y1_px() + (h_increment / 2);
    var new_x2 = now_target_rect.get_x2_px() + (w_increment / 2);
    var new_y2 = now_target_rect.get_y2_px() - (h_increment / 2) ;
    var new_rect = [new_x1, new_y1, new_x2, new_y2];

    target_bord.artboardRect = new_rect;
}

function create_vertical_guide(x_px){
    var document_height = app.activeDocument.height;
    var document_height_mm = new mm(document_height);

    add_straight_guide([x_px,0 - document_height_mm.to_px()],[x_px,document_height_mm.to_px()])
}

function create_horizontal_guide(y_px){
    var document_width = app.activeDocument.width;
    var document_width_mm = new mm(document_width)
    add_straight_guide([0 - document_width_mm.to_px(),y_px],[document_width_mm.to_px(),y_px])
}

function add_straight_guide(start_coordinate, end_coordinate){
    // 始点と終点の座標を受け取り直線ガイドを作成する
    var target_document = app.activeDocument;
    var path_item = target_document.pathItems.add();
    path_item.setEntirePath([start_coordinate,end_coordinate]); 
    path_item.guides = true;
}

// CONTROLLER  /////////////////////////////////////////////////////////////////////////

// サイズを指定できるようにする
// カバーの有無を指定できるようにする

function main(){
    // A6サイズを定義
    var size_a6 = new Size_A6();
    
    // 背幅を受け取る
    var input = prompt("背幅を、ミリ単位で、半角数字で入力してください","3");
    var se_width = new mm(input);

    // 本のサイズを定義
    var book_size = new BookSize(size_a6.width, size_a6.height, se_width)

    // アートボードを作成
    create_new_document(book_size.frontpage_artboard_width_px, book_size.frontpage_artboard_heigth_px, 2);

    // カバー用のアートボードを、袖幅込みのサイズにリサイズ
    var artboard_for_cover = app.activeDocument.artboards[1];
    resize_artboard(artboard_for_cover, book_size.cover_artboard_width_px, book_size.frontpage_artboard_heigth_px);

    // 各所に必要なガイドを作成
    for(index in book_size.vartical_guide_coodinates){
        var x = book_size.vartical_guide_coodinates[index]
        create_vertical_guide(x);
    }
    for(index in book_size.horizontal_guide_coodinates){
        var y = book_size.horizontal_guide_coodinates[index]
        create_horizontal_guide(y);
    }
}

main();
alert("ドキュメント設定から裁ち落としを設定して下さい"); 
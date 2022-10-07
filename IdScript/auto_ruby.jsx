var ruby_list = [
/////////////////////////////////////////////////////////////////
// ここから上はスクリプトの知識がある方以外編集しないでください
// ※スクリプトの編集は自由ですが、再配布は禁止です※
// ※スクリプトを編集したことで不具合が発生しても、責任は負いかねます※
/////////////////////////////////////////////////////////////////
// 自動でルビを振りたい単語を、サンプルに倣ってこの下に記述してください
// 一行につき、「["親文字","ルビ"],」と記入してください。行末のカンマは必ず必要です。
/////////////////////////////////////////////////////////////////
["親文字","ルビ"],

/////////////////////////////////////////////////////////////
// ここから下は、スクリプトの知識がある方以外編集しないで下さい //
////////////////////////////////////////////////////////////
]

run()

// 実行関数
function run(){
    // ドキュメント内の、アクセス可能なストーリー全てを取得する
    try{
        var document = app.activeDocument
    }catch(e){
        alert("ドキュメントを開いてから実行して下さい")
        return
    }

    var valid_stories = get_valid_stories(document)
    if(valid_stories.length <= 0){
        alert("ドキュメント内に、編集可能なストーリーがありません。テキストを入力してから実行してください")
        return
    }

    for(var index = 0; index < ruby_list.length; index++){
        var ruby = new Ruby(ruby_list[index][0],ruby_list[index][1])
        if(!confirm("「" + ruby.base_text + "」に「" + ruby.ruby_text + "」とルビを振りますか？")){continue}
        set_ruby_service(ruby, valid_stories)
    }

    if(!confirm("続けて、ルビを振りたい単語を入力しますか？")){return}

    while(true){
        // 親文字とルビの入力を受け取る
        var ruby = input_ruby_text()
        if(ruby == null){return}

        set_ruby_service(ruby, valid_stories)

        // 繰り返すか聞く
        if(!confirm("「" + ruby.base_text + "」に「" + ruby.ruby_text + "」とルビを振りました。続けますか？")){return}
    }
}

// 親文字を取得してルビを振る
function set_ruby_service(ruby, stories){
    // ルビを振る文字を検索し、検索結果に対してルビを有効にする処理をする
    var target_word_list = search(ruby.base_text, stories[0])
    set_ruby(target_word_list,ruby.ruby_text)
}

// 親文字とルビ文字を保存するためのオブジェクト
function Ruby(base_text, ruby_text){
    this.base_text = base_text
    this.ruby_text = ruby_text
}

// ルビ文字の入力を受け取る
function input_ruby_text(){
    var base_text = input_prompt("ルビを振りたい文字列（親文字）")
    if(base_text == null){return null}

    var ruby_text = input_prompt("「" + base_text + "」に振るルビ")
    if(ruby_text == null){return null}

    var conf = confirm("「" + base_text + "」に「" + ruby_text + "というルビを振ります。よろしいですか？")
    if(!conf){return null}
    return new Ruby(base_text, ruby_text)

    function input_prompt(message){
        while(true){ 
            input_text = prompt(message + "を入力してください","")
            if(input_text == null){alert("処理を終了します"); return null} // cancelが押された
            if(input_text == ""){alert(message + "を正しく入力してください"); continue} // 空白
            return input_text
        }
    }
}


// 利用可能なストーリーのリストを取得する
function get_valid_stories(document){
    var stories = document.stories
    var valid_stories = []
    for(var n = 1; n <= stories.length; n++){
        if(stories.item(n).isValid){
            var story = stories.item(n)
            if(!story.contents){continue}
            valid_stories.push(story)
        }
    } 
    return valid_stories
}

// ルビを振る対象文字列を検索する
function search(keyword, story){
    app.findTextPreferences = NothingEnum.nothing;
    app.changeTextPreferences = NothingEnum.nothing;
    app.findTextPreferences.findWhat = keyword;
    var result = story.findText(false)
    return result
}

// ルビを振る
function set_ruby(target_word_list, ruby_text){
    for(var index = 0; index < target_word_list.length; index++){

        var target = target_word_list[index]
        if(target.contents[0] == "「"){target = remove_blackets(target)}

        target.rubyString = ruby_text
        target.rubyType = RubyTypes.GROUP_RUBY
        target.rubyFlag = true
        target.rubyOpenTypePro = false
    }

    // ルビを振る対象文字列に「」が含まれていた場合、「」を除去してルビを振る
    function remove_blackets(target_text){
        var new_keyword = target_text.contents.replace(/[「」]/g, "")
        app.findTextPreferences = NothingEnum.nothing;
        app.changeTextPreferences = NothingEnum.nothing;
        app.findTextPreferences.findWhat = new_keyword;
        return target_text.findText(false)[0]
    }
}


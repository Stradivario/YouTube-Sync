var sub_id;

function search() {
    var word = document.getElementById("murl").value;
    document.getElementById("murl").value = "";
    //wordが検索ワードかURLか判別
    if(word.indexOf("https://www.youtube.com/watch?v=") != -1) {
        //URL
        var sub_id = word.split("watch?v=")[1];
        
        //サムネイル画像のURL
        //var url_pic = "http://img.youtube.com/vi/" + id + "/2.jpg";
        //1件のみをimgタグのsrcに入れて表示 
        
        sub_player.cueVideoById(sub_id);

    } else {
        //検索ワード
        //DATA APIにwordを投げて情報取得
        
    }
    

    //検索ワードの場合、DATA API使ってサムネイル、名前、長さを取得、アップロード者の情報を取得
    
    //URLの場合、それに該当する動画をDATA API使ってサムネイル、名前、長さを取得、アップロード者の情報を取得
}

function pushButtonListener() {
    //pushIdFromSubToMain(sub_id);
    player.cueVideoById(sub_id);
}
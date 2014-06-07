//iframe player api 
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var done = false;
var sub_player;
var startTime;

//YouTubeの動画ID
var ytId;

//apiが読み込めた時のコールバック関数
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player1', {
        height: '315',
        width: '560',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });
    
    sub_player = new YT.Player('player2', {
        height: '150',
        width: '230',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });
    
}
        
function onPlayerReady(evt) {
    //
}

function onPlayerStateChange(evt) {
    //
}

function play() {
    player.playVideo();
}

function pause() {
    player.pauseVideo();
}

function stopVideo() {
    //stopVideo()は動画の読み込みも止める
    player.stopVideo();
}

//再生してからの相対時間を計測
function countTimeFromStart() {
    
}

function setYouTubeId(url) {
    ytId = url.split("watch?v=")[1];
}

function loadVideoById() {
    player.cueVideoById(ytId);
    setHistory("set: " + ytId);
}

function initialize() {
    var url = document.getElementById("murl").value;
    document.getElementById("murl").value = "";
    setYouTubeId(url);
    sendRequest("0", ytId, "0", "set");
    loadVideoById();
}

function getCurrentPosition() {
    var position = player.getCurrentTime();
    return position;
}

function pauseWithSeek(host_position) {
    player.seekTo(host_position, true);
    
}

function playButtonListener() {
    sendRequest("1", "ytId", getCurrentPosition(), "start");
    play();
    setHistory("play: " + getCurrentPosition());
}

function pauseButtonListener() {
    pause();
    sendRequest("2", "ytId", getCurrentPosition(), "pause");
    setHistory("pause: " + getCurrentPosition());
}


function syncButtonListener() {

}

//メインプレーヤーの動画IDのセッター
function pushIdFromSubToMain(fromId) {
    alert(ytId);
    ytId = fromId;
    alert(ytId);
}
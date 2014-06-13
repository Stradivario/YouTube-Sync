//iframe player api 
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var ytId;
var done = false;
var startTime = 0;
var timer;
var firstFlag;


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
    
}
        
function onPlayerReady(evt) {
    //
}

function onPlayerStateChange(evt) {
    if(evt.data == YT.PlayerState.PLAYING) {
        if(firstFlag == 0) {
            pause();
            firstFlag = 1;
            player.seekTo(0-getCurrentPosition(), true);
        }
    }
}

//5秒ずれると動画を停止(停止簿ボタン)
function checkDelay() {  
    currentTime = getCurrentPosition();
    var gap = Math.abs(startTime - currentTime);
    if(gap >= 3) {
        pauseButtonListener();
        console.log("find gap! gap = " + gap + "");
        clearInterval(timer);
        startTime = currentTime;
        pauseButtonListener();
    }
}

function countSecond() {
    startTime++;
    checkDelay();
}

//再生してからの相対時間を計測
function countTimeFromStart() {
    timer = setInterval("countSecond()", 1000);
}

function play() {
    player.playVideo();
    countTimeFromStart();
}

function pause() {
    player.pauseVideo();
}

function stopVideo() {
    //stopVideo()は動画の読み込みも止める
    player.stopVideo();
}

function setYouTubeId(url) {
    ytId = url.split("watch?v=")[1];
}

function loadVideoById() {
    //player.cueVideoById(ytId);
    firstFlag = 0;
    player.loadVideoById(ytId);
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
    sendRequest("2", "ytId", getCurrentPosition(), "pause");
}

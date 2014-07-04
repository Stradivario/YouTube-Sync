//iframe player api 
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var ytId;
var done = false;
var startTime = 0;
var timer1;
var timer2;
var firstFlag;
var judge_term = 3;

//デバッグ情報
console.log("set first flag");

//apiが読み込めた時のコールバック関数
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player1', {
        height: '315',
        width: '560',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}
        
function onPlayerStateChange(evt) {
    if(evt.data == YT.PlayerState.PLAYING) {
        if(firstFlag == 0) {
            pause();
            firstFlag = 1;
            player.seekTo(0-getCurrentPosition(), true);
            console.log("unset first flag");
        }
    }
}

/*
function setCurentQuality() {
    var quality = player.getPlaybackQuality();
    document.getElementById("quality").innerHTML = quality;
}
*/

function checkBuff() {
    var globalBuff = Math.round(player.getVideoLoadedFraction() * 100);
    var localBuff = globalBuff - Math.round(getCurrentPosition() / player.getDuration() * 100);
    document.getElementById("global-buff-size").innerHTML = globalBuff;
    document.getElementById("local-buff-size").innerHTML = localBuff;
}

//3秒ずれると動画を停止(停止ボタン)
function checkDelay() {
    currentTime = getCurrentPosition();
    var gap = Math.abs(startTime - currentTime);
    if(gap >= judge_term) {
        pauseButtonListener();
        console.log("find gap = " + gap + "");
        clearInterval(timer);
        startTime = currentTime;
        pauseButtonListener();
    }
}

function countTimeFromStart() {
    startTime++;
    console.log(startTime + " seconds from start movie.");
    //setCurentQuality();
    checkDelay();
}

function countTimeFromSet() {
    checkBuff();
}

//動画を再生してからの相対時間を計測
function setTimerFromStart() {
    timer1 = setInterval("countTimeFromStart()", 1000);
}

//動画をセットしてからの相対時間を計測
function setTimerFromSet() {
    timer2 = setInterval("countTimeFromSet()", 1000)
}

function play() {
    player.playVideo();
    setTimerFromStart();
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
    firstFlag = 0;
    console.log("set first flag");
    startTime = 0;
    setTimerFromSet();
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
    sendRequest("3", "ytId", getCurrentPosition(), "sync");
}

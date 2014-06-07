var request = ["set", "start", "pause", "chat"];

function requestHandler(data) {

    if (data.kind == request[0]) {
        setYouTubeId("https://www.youtube.com/watch?v=" + data.id);
        loadVideoById();
        
    }else if (data.kind == request[1]) {
        play();
        setHistory("start: " + data.time);
        
    }else if (data.kind == request[2]) {
        pause();
        pauseWithSeek(data.time);   //再生位置の補正
        setHistory("pause: " + data.time);
        
    }else if (data.kind == request[3]) {
        setHistory("Host: " + data.msg);
        
    }else {
        return "error";
    }
}


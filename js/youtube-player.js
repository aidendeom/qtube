// Create youtube player
var youtubeApiTag = document.createElement("script");
youtubeApiTag.src = "https://www.youtube.com/iframe_api";

// Get the current script tag
var allScriptTags = document.getElementsByTagName("script");
var thisScriptTag = allScriptTags[allScriptTags.length - 1];

var playerTag = document.createElement("div");
playerTag.id = "player";

thisScriptTag.parentNode.insertBefore(playerTag, thisScriptTag);
thisScriptTag.parentNode.insertBefore(youtubeApiTag, thisScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        //height: "400",
        //width: "400",
        events: {
            "onReady": onYoutubePlayerReady,
            "onStateChange": onPlayerStateChanged
        }
    })
}

function onYoutubePlayerReady(args) {
    tryPlayNextVideo(args.target);
}

function onPlayerStateChanged(args) {
    var state = args.target.getPlayerState();
    if (state === 0) {
        tryPlayNextVideo(args.target);
    }
}

function tryPlayNextVideo(player) {
    getNextVideoId((resp) => {
        if (resp.success) {
            player.loadVideoById(resp.videoId);
        } else {
            pollForNewVideo();
        }
    })
}

function getNextVideoId(onFinished) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                onFinished(xmlHttp.response);
            } else {
                onFinished({
                    "success": false
                });
            }
        }
    }

    xmlHttp.responseType = "json";
    xmlHttp.open("GET", "php/getNextVideoId.php", true);
    xmlHttp.send(null);
}

function pollForNewVideo() {
    var func = tryPlayNextVideo;
    var delay = 5 * 1000; //ms

    window.setTimeout(func, delay, player);
}
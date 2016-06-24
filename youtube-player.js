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
        height: "400",
        width: "400",
        events: {
            "onReady": onYoutubePlayerReady,
            "onStateChange": onPlayerStateChanged
        }
    })
}

function onYoutubePlayerReady(args) {
    getNextVideoId((id) => {
        args.target.loadVideoById(id);
    })
}

function onPlayerStateChanged(args) {
    var state = args.target.getPlayerState();
    if (state === 0) {
        playNextVideo(args.target);
    }
}

function playNextVideo(player) {
    getNextVideoId((id) => {
        player.loadVideoById(id);
    })
}

function getNextVideoId(onFinished) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            console.log(xmlHttp.responseText);
            onFinished(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", "./getNextVideoId.php", true);
    xmlHttp.send(null);
}
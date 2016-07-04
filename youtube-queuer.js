var seachEnabled = false;
var youtube = null;
var exampleResults = "";
var ApiKey = ""; 
var waitingForApiKey = false;

$("#searchQuery").keypress((event) => {
    if (event.which === 13 && searchEnabled) {
        doSearch();
        return false;
    }
});

$.get("api-key", (response) => {
    ApiKey = response;
    if (waitingForApiKey) {
        onApiLoaded();
    }
});

function doSearch() {
    var query = $("#searchQuery").val();

    var requestOptions = {
        part: "snippet",
        q: query,
        maxResults: 25,
        type:"video",
        safeSearch: "none"
    };

    var request = youtube.search.list(requestOptions);
    request.execute(onSearchSuccess);
}

function onSearchSuccess(response) {
    var resultsDiv = document.getElementById("results");
    var resultList = response.items;

    if (!resultList) {
        resultsDiv.text("Search Failed");
        return;
    }

    resultList.forEach((r, idx) => {
        createResultEntry(r, resultsDiv);
    });
}

function createResultEntry(result, parent) {
    var d = document.createElement("div");
    d.setAttribute("class", "resultEntry");

    var img = document.createElement("img");
    img.src = result.snippet.thumbnails.default.url;

    var p = document.createElement("p");
    p.textContent = result.snippet.title;

    d.appendChild(img);
    d.appendChild(p);
    parent.appendChild(d);
}

function onApiLoaded() {
    if (ApiKey === "") {
        waitingForApiKey = true;
        return;
    }

    gapi.client.setApiKey(ApiKey);
    gapi.client.load("youtube", "v3", () => {
        searchEnabled = true;
        $("#searchQuery").attr("disabled", false);
        $("#searchButton").attr("disabled", false);
        youtube = gapi.client.youtube;
    });
}
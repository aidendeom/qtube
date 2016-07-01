$("#searchQuery").keypress((event) => {
    if (event.which === 13) {
        doSearch();
        return false;
    }
});

function doSearch() {
    alert("its working");
}
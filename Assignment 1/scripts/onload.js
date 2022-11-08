// simple file which adds an event-listener for when the webpage is loaded.
// draws the map and the initial data-feed.

window.addEventListener("load", function () {
	d3Draw();
	d3LoadData();
});

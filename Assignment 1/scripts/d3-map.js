// Javascript file for assignment 1 handling the drawing of the map.

function d3Draw(data) {
    d3.json("GeoJSon data/UK-Map.json", function (error, data) {
    if (error) {
        console.error(error);
    }
    console.log("UK-Map.json");
})};

function svgDraw() {
    d3.select("body").append("svg").attr("width", 500).attr("height", 300);
}


window.onload = svgDraw();

// Javascript file for assignment 1 handling the drawing of the map and plotting of the data

function d3Draw() {
const width = 600;
const height = 600;

const mapsvg = d3
	.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

const projection = d3
	.geoMercator()
	.center([0,55.4])
	.scale(1300)
	.translate([width / 2, (0.8 * height) / 2]);

var tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity",0);

const path = d3.geoPath(projection);

const g = mapsvg.append("g");

d3.json("../GeoJSON data/mapuk-v1.json").then((data) => {
	const countries = topojson.feature(data, data.objects.mapuk);

	g.selectAll("path")
		.data(countries.features)
		.enter()
		.append("path")
		.attr("class", "country")
		.attr("d", path);
});

d3.json("http://34.78.46.186/Circles/Towns/10").then((data) => {

	g.selectAll("svg")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", function(d) {
			return d.Town;
		})
		.attr("cx", function(d) {
			return projection([d.lng,d.lat])[0];
		})
		.attr("cy", function(d) {
			return projection([d.lng,d.lat])[1];
		})
		.attr("r", function(d) {
			return 0.00005 * d.Population;
		})
		.append("svg:title")
		.text(function(d) {
			var townData = d.Town + "\nPopulation: " + d.Population + "\nCounty: " + d.County;
			return townData;
		})
});
}
window.onload = d3Draw;
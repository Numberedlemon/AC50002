// Javascript file for assignment 1 handling the drawing of the map.

const width = 900;
const height = 600;

const mapsvg = d3
	.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

const projection = d3
	.geoMercator()
	.scale(1200)
	.translate([width / 1.5, (6 * height) / 2]);

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

window.onload;

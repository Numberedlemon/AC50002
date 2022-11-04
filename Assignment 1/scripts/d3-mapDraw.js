function d3Draw() {
	const width = 450;
	const height = 450;

	const mapsvg = d3
		.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "Map");

	const projection = d3
		.geoMercator()
		.center([0, 55.4])
		.scale(1250)
		.translate([(1.3 * width) / 2, (1 * height) / 2]);

	var tooltip = d3
		.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

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
}

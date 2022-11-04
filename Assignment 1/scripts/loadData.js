function d3LoadData() {
	const width = 450;
	const height = 450;

	const mapsvg = d3
		.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "Data");

	const projection = d3
		.geoMercator()
		.center([0, 55.4])
		.scale(1250)
		.translate([(1.3 * width) / 2, (1 * height) / 2]);

	const path = d3.geoPath(projection);

	const g = mapsvg.append("g");

	d3.json("http://34.78.46.186/Circles/Towns/10").then((data) => {
		g.selectAll("svg")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", function (d) {
				return d.Town;
			})
			.attr("cx", function (d) {
				return projection([d.lng, d.lat])[0];
			})
			.attr("cy", function (d) {
				return projection([d.lng, d.lat])[1];
			})
			.attr("r", function (d) {
				return 0.00005 * d.Population;
			})
			.append("svg:title")
			.text(function (d) {
				var townData =
					d.Town +
					"\nPopulation: " +
					d.Population +
					"\nCounty: " +
					d.County;
				return townData;
			});
	});
}

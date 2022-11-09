function d3LoadData() {	
	
	// define dimensions of svg.
	const width = 450;
	const height = 450;

	// create svg
	const mapsvg = d3
		.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "Data");

	//define projection to be used to be Spherical Mercator	
	const projection = d3
		.geoMercator()
		.center([0, 55.4])
		.scale(1250)
		.translate([(1.3 * width) / 2, (1 * height) / 2]);

	// defines the path to use our Spherical Mercator projection.	
	const path = d3.geoPath(projection);

	// 'g' item to be appended to svg.
	const g = mapsvg.append("g");

	// calling remote server and processing data feed.
	// plots data on drawn map.
	d3.json("http://34.78.46.186/Circles/Towns/10").then((data) => { // Loads an initial data feed of 10 towns.
		g.selectAll("svg")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "town")
			.attr("cx", function (d) {
				return projection([d.lng, d.lat])[0];
			})
			.attr("cy", function (d) {
				return projection([d.lng, d.lat])[1];
			})
			.attr("r", function (d) {
				return 0.00005 * d.Population;
			})
			.append("svg:title") // creating a child of svg to handle the tooltips.
			.text(function (d) { // title of the tooltip contains town name, population, and county.
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
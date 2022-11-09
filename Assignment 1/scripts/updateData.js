function d3Update() {
	// removes all data in the svg of class 'Data'
	d3.selectAll(".Data").remove();

	// constants to define the width and height of the svg.
	const width = 450;
	const height = 450;

	// defines the svg as a constant. This object has class 'Data'
	// to allow for css styling to be applied independent of the map.
	const mapsvg = d3
		.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "Data");


	// defining projection to be a mercator-style map.	
	const projection = d3
		.geoMercator()
		.center([0, 55.4])
		.scale(1250)
		.translate([(1.3 * width) / 2, (1 * height) / 2]);

	// define the 'g' object to be added to the svg.	
	const g = mapsvg.append("g");

	// loads and processes the feed, using the value of the town_value box
	// as defined in 'd3-map.html'.

	// this code is effectively identical to the code contained in 'loadData.js'

	d3.json("http://34.78.46.186/Circles/Towns/" + town_value.value).then(
		(data) => {
			g.selectAll("svg")
				.data(data)
				.enter()
				.append("circle")
				.attr("class", 'town')
				.attr("cx", function (d) {
					return projection([d.lng, d.lat])[0];
				})
				.attr("cy", function (d) {
					return projection([d.lng, d.lat])[1];
				})
				.attr("r", function (d) {
					return 0.00005 * d.Population;
				})
				.append("svg:title") // creation of child of svg to handle tooltips.
				.text(function (d) {
					var townData =
						d.Town +
						"\nPopulation: " +
						d.Population +
						"\nCounty: " +
						d.County;
					return townData;
				});
		}
	);
}

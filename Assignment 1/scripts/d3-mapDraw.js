function d3Draw() {

	// constants for the height and width of the map.
	const width = 450;
	const height = 450;

	// defines the svg as having a width and height defined above.
	// this svg is given class 'Map' to allow for css styling independent
	// to the data feed.
	const mapsvg = d3
		.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "Map");

	// defines the projection as Mercator, as it is in 'loadData.js',
	// and 'updateData.js'.	
	const projection = d3
		.geoMercator()
		.center([0, 55.4])
		.scale(1250)
		.translate([(1.3 * width) / 2, (1 * height) / 2]);

	// creates a variable for the tooltips, appending them as a div to the page.
	// they are defined with opacity 0 to hide them until hovered over.
	var tooltip = d3
		.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	// creates the path variable which will be used to draw the outlines of the shapes
	// of UK countries	
	const path = d3.geoPath(projection);

	// the 'g' item to be appended to the svg.
	const g = mapsvg.append("g");

	// reads the TopoJSON data from 'mapuk-v1.json', and plots it in the svg.
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

// this code was written using Mike Bostock's tutorials and his archive as help,
// which proved instrumental in my understanding of GeoJSON and TopoJSON and geomapping in javascript in general.

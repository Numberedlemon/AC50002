# AC50002 - Assignment 1

Assignment 1 is a D3.js assessment, which pulls data about UK towns from a remote server, and displays them and their associated data on a map. It uses HTML and javascript as it's main drivers, and CSS to handle functional aesthetics such as tooltips, on-hover behaviour, and more.

The map is generated using GeoJSON and TopoJSON data, and is drawn into an SVG using d3.js inbuilt methods. 

Town data is retrieved from a remote server provided by Andrew Cobley, and is drawn into a separated SVG using similar methods.

The number box can be used to tweak the number of towns the feed generates, and when the refresh button (not the F5 button!) is clicked, the existing feed is wiped from the SVG containing the feed, a new feed is generated, and then drawn in in it's place.

Map data was retrieved using the Geospatial Data Abstraction Library, or GDAL, and converted into TopoJSON format and finally GeoJSON format for displaying using D3.js. [Mike Bostock's Tutorials](https://bost.ocks.org/mike/map/) and his archive proved greatly useful in my learning regarding this topic.


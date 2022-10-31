const data = d3.json("http://34.78.46.186/Circles/Towns/50")
               .then(data => {
                d3.select("body").data(data)
               })
               .catch(error);
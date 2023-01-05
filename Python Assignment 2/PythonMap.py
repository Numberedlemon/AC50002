# importing necessary libraries

import pandas as pd
import matplotlib.pyplot as plt

# setting global parameters for cutoff points on the 

LATMIN = 50.681
LATMAX = 57.985
LNGMIN = -10.592
LNGMAX = 1.6848

# creating the pandas dataframe by reading from a file in a relative path.

df = pd.read_csv("Python Assignment 2\\Resources\\GrowLocations.csv", usecols = ["Latitude", "Longitude"])

# creating a map object using matplotlibs .imread method to find a file in a relative path.

map = plt.imread("Python Assignment 2\\Resources\\map7.png")

# filtering on the dataframe to remove unwanted points, i.e.: not within the stated bounding box.

df = df.loc[((df["Longitude"] >= LATMIN) & (df["Longitude"] <= LATMAX) & (df["Latitude"] > LNGMIN) & (df["Latitude"] < LNGMAX)),:]

# showing the map object (the UK map) in a matplotlib frame using z-orders for layering.

plt.imshow(map, zorder = 1, extent = (LNGMIN, LNGMAX, LATMIN, LATMAX))

# creating a scatter plot of the data within the filtered dataframe, using z-orders to place it on top of the image.

plt.scatter(df.Latitude, df.Longitude, zorder = 2)

# showing the image.

plt.show()
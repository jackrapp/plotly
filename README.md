# Bellybutton Diversity Dashboard

Simple visualizations in flask using data from bacterial samples collected from the bellybuttons of university students.

App deployed at:
https://dry-island-96930.herokuapp.com

## Project Summary

### Source data

Two datasets:
* sample dataset: id number, type, and ammount of bacteria found in a given sample
* sample metadata: data about the student from whom the sample was taken

Using flask, information about individual samples are accessed in json format, using /samples/<sample> and /metadata/<sample>
  * https://dry-island-96930.herokuapp.com/samples/940
  * https://dry-island-96930.herokuapp.com/metadata/940

### Visualizations using plotly and d3

Each sample is chosen using a drop-down menu, with the metadata displayed in a table.
<img src="images/table_sample.png" width="250">

#### Pie Chart
![Pie Chart](images/pie_sample.png)

#### Scatter Plot
![Scatter Plot](images/scatter_sample.png)




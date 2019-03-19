function buildMetadata(sample) {
  // Complete the following function that builds the metadata panel
  
  // url for meta_data
  var metadata_url = `metadata/${sample}`;
  console.log(metadata_url);

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(metadata_url).then(function(response) {
    console.log(response);
    // Use d3 to select the panel with id of `#sample-metadata`
    // add ul to hold metadata
    var panel = d3.select('#sample-metadata').append('ul');

    // Use `.html("") to clear any existing metadata
    panel.html('');

     // Use `Object.entries` to add each key and value pair to the panel
     Object.entries(response).forEach(([key, value]) => {
       console.log(key, value);
      // add html
      panel.append('li').text(`${key}: ${value}`);
       });
  });
    
};

function buildCharts(sample) {
  // url for samples data
  var sample_url = `samples/${sample}`;
  console.log(sample_url);

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(sample_url).then(function(response) {
    console.log(response);

    // Build a Bubble Chart using the sample data
    var trace1 = {
      // Use otu_ids for the x values
      x: response.otu_ids,
       // Use sample_values for the y values
      y: response.sample_values,
      // Use otu_labels for the text values
      text: response.otu_labels,

      mode: 'markers',
      marker: {
        // Use otu_ids for the marker colors
        color: response.otu_ids,
        // Use sample_values for the marker size
        size: response.sample_values,
      },
      name: sample,
    };

    // bubble trace/data array
    var data1 = [trace1];
  
    // define buubble layout and title
    var layout1 = {
      showlegend: false,
    };
  
    // plot bubble plot
    Plotly.newPlot('bubble', data1, layout1, {responsive:true});

    // Build a Pie Chart
    var trace2 = {
      // Use sample_values as the values for the PIE chart
      values: response.sample_values.slice(0,11),
      // Use otu_ids as the labels for the pie chart
      labels: response.otu_ids.slice(0,11),
      // Use otu_labels as the hovertext for the chart
      hovertext: response.otu_labels.slice(0,11),
      hoverinfo: 'text',
      type: 'pie',
    };

    var data2 = [trace2];
    
    // define pie layout and title
    var layout2 = {
      showlegend: true,
    };

     // plot pie chart plot
     Plotly.newPlot('pie', data2, layout2, {responsive:true});

  }); // end of d3.json

}; // end of buildCharts()

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();

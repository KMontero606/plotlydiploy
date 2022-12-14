function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// Deliverable 1: Create a Horizontal Bar Chart
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    console.log(samplesArray); 
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesResult = samplesArray.filter(data => data.id == sample);
    console.log(samplesResult);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = samplesResult[0];
    console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = firstSample.otu_ids;
    console.log(otuIDs);
    var otuLabels = firstSample.otu_labels;
    console.log(otuLabels);
    var sampleValues = firstSample.sample_values;
    console.log(sampleValues);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIDs.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse();
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var trace = [{
      y: yticks,
      x: sampleValues.slice(0, 10).reverse(),
      text: otuLabels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {
        color: 'rgba(255,153,51,0.6)'
      }      
    }];
    // 9. Create the layout for the bar chart. 
    var layout = {
      title: "Top 10 bacterial species (OTUs)",
      margin: { l: 100, r: 100, t: 100, b: 100 },
      paper_bgcolor: '#FFA07A',
      plot_bgcolor: '#F0E68C',
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", trace, layout);

// Deliverable 2: Create a Bubble Chart.
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Earth' 
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU ID'},
      automargin: true,
      autosize: true,
      paper_bgcolor: '#FFA07A',
      plot_bgcolor: '#F0E68C',
      hovermode: "closest"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

// Deliverable 3: Create a Gauge Chart.
    // Create a variable that filters the samples for the object with the desired sample number.
    var samplesObj = data.metadata.filter(data => data.id == sample);
    console.log(samplesObj);

    // 3. Create a variable that holds the washing frequency.
    var wFreq = samplesObj[0].wfreq;
    console.log(wFreq);
  
    // 4. Create the trace for the gauge chart.
    var gaugeData = [ 
      {
        domain: { x: [0, 1], y: [0, 1] },
        type: "indicator",
        mode: "gauge+number",
        value: wFreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br> Scrubs Per Week</b>" },
        gauge: {
          axis: { range: [null, 10], tickvals: [0, 2, 4, 6, 8, 10], ticktext: [0, 2, 4, 6, 8, 10] },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lime" },
            { range: [8, 10], color: "green" } 
          ]
        }
      } 
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 450, margin: { t: 0, b: 0 },
      paper_bgcolor: '#FFA07A'     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};

// Deliverable 4: Customize the Dashboard
// 1. Customize your dashboard:
// a. Added an image to the jumbotron.
// b. Added background color or a variety of compatible colors to the webpage.
// c. Added information about what each graph visualizes, either under or next to each graph.
// d. Made the webpage mobile-responsive.
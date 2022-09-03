# plotlydiploy

## Overview of Project:
Roza has a partially completed dashboard and now needs to visualize the bacterial data for each volunteer. Specifically, her volunteers should be able to identify the top 10 bacterial species in their belly buttons. That way, if Improbable Beef identifies a species as a candidate to manufacture synthetic beef, Roza's volunteers will be able to identify whether that species is found in their navel.

## Results:
### Deliverable 1: Create a Horizontal Bar Chart
```
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
      orientation: "h"      
    }];
    // 9. Create the layout for the bar chart. 
    var layout = {
      title: "Top 10 bacterial species (OTUs)",
      margin: { l: 100, r: 100, t: 100, b: 100 }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", trace, layout);
```

### Deliverable 2: Create a Bubble Chart
```
// Deliverable 2: Create a Bubble Chart.
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs 
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU ID'},
      margins: {t: 0},
      hovermode: "closest"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
```
### Deliverable 3: Create a Gauge Chart
```
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
      width: 600, height: 450, margin: { t: 0, b: 0 }     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};
```
### Deliverable 4: Customize the Dashboard
Customize the dashboard by adding an image to the jumbotron, adding background color/variety of cmpatible colors to the webpage, and made the webpage mobile-responsive. Also, added information about what each graph visualizes.

## Summary:
When my webpage is deployed in a local server, my webpage is rendered with customization added,

<img width="963" alt="image" src="https://user-images.githubusercontent.com/106962921/188250560-16102db0-77d0-4a20-b54c-97d0d54fca9f.png">

<img width="941" alt="image" src="https://user-images.githubusercontent.com/106962921/188249296-4cbb8194-90f2-4341-a483-5e56f1c5de9c.png">

However, when deployed in github.io, my webpage renders without the customization added.

<img width="958" alt="image" src="https://user-images.githubusercontent.com/106962921/188249429-f835b63c-6bb3-426b-b466-43c22d55bd9a.png">

<img width="956" alt="image" src="https://user-images.githubusercontent.com/106962921/188249443-5d5a3c84-c070-4123-aca3-e2cb0054c7e9.png">

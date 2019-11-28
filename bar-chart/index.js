const { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format } = d3;
// scaleLinear used for quantitative scales
// scaleBand used for ordinal scales

const width = 1000;
const height = 600;
const margins = {
  top: 120,
  right: 20,
  bottom: 100,
  left: 150
};
const innerWidth = width - (margins.left + margins.right);
const innerHeight = height - (margins.top + margins.bottom);
const style = {
  fillColor: 'steelblue',
  fontFamily: 'sans-serif',
  title: {
    fontSize: '3em',
    fontFamily: 'sans-serif',
  },
  x: {
    axisValue: {
      fontSize: '1em',
      fontFamily: 'sans-serif',
    },
    axisLabel: {
      fontSize: '1em',
      fontFamily: 'sans-serif',
      fillColor: 'steelblue',
      fontWeight: 'bold'
    },
    tick: {
      stroke: '#c7c7c7'
    }
  },
  y: {
    axisValue: {
      fontSize: '1em',
      fontFamily: 'sans-serif',
    },
    axisLabel: {
      fontSize: '1em',
      fontFamily: 'sans-serif',
      fillColor: 'steelblue',
      fontWeight: 'bold'
    },
  }
};

const svg = select('#bar-chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

const render = data => {
  const xValue = d => d.population;
  const yValue = d => d.country;
  const g = svg.append('g')
     .attr('transform', `translate(${margins.left},${margins.top})`);

  // X-Axis scale declaration
  const xScale = scaleLinear()
     .domain([0, max(data, xValue)])
     .range([0, innerWidth]);

  // Y-Axis scale declaration
  const yScale = scaleBand()
     .domain(data.map(yValue))
     .range([0, innerHeight])
     .padding(0.1);

  
  // Y-Axis implementation
  const yAxisG = g.append('g')
   .call(axisLeft(yScale))
   .attr('font-size', style.y.axisValue.fontSize);

  yAxisG.selectAll('.domain, .tick line').remove();

  yAxisG.append('text')
   .text('Countries')
   .attr('fill', style.x.axisLabel.fillColor)
   .attr('font-weight', style.y.axisLabel.fontWeight)
   .attr('y', innerHeight/2)
   .attr('transform', `rotate(270 -110 ${innerHeight/2})`);

  // formating the linear scale values
  const xScaleFormat = number => format('.3s')(number).replace('G', 'B');

  // X-Axis implementation
  const xAxis = axisBottom(xScale)
   .tickFormat(xScaleFormat)
   .tickSize(-innerHeight);

  const xAxisG = g.append('g').call(xAxis)
   .attr('transform', `translate(0,${innerHeight})`)
   .attr('font-size', style.x.axisValue.fontSize);
   
  xAxisG.select('.domain').remove();

  xAxisG.selectAll('.tick line')
     .attr('stroke', style.x.tick.stroke);

  xAxisG.append('text')
     .text('Population')
     .attr('fill', style.x.axisLabel.fillColor)
     .attr('font-weight', style.x.axisLabel.fontWeight)
     .attr('x', innerWidth/2)
     .attr('y', 60);
     

  // grouping the recangle bars
  const gRect = g.append('g')
     .attr('fill', style.fillColor);

  gRect.selectAll('rect').data(data)
     .enter().append('rect')
     .attr('y', d => yScale(yValue(d)))
     .attr('width', d => xScale(xValue(d)))
     .attr('height', yScale.bandwidth());
  
  // title for the chart
  g.append('text')
   .attr('y', -10)
   .attr('font-size', style.title.fontSize)
   .attr('font-family', style.title.fontFamily)
   .text('Top 10 most populous countries');
};

// data rendering
csv('/data/population.csv').then(response => {
  response.forEach(res => {
    res.population = +res.population * 1000
  });
  render(response);
});
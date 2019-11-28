const { select, csv, scaleLinear, max, scalePoint, axisLeft, axisBottom, format } = d3;
// scaleLinear used for quantitative scales
// scalePoint used for ordinal scales

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
    tick: {
      stroke: '#c7c7c7'
    }
  }
};

const svg = select('#scatter-plot')
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
     .range([0, innerWidth])
     .nice();

  // Y-Axis scale declaration
  const yScale = scalePoint()
     .domain(data.map(yValue))
     .range([0, innerHeight])
     .padding(1);

  // Y-Axis implementation
  const yAxis = axisLeft(yScale)
   .tickSize(-innerWidth);

  const yAxisG = g.append('g')
   .call(yAxis)
   .attr('font-size', style.y.axisValue.fontSize);

  yAxisG.select('.domain').remove();

  yAxisG.selectAll('.tick line')
   .attr('stroke', style.y.tick.stroke);

  yAxisG.append('text')
   .text('countries')
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
     

  // grouping circles
  const gRect = g.append('g')
     .attr('fill', style.fillColor);

  gRect.selectAll('circle').data(data)
     .enter().append('circle')
     .attr('cy', d => yScale(yValue(d)))
     .attr('cx', d => xScale(xValue(d)))
     .attr('r', 12);
  
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
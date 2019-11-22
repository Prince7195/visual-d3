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
    axisLable: {
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
    axisLable: {
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
  const xScale = scaleLinear()
     .domain([0, max(data, xValue)])
     .range([0, innerWidth]);

  const yScale = scaleBand()
     .domain(data.map(yValue))
     .range([0, innerHeight])
     .padding(0.1);

  const xScaleFormat = number => format('.3s')(number).replace('G', 'B');
  const xAxis = axisBottom(xScale)
   .tickFormat(xScaleFormat)
   .tickSize(-innerHeight);

  const yAxisG = g.append('g')
   .call(axisLeft(yScale))
   .attr('font-size', style.y.axisValue.fontSize);

  yAxisG.selectAll('.domain, .tick line').remove();

  yAxisG.append('text')
   .text('countries')
   .attr('fill', style.x.axisLable.fillColor)
   .attr('font-weight', style.y.axisLable.fontWeight)
   .attr('y', innerHeight/2)
   .attr('transform', `rotate(270 -110 ${innerHeight/2})`);

  const xAxisG = g.append('g').call(xAxis)
   .attr('transform', `translate(0,${innerHeight})`)
   .attr('font-size', style.x.axisValue.fontSize);
   
  xAxisG.select('.domain').remove();

  xAxisG.selectAll('.tick line')
     .attr('stroke', '#c7c7c7');

  xAxisG.append('text')
     .text('Population')
     .attr('fill', style.x.axisLable.fillColor)
     .attr('font-weight', style.x.axisLable.fontWeight)
     .attr('x', innerWidth/2)
     .attr('y', 60);
     

  const gRect = g.append('g')
     .attr('fill', style.fillColor);

  gRect.selectAll('rect').data(data)
     .enter().append('rect')
     .attr('y', d => yScale(yValue(d)))
     .attr('width', d => xScale(xValue(d)))
     .attr('height', yScale.bandwidth());
  
  g.append('text')
   .attr('y', -10)
   .attr('font-size', style.title.fontSize)
   .attr('font-family', style.title.fontFamily)
   .text('Top 10 most populous countries');
};

csv('/data/population.csv').then(response => {
  response.forEach(res => {
    res.population = +res.population * 1000
  });
  render(response);
});
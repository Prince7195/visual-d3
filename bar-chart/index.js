const { select, csv, scaleLinear, max } = d3;
// scaleLinear used for quantitative

const width = 960;
const height = 600;
let alignHeight = 0;

const svg = select('#bar-chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

const render = data => {
  const xScale = scaleLinear()
     .domain([0, max(data, d => d.population)])
     .range([0, width]);

  const yScale = '';

  svg.selectAll('rect').data(data)
     .enter().append('rect')
     .attr('width', d => xScale(d.population))
     .attr('height', 30);
};

csv('/data/population.csv').then(response => {
  response.forEach(res => {
    res.population = +res.population * 100
  });
  render(response);
});
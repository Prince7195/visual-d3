const { select, csv } = d3;

const width = 960;
const height = 600;

const svg = select('#bar-chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

      csv('/data/population.csv').then(res => {
        console.log(res);
      });
const { select, range, scaleOrdinal } = d3;

const width = 1200;
const height = 600;

const svg = select('#svg')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);
const radiusScale = scaleOrdinal().domain(['apple', 'lemon']).range([50, 30]);

const fruitBowl = (svg, { fruits }) => {

  const bowl = svg.selectAll('rect')
    .data([null])
    .enter().append('rect')
      .attr('y', 220)
      .attr('width', 700)
      .attr('height', 200)
      .attr('rx', 300/2)
      .attr('fill', '#fffda6')


  const groups = svg.selectAll('g').data(fruits);
  const groupsEnter = groups.enter().append('g');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) => `translate(${i * 120 + 80},${height / 2})`);

    groups.exit()
      .remove();

    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', d => radiusScale(d.type))
        .attr('fill', d => colorScale(d.type));

    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d.type)
        .attr('y', 80)
        .attr('font-size', '1.5em')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif');

}

const makeFruit = type => ({ type });

let fruits = range(5).map(() => makeFruit('apple'));

const render = () => {
  fruitBowl(svg, {
    fruits,
    height
  })
};

render();

// eat apple
setTimeout(() => {
  fruits.pop();
  render();
}, 1000);

// replace on apple with lemon
setTimeout(() => {
  fruits[2].type = 'lemon';
  render();
}, 2000);

// eat another apple
setTimeout(() => {
  fruits = fruits.filter((f, i) => i !== 1);
  render();
}, 3000);
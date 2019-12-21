const { select, range, scaleOrdinal } = d3;

const width = 960;
const height = 600;
let selectedId = null;

const svg = select('#svg')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);
const radiusScale = scaleOrdinal().domain(['apple', 'lemon']).range([50, 30]);

const setSelectedFruitId = id => {
  selectedId = id;
  render();
};

const fruitBowl = (svg, { fruits, setSelectedFruitId, selectedId }) => {

  const circle = svg.selectAll('circle').data(fruits, d => d.id);
  const xPosition = (d, i) => i * 120 + 80;

  circle
    .enter().append('circle')
      .attr('cx', xPosition)
      .attr('cy', height / 2)
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type))
    .merge(circle)
      .attr('fill', d => colorScale(d.type))
      .on('mouseover', d => setSelectedFruitId(d.id))
      .on('mouseout', () => setSelectedFruitId(null))
      .attr('stroke-width', 5)
      .attr('stroke', d => d.id === selectedId ? 'black' : 'none')
    .transition().duration(1000)
      .attr('cx', xPosition)
      .attr('r', d => radiusScale(d.type));

  circle.exit()
    .transition().duration(1000)
      .attr('r', 0)
      .remove();

}

const makeFruit = type => ({ type, id: Math.random() });

let fruits = range(5).map(() => makeFruit('apple'));

const render = () => {
  fruitBowl(svg, {
    fruits,
    height,
    setSelectedFruitId,
    selectedId
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
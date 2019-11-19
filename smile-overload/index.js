const { select, arc } = d3;

const width = 960;
const height = 600;
const eyeSpacing = 75;
const eyeYOffset = -50;
const eyeRadius = 30;
const eyebrowWidth = 50;
const eyebrowHeight = 10;
const eyebrowYOffset = -50;

const svg = select('#smile')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

const g = svg
    .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

const circle = g
    .append('circle')
      .attr('r', height/3)
      .attr('fill', 'yellow')
      .attr('stroke', '#000')
      .attr('stroke-width', '2');

const eyesG = g
    .append('g')
      .attr('transform', `translate(0, ${eyeYOffset})`);

const eyebrowsG = eyesG
      .append('g')
        .attr('transform', `translate(0, ${eyebrowYOffset})`);

eyebrowsG
    .transition().duration(2000)
      .attr('transform', `translate(0, ${eyebrowYOffset-30})`)
    .transition().duration(2000)
      .attr('transform', `translate(0, ${eyebrowYOffset})`);

const leftEye = eyesG
    .append('circle')
      .attr('r', eyeRadius)
      .attr('cx', -eyeSpacing);

const rightEye = eyesG
    .append('circle')
      .attr('r', eyeRadius)
      .attr('cx', eyeSpacing);

const leftEyebrow = eyebrowsG
    .append('rect')
      .attr('x', -eyeSpacing - eyebrowWidth/2)
      .attr('width', eyebrowWidth)
      .attr('height', eyebrowHeight);

const rightEyebrow = eyebrowsG
    .append('rect')
      .attr('x', eyeSpacing - eyebrowWidth/2)
      .attr('width', eyebrowWidth)
      .attr('height', eyebrowHeight);

const mouth = g
    .append('path')
      .attr('d', arc()({
          innerRadius: 0,
          outerRadius: 140,
          startAngle: Math.PI/2,
          endAngle: Math.PI/2 * 3
      }))

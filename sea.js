const canvas = document.querySelector('#sea');
const ctx = canvas.getContext('2d');
const W = 1000, H = 500;
const blades = Array.from({length: 79}, (_, i) => {
  const seed = Math.sin(i * 78.23) * 43758.5;
  const depth = seed - Math.floor(seed);
  return {x: (i + .5) * W / 79, base: 414 + depth * 79, length: 64 + depth * 160, depth, offset: 0, velocity: 0, mass: .7 + depth};
});
function paint() {
  ctx.fillStyle = '#102a33';
  ctx.fillRect(0, 0, W, H);
  for (const b of blades) {
    ctx.strokeStyle = b.depth > .76 ? '#e0ba80' : b.depth > .42 ? '#83ae99' : '#477879';
    ctx.lineWidth = 1 + b.depth * 2;
    ctx.beginPath();
    ctx.moveTo(b.x, b.base);
    ctx.quadraticCurveTo(b.x, b.base - b.length * .58, b.x + b.offset, b.base - b.length);
    ctx.stroke();
  }
}
paint();

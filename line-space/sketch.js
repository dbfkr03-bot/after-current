const paper = document.querySelector('#paper');
const ctx = paper.getContext('2d');
const systems = [new Line('손이 닿기 전의 문장', 115), new Line('지나간 자리에 남은 간격', 223), new Line('다시 읽히는 동안', 331)];
let previous = 0;
function draw(now) {
  const dt = Math.min((now - previous) / 1000, 1 / 30);
  previous = now;
  ctx.clearRect(0, 0, paper.width, paper.height);
  for (const system of systems) {
    ctx.strokeStyle = '#cec9b9';
    ctx.beginPath();
    ctx.moveTo(75, system.origin.y + 12);
    ctx.lineTo(885, system.origin.y + 12);
    ctx.stroke();
    system.run(ctx, dt, p => {
      p.applyForce(16 * (p.homeX - p.x) - 3 * p.vx, 16 * (p.homeY - p.y) - 3 * p.vy);
      p.applyForce(0, 28 * Math.sin(now / 1000 + p.index * 0.44));
    });
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
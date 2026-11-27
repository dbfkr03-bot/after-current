const paper = document.querySelector('#paper');
const ctx = paper.getContext('2d');
const systems = [new ParticleSystem(480, 70)];
let previous = 0;
function draw(now) {
  const dt = Math.min((now - previous) / 1000, 1 / 30);
  previous = now;
  ctx.clearRect(0, 0, paper.width, paper.height);
  for (const system of systems) {
    system.addParticle();
    system.run(ctx, dt, p => p.applyForce(25 * Math.sin(now / 900), 52));
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
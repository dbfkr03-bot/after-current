const forces = [];
function applyForce(blade, force, dt) {
  blade.velocity += force / blade.mass * dt;
}
let elapsed = 0, previous = 0, pending = 0;
function tick(now) {
  pending += Math.min((now - previous) / 1000, .05);
  previous = now;
  const dt = 1 / 120;
  while (pending >= dt) {
    elapsed += dt;
    for (const b of blades) {
      for (const force of forces) applyForce(b, force(b), dt);
      b.offset += b.velocity * dt;
    }
    pending -= dt;
  }
  paint();
  requestAnimationFrame(tick);
}
forces.push(b => 8 * Math.cos(elapsed * 1.8 + b.x / 260));
requestAnimationFrame(tick);

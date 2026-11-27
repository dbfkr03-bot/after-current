class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 50 - 25;
    this.vy = -20;
    this.mass = 0.8 + Math.random() * 0.6;
    this.life = 3;
    this.ax = 0;
    this.ay = 0;
  }
  applyForce(fx, fy) {
    this.ax += fx / this.mass;
    this.ay += fy / this.mass;
  }
  update(dt) {
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
    this.ax = this.ay = 0;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;
  }
  display(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  isDead() { return this.life <= 0; }
}
class ParticleSystem {
  constructor(x, y) {
    this.origin = {x, y};
    this.particles = [];
  }
  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }
  run(ctx, dt, field) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      field(p);
      p.update(dt);
      if (p.isDead()) this.particles.splice(i, 1);
      else p.display(ctx);
    }
  }
}
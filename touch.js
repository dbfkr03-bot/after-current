const pulses = [];
function pulse(x, direction) {
  pulses.push({x, direction, born: elapsed});
  while (pulses.length > 40) pulses.shift();
}
function age(p) { return elapsed - p.born; }
forces.push(b => {
  while (pulses.length && age(pulses[0]) > 2) pulses.shift();
  return pulses.reduce((sum, p) => {
    const distance = Math.abs(b.x - p.x);
    const front = distance - age(p) * 270;
    return sum + p.direction * 620 * Math.exp(-(front ** 2) / 4200 - distance / 240 - age(p) * 1.8);
  }, 0);
});
let lastX, lastPulse;
function localX(e) {
  const rect = canvas.getBoundingClientRect();
  return (e.clientX - rect.left) / rect.width * W;
}
canvas.onpointerdown = e => {
  canvas.setPointerCapture(e.pointerId);
  lastX = localX(e);
  lastPulse = elapsed;
  pulse(lastX, 1);
};
canvas.onpointermove = e => {
  if (!canvas.hasPointerCapture(e.pointerId)) return;
  const x = localX(e);
  if (Math.abs(x - lastX) > 9 && elapsed - lastPulse > .075) {
    pulse(x, Math.sign(x - lastX));
    lastX = x;
    lastPulse = elapsed;
  }
};

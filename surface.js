const paintForest = paint;
paint = function () {
  paintForest();
  ctx.save();
  for (const p of pulses) {
    const t = age(p);
    ctx.strokeStyle = 'rgba(190,225,210,' + (.42 * Math.exp(-t * 2)) + ')';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(p.x, 78, 3 + t * 270, 2 + t * 10, 0, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
};

const hand = {x: 480, y: 220, strength: 0};
const paper = document.querySelector('#paper');
const ctx = paper.getContext('2d');
const systems = [new Line('손이 닿기 전의 문장', 115), new Line('지나간 자리에 남은 간격', 223), new Line('다시 읽히는 동안', 331)];
let previous = 0;
function draw(now) {
  const dt = Math.min((now - previous) / 1000, 1 / 30);
  previous = now;
  ctx.clearRect(0, 0, paper.width, paper.height);
  ctx.font = '14px Georgia';
  ctx.fillStyle = '#ab432e';
  ctx.textAlign = 'left';
  let row = 0;
  for (const system of systems) {
    ctx.fillText(['초판', '여백', '재독'][row++], 76, system.origin.y);
  
    ctx.strokeStyle = '#cec9b9';
    ctx.beginPath();
    ctx.moveTo(75, system.origin.y + 12);
    ctx.lineTo(885, system.origin.y + 12);
    ctx.stroke();
    system.run(ctx, dt, p => {
      p.applyForce(16 * (p.homeX - p.x) - 3 * p.vx, 16 * (p.homeY - p.y) - 3 * p.vy);
      const dx = p.x - hand.x;
      const dy = p.y - hand.y;
      const distance = Math.hypot(dx, dy);
      const pressure = hand.strength * Math.max(0, 1 - distance / 210);
      p.applyForce(pressure * dx / (distance + 1), pressure * (dy - 18) / (distance + 18));
      p.applyForce(0, 28 * Math.sin(now / 1000 + p.index * 0.44));
    });
  }
  hand.strength *= Math.exp(-dt * 2.2);
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
function touch(event) {
  const rect = paper.getBoundingClientRect();
  hand.x = (event.clientX - rect.left) * paper.width / rect.width;
  hand.y = (event.clientY - rect.top) * paper.height / rect.height;
  hand.strength = event.buttons ? 3800 : 1500;
}
paper.addEventListener('pointermove', touch);
paper.addEventListener('pointerdown', touch);

const toolbar = document.querySelector('#tools');
const hint = document.createElement('p');
hint.textContent = '문장을 쓸어 보세요. 누른 채 움직이면 행간이 더 벌어집니다.';
toolbar.append(hint);
const press = document.createElement('button');
press.textContent = '가운데 행 밀기';
press.onclick = () => Object.assign(hand, {x: 350, y: 236, strength: 4800});
toolbar.append(press);
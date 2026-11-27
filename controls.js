const controls = document.querySelector('#controls');
const hint = document.createElement('span');
hint.textContent = '수면을 누르거나 좌우로 쓸어 물살을 보내세요.';
controls.append(hint);
for (const direction of [-1, 1]) {
  const button = document.createElement('button');
  button.textContent = direction < 0 ? '← 왼쪽 물살' : '오른쪽 물살 →';
  button.onclick = () => pulse(W / 2, direction);
  controls.append(button);
}

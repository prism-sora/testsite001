const container = document.querySelector('.container');
const walk = 30; // 影の移動範囲 (px)

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = container;
  let { offsetX: x, offsetY: y } = e;

  // イベントの発生源が対象要素(.container)の子要素だった場合、座標を補正
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  // 影のスタイルを動的に設定
  container.style.boxShadow = `
    ${xWalk}px ${yWalk}px 15px rgba(0, 0, 0, 0.2),
    ${xWalk * -1}px ${yWalk * -1}px 15px rgba(0, 100, 255, 0.1)
  `;
}

container.addEventListener('mousemove', shadow);

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

// --- Sparkle Effect ---
document.addEventListener('mousemove', function(e) {
  let sparkle = document.createElement('span');
  sparkle.classList.add('sparkle');

  // カーソル位置の少し右下に配置
  sparkle.style.left = (e.pageX + 5) + 'px';
  sparkle.style.top = (e.pageY + 5) + 'px';

  // 異なるタイミングで消えるように、消滅時間をランダムにする
  const duration = Math.random() * 0.5 + 0.4; // 0.4sから0.9s
  sparkle.style.animationDuration = duration + 's';

  // この部分はCSSカスタムプロパティを使うとより柔軟ですが、今回はシンプルに

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, duration * 1000);
});

// --- Scroll-in Animation ---
const fadeInSections = document.querySelectorAll('.fade-in-section');

const observerOptions = {
  root: null, // ビューポートをルートとする
  rootMargin: '0px',
  threshold: 0.1 // 要素の10%が見えたら発火
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // 一度表示されたら監視を停止
    }
  });
}, observerOptions);

fadeInSections.forEach(section => {
  observer.observe(section);
});

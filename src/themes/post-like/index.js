import postLikeStyle from './post-like.css';
import postLikeSvg from './post-like.svg';

const themeStyle = document.createElement('style');
themeStyle.textContent = postLikeStyle;

function getSvgNode() {
  const div = document.createElement('div');
  div.innerHTML = postLikeSvg;
  return div.firstChild;
}

export default function generatePostLikeTheme(frames) {
  const div = document.createElement('div');
  div.id = 'frame-rate';

  Array.prototype.forEach
    .call(
      String(frames),
      (num) => {
        const svg = getSvgNode();
        svg.querySelector(`#_${num}`)
          .classList
          .remove('hide');
        div.appendChild(svg);
      }
    );

  return {
      style: themeStyle,
      el: div,
  };
}

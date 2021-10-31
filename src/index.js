import styleEl from './style/style';
import generatePostLikeTheme from './themes/post-like';

class FrameRate extends HTMLElement {
  constructor() {
    super();
    this.frameRate = 144;
    this.theme = generatePostLikeTheme(this.frameRate);

    const shadow = this.attachShadow({mode: 'open'});

    shadow.appendChild(styleEl);

    this.theme.forEach(node => shadow.appendChild(node));
  }
}

customElements.define('frame-rate', FrameRate)

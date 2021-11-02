import styleEl from './style/style';
import generatePostLikeTheme from './themes/post-like';
import FrameRateCount from "./utils/frame-rate-count";

class FrameRate extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(styleEl);

    this.theme = {
      style : document.createElement('style'),
      el: document.createElement('div'),
    };

    this.frCounter = new FrameRateCount(this.render.bind(this));
  }

  disconnectedCallback() {
    this.frCounter.off();
  }

  attributeChangedCallback(key, prev, next) {
    if (!this[key]) return 0;

    try {
      this[key](prev, next);
    } catch (e) { }
  }

  render(frameRate) {
    this.theme.style.remove();
    this.theme.el.remove();

    this.theme = generatePostLikeTheme(frameRate);

    this.shadowRoot.appendChild(this.theme.style);
    this.shadowRoot.appendChild(this.theme.el);
  }

  off(prev, next) {
    typeof next === 'string' ? this.frCounter.off() : this.frCounter.on();
  }

  static get observedAttributes() {return ['off'];}
}

customElements.define('frame-rate', FrameRate)

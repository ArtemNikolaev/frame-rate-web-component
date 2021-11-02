import styleEl from './style/style';
import generatePostLikeTheme from './themes/post-like';

class FrameRate extends HTMLElement {
  constructor() {
    super();
    this.isInactive = false;

    this.frameAmount = [];
    this.frameRate = 0;
    this.frameRateOld = 0;

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(styleEl);

    this.theme = generatePostLikeTheme(this.frameRate);

    this.render();
  }

  connectedCallback() {
    this.on();
  }

  counter() {
    if (this.isInactive) {
      this.frameAmount.splice(0);

      return;
    }

    this.frameAmount = this.frameAmount.filter( dt => dt > Date.now() - 1000);
    this.frameAmount.push(Date.now());

    const frameRate = this.frameAmount.length;

    if (frameRate !== this.frameRate) {
      this.frameRateOld = this.frameRate;
      this.frameRate = frameRate;

      this.render();
    }


    requestAnimationFrame(() => this.counter());
  }

  disconnectedCallback() {
    this.isInactive = true;
  }

  attributeChangedCallback(key, prev, next) {
    if (!this[key]) return 0;

    try {
      this[key](prev, next);
    } catch (e) { }
  }

  render() {
    this.theme.style.remove();
    this.theme.el.remove();

    this.theme = generatePostLikeTheme(this.frameRate);

    this.shadowRoot.appendChild(this.theme.style);
    this.shadowRoot.appendChild(this.theme.el);
  }

  on() {
    this.counter();
  }

  off(prev, next) {
    this.isInactive = typeof next === 'string';

    if (!this.isInactive) this.counter();
  }

  static get observedAttributes() {return ['off'];}
}

customElements.define('frame-rate', FrameRate)

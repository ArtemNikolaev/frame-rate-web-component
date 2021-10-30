class FrameRate extends HTMLElement {
  constructor() {
    super();
    this.frameRate = 144;

    const shadow = this.attachShadow({mode: 'open'});

    const div = document.createElement('div');
    div.innerText = this.frameRate;

    const style = document.createElement('style');
    style.textContent = `
      div {
        position: absolute;
        top: 0;
        right: 0;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(div);
  }
}

customElements.define('frame-rate', FrameRate)

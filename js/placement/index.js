import $ from 'jquery';

const ANIMATION_SPEED = 500;

let getCenterX = (element) => {
  let centerScreenX = window.innerWidth / 2;
  let width = element.width();
  let currentX = element.position().left;
  let centerX = centerScreenX - currentX - (width / 2);
  return centerX;
}
let getCenterY = (element) => {
  let centerScreenY = window.innerHeight / 2;
  let height = element.height();
  let currentY = element.position().top;
  let centerY = centerScreenY - currentY - (height / 2);
  return centerY;
}
let getCenter = (element) => {
  let x = getCenterX(element);
  let y = getCenterY(element);
  return {left: x, top: y};
}

class Placement {
  constructor(widget) {
    this.center = getCenter(widget.anchor);
  }

  template(source) {
    return `
    <div style="opacity: 0;" id="vr-viewer">
      <div style="position: fixed; z-index: 1000; top: 20px;" id="vr-close-button">Close</div>
      <a-scene>
        <a-assets>
          <img id="anchor" src="${source}">
        </a-assets>
  		  <a-sky src="#anchor" rotation="0 15 0"></a-sky>
  		</a-scene>
    </div>
    `;
  }

  remove(widget) {
    widget.anchor.css({
      transform: `translate(0, 0) scale(1)`,
    });
    $('#vr-viewer').animate({
      opacity: 0,
    }, ANIMATION_SPEED, () => {
      $('#vr-viewer').remove();
    })
  }

  renderTemplate(widget) {
    let template = this.template(widget.params.src);
    $(template).insertAfter(widget.anchor);
  }

  animateIn(widget) {
    let scale = widget.params.scale ?
                Math.max(Math.ceil(window.innerWidth / anchor.width()), Math.ceil(window.innerHeight / anchor.height())) :
                1;
    widget.anchor.css({
      transform: `translate(${this.center.left}px, ${this.center.top}px) scale(${scale})`,
      transition: `all ${ANIMATION_SPEED}ms`
    });

    setTimeout(() => {
      $('#vr-viewer').css({
        opacity: 1,
        transition: `opacity ${ANIMATION_SPEED + 300}ms`
      })
    }, (ANIMATION_SPEED / 2) );
  }

  render(widget) {
    console.info("[Placement] Render", widget);
    this.renderTemplate(widget);
    this.animateIn(widget);

    $('#vr-close-button').on('click', () => {
      this.remove(widget);
    });
    $(document).keyup((e) => {
      if (e.keyCode === 27) {
        this.remove(widget);
      }
    });
  }
}

export default Placement;

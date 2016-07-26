import $ from 'jquery';
import aframe from 'aframe';

const ANIMATION_SPEED = 500;

function getCenter(element) {
  var centerScreenX = window.innerWidth / 2;
  var width = element.width();
  var currentX = element.position().left;
  var centerX = centerScreenX - currentX - (width / 2);

  var centerScreenY = window.innerHeight / 2;
  var height = element.height();
  var currentY = element.position().top;
  var centerY = centerScreenY - currentY - (height / 2);
  return {left: centerX, top: centerY};
}

class Story {
  constructor(params = {}) {
    this.params = window.vrStoryParams;
    this.anchor = $(this.params.anchor);
    this.src = this.params.src;
  }
  initEvents() {
    $(this.anchor).on('click', () => {
      this.render();
    })
  }
  template() {
    return `
    <div style="opacity: 0;" id="vr-viewer">
      <div style="position: fixed; z-index: 1000; top: 20px;" id="vr-close-button">Close</div>
      <a-scene>
        <a-assets>
          <img id="anchor" src="${this.src}">
        </a-assets>
  		  <a-sky src="#anchor" rotation="0 15 0"></a-sky>
  		</a-scene>
    </div>
    `;
  }
  render() {
    var anchor = $(this.anchor)
    var center = getCenter(anchor);
    var scale = Math.max(Math.ceil(window.innerWidth / anchor.width()), Math.ceil(window.innerHeight / anchor.height()));
    anchor.css({
      transform: `translate(${center.left}px, ${center.top}px) scale(${scale})`,
      filter: 'blur(1px)',
      webkitFilter: 'blur(1px)',
      transition: `transform ${ANIMATION_SPEED}ms`
    });
    let template = this.template();
    $(template).insertAfter(this.anchor);

    $('#vr-close-button').on('click', () => {
      $('#vr-viewer').css({
        opacity: 0,
        transition: `opacity ${ANIMATION_SPEED}ms`
      })
      anchor.css({
        transform: `translate(0, 0) scale(1)`,
        filter: 'blur(0)',
        webkitFilter: 'blur(0)'
      });
      setTimeout(() => {
        $('#vr-viewer').remove();
      }, ANIMATION_SPEED);
    })

    setTimeout(() => {
      $('#vr-viewer').css({
        opacity: 1,
        transition: `opacity ${ANIMATION_SPEED + 300}ms`
      })
    }, 300);
  }
}

var story = new Story(window.vrStoryParams);
story.initEvents();

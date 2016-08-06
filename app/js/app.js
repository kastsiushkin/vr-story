import aframe from 'aframe';
import $ from 'jquery';
import Placement from './placement'

const ANIMATION_SPEED = 500;

class Story {
  constructor(params = {}) {
    this.params = window.vrStoryParams;
    this.anchor = $(this.params.anchor);
  }

  initEvents() {
    $(this.anchor).on('click', () => {
      this.init();
    })
  }

  init() {
    let placement = new Placement(this);
    placement.render(this);
  }
}

var story = new Story(window.vrStoryParams);
story.initEvents();

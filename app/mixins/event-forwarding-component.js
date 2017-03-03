import Ember from 'ember';

const {
  Mixin
} = Ember;

function forwardAction() {
  this.sendAction();
}

/**
 * Forwards ember actions in a component.
 * See https://guides.emberjs.com/v2.11.0/components/handling-events/
 */
export default Mixin.create({
  touchStart: forwardAction,
  touchMove: forwardAction,
  touchEnd: forwardAction,
  touchCancel: forwardAction,

  keyDown: forwardAction,
  keyUp: forwardAction,
  keyPress: forwardAction,

  mouseDown: forwardAction,
  mouseUp: forwardAction,
  contextMenu: forwardAction,
  click: forwardAction,
  doubleClick: forwardAction,
  mouseMove: forwardAction,
  focusIn: forwardAction,
  focusOut: forwardAction,
  mouseEnter: forwardAction,
  mouseLeave: forwardAction,

  submit: forwardAction,
  change: forwardAction,
  // focusIn: forwardAction,
  // focusOut: forwardAction,
  input: forwardAction,

  dragStart: forwardAction,
  drag: forwardAction,
  dragEnter: forwardAction,
  dragLeave: forwardAction,
  dragOver: forwardAction,
  dragEnd: forwardAction,
  drop: forwardAction,
});
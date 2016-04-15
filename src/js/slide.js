/**
 * @badeggg
 * 2016.3.7 start coding
 * 控制拖动
 */
define(function () {
  var slide = function () {
    var dragElements = [];
    var triggerDragElement = document.getElementById('vernier1');
    dragElements.push(document.getElementById('deep'));
    dragElements.push(document.getElementById('vernier2'));
    dragElements.push(document.getElementById('vernier1'));
    triggerDragElement.addEventListener('mousedown', startDrag, false);
    document.addEventListener('mouseleave', endDrag, false);

    var mouseStartX = 0;
    var lastX = 0;
    var dragingFlag = false;
    function startDrag(event) {
      event.stopPropagation();
      event.preventDefault();
      dragingFlag = true;
      mouseStartX = event.pageX;
      triggerDragElement.style.cursor = 'url(src/img/hand4.png), ew-resize';
      document.addEventListener('mousemove', draging, false);
      document.addEventListener('mouseup', endDrag, false);
    }
    var draging = (function(){
      var lastLeft = -1;
      return function (event) {
        var tmp = event.pageX - mouseStartX + lastX;
        tmp < 0 && (tmp = 0);
        tmp > 726 && (tmp = 726);
        if(lastLeft !== tmp){
          lastLeft = tmp;
          dragElements.forEach(function (elem) {
            elem.style.left = tmp + 'px';
          });
          slide.slideEventTarget.dispatchEvent( new CustomEvent('slide', {detail: tmp}) );
        }
      }
    }());
    function endDrag(event) {
      if (!dragingFlag) {
        return;
      }
      dragingFlag = false;
      lastX = parseInt(dragElements[0].style.left);
      triggerDragElement.style.cursor = 'url(src/img/hand3.png), ew-resize';
      document.removeEventListener('mousemove', draging, false);
      document.removeEventListener('mouseup', endDrag, false);
    }
  };
  slide.slideEventTarget = document.createElement('div'); //其他模块可利用此属性绑定事件
  return slide;
});

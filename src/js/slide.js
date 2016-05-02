/**
 * @badeggg
 * 2016.3.7 start coding
 * 控制拖动
 */
define(function () {
  var slide = function(){
    slide.mainSlideSystem();
  };
  var dragElements = [];
  dragElements.push(document.getElementById('deep'));
  dragElements.push(document.getElementById('vernier2'));
  dragElements.push(document.getElementById('vernier1'));
  
  var lastX = 0;
  var MIN_SIZE = 0;              //实际上最小值
  var MAX_SIZE = 726;            
  var minSize = MIN_SIZE;        //允许其他模块设置的，希望它的最小值
  var maxSize = MAX_SIZE;
  
  //mainSlideSystem处理拖动游标尺的相关动作
  slide.mainSlideSystem = function () {
    var triggerDragElement = document.getElementById('vernier1');
    triggerDragElement.addEventListener('mousedown', startDrag, false);
    document.addEventListener('mouseleave', endDrag, false);

    var mouseStartX = 0;
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
        tmp < minSize && (tmp = minSize);
        tmp > maxSize && (tmp = maxSize);
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
  
  slide.setSize = function(size){
    if(typeof size === 'string' && size.indexOf('>=') >= 0){
      size = parseInt( size.slice(2) );
      if( parseFloat( dragElements[0].style.left ) < size && size >= minSize && size <= maxSize){
        set();
      }
    }else if(typeof size === 'number' && size >= minSize && size <= maxSize){
      set();
    }
    function set(){
      dragElements.forEach(function (elem) {
        elem.style.left = size + 'px';
      });
      slide.slideEventTarget.dispatchEvent( new CustomEvent('slide', {detail: size}) );
      lastX = size;
    }
  };
  
  slide.setMinSize = function(size){
    if(size >= MIN_SIZE && size <= MAX_SIZE){
      minSize = size;
    }
  }
  
  return slide;
});

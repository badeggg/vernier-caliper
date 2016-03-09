/**
* @badeggg
* 2016.3.7 start coding
* 控制拖动
*/
define(function(){
  return function(){
    var dragElements = [];
    var triggerDragElement = document.getElementById('vernier1');
    dragElements.push( document.getElementById('deep') );
    dragElements.push( document.getElementById('vernier2') );
    dragElements.push( document.getElementById('vernier1') );
    triggerDragElement.addEventListener('mousedown', startDrag, false);
    triggerDragElement.addEventListener('mouseleave', endDrag, false);
    
    var mouseStartX = 0;
    var lastX = 0;
    var dragingFlag = false;
    function startDrag(event){
      event.stopPropagation();
      event.preventDefault();
      dragingFlag = true;
      mouseStartX = event.pageX;
      triggerDragElement.style.cursor = '-webkit-grabbing';
      triggerDragElement.addEventListener('mousemove', draging, false);
      triggerDragElement.addEventListener('mouseup', endDrag, false);
    }
    function draging(event){
      var tmp = event.pageX - mouseStartX + lastX;
      tmp < 0 && (tmp = 0);
      tmp > 500 && (tmp = 500);
      dragElements.forEach(function(elem){
        elem.style.left = tmp + 'px';
      });
    }
    function endDrag(event){
      if( !dragingFlag ){
        return;
      }
      dragingFlag = false;
      lastX = parseInt(dragElements[0].style.left);
      triggerDragElement.style.cursor = '-webkit-grab';
      triggerDragElement.removeEventListener('mousemove', draging, false);
      triggerDragElement.removeEventListener('mouseup', endDrag, false);
    }
  };
});
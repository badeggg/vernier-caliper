/**
* @badeggg
* 2016.3.7 start
* 放大镜
*/
define(function(){
  var magnifier = document.getElementById('magnifier');
  var dragingFlag = false;
  var mouseStartX = 0;
  var mouseStartY = 0;
  var lastX = parseInt( magnifier.style.left );
  var lastY = parseInt( magnifier.style.top );
  function startDrag(event){
    event.stopPropagation();
    event.preventDefault();
    dragingFlag = true;
    mouseStartX = event.pageX;
    mouseStartY = event.pageY;
    magnifier.addEventListener('mousemove', draging, false);
    magnifier.addEventListener('mouseup', endDrag, false);
  }
  function draging(event){
    var tmpX = event.pageX - mouseStartX + lastX;
    var tmpY = event.pageY - mouseStartY + lastY;
    magnifier.style.left = tmpX + 'px';
    magnifier.style.top = tmpY + 'px';
    drawCanvas(tmpX, tmpY); //参数是放大镜的左上角坐标（其left,top值）
  }
  function endDrag(event){
    if( !dragingFlag ){
      return;
    }
    dragingFlag = false;
    lastX = parseInt( magnifier.style.left );
    lastY = parseInt( magnifier.style.top );
    magnifier.removeEventListener('mousemove', draging, false);
    magnifier.removeEventListener('mouseup', endDrag, false);
  }
  
  var magnifierWidth = 150;  //放大镜的大小，canvas的大小，唯一的值，不再变化
  var canvas = document.getElementById('canvas');
  canvas.setAttribute('width', magnifierWidth);
  canvas.setAttribute('height', magnifierWidth);
  
  var drawCanvas = (function(){
    var img1 = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var img4 = new Image();
    img1.src = 'src/img/deep.png';
    img2.src = 'src/img/vernier2.png';
    img3.src = 'src/img/main.png';
    img4.src = 'src/img/vernier1.png';
    var imgReadyList = [];
    imgReadyList.length = 4;
    function imgReadyListChange(n, img){
      img.style.display = 'none';
      imgReadyList[n - 1] = img;
    }
    img1.onload = imgReadyListChange(1, img1);
    img2.onload = imgReadyListChange(2, img2);
    img3.onload = imgReadyListChange(3, img3);
    img4.onload = imgReadyListChange(4, img4);
    var ctx = canvas.getContext('2d');
    var halfMagnifierWidth = magnifierWidth / 2;
    var ratio = img1.width / document.getElementById('container').getBoundingClientRect().width;
    return function(x, y){
      ctx.clearRect(0, 0, magnifierWidth, magnifierWidth);
      ctx.arc(halfMagnifierWidth, halfMagnifierWidth, halfMagnifierWidth, 0, 2*Math.PI, false);
      ctx.clip();
      x = (x + halfMagnifierWidth) * ratio - halfMagnifierWidth;
      y = (y + halfMagnifierWidth) * ratio - halfMagnifierWidth;
      for(var i = 0; i < imgReadyList.length; i++){
        imgReadyList[i] && ctx.drawImage(imgReadyList[i], x, y, magnifierWidth, magnifierWidth, 0, 0, magnifierWidth, magnifierWidth);
      }
    };
  }());
  
  return function(){
    magnifier.addEventListener('mousedown', startDrag, false);
    magnifier.addEventListener('mouseleave', endDrag, false);
  };
});

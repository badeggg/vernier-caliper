/**
 * @badeggg
 * 2016.3.7 start
 * 放大镜
 */
define(['slide'], function(slide) {
  var magnifier = document.getElementById('magnifier');
  var dragingFlag = false;
  var mouseStartX = 0;
  var mouseStartY = 0;
  var lastX = parseInt(magnifier.style.left);
  var lastY = parseInt(magnifier.style.top);
  var slideLeft = parseInt(document.getElementById('deep').style.left); //游标尺滑了多远
  var ratio = 2000 / document.getElementById('main-container').getBoundingClientRect().width; //2000是图片的宽度@todo
  var slideMultiRatio = slideLeft*ratio;
  function startDrag(event) {
    event.stopPropagation();
    event.preventDefault();
    dragingFlag = true;
    mouseStartX = event.pageX;
    mouseStartY = event.pageY;
    slideLeft = parseInt(document.getElementById('deep').style.left);
    slideMultiRatio = slideLeft*ratio;
    document.addEventListener('mousemove', draging, false);
    document.addEventListener('mouseup', endDrag, false);
    magnifier.style.cursor = "url('src/img/hand2.png'), move";
  }
  function draging(event) {
    var tmpX = event.pageX - mouseStartX + lastX;
    var tmpY = event.pageY - mouseStartY + lastY;
    magnifier.style.left = tmpX + 'px';
    magnifier.style.top = tmpY + 'px';
    drawCanvas(tmpX, tmpY); //参数是放大镜的左上角坐标（其left,top值）
  }
  function endDrag(event) {
    if (!dragingFlag) {
      return;
    }
    dragingFlag = false;
    lastX = parseInt(magnifier.style.left);
    lastY = parseInt(magnifier.style.top);
    document.removeEventListener('mousemove', draging, false);
    document.removeEventListener('mouseup', endDrag, false);
    magnifier.style.cursor = "url('src/img/hand1.png'), move";
  }

  slide.slideEventTarget.addEventListener('slide', function(event){
    slideLeft = parseInt(document.getElementById('deep').style.left);
    slideMultiRatio = slideLeft*ratio;
    drawCanvas(lastX, lastY);
  }, false);
  
  var magnifierWidth = 150; //放大镜的大小，canvas的大小，唯一的值，不再变化
  var canvas = document.getElementById('canvas');
  canvas.setAttribute('width', magnifierWidth);
  canvas.setAttribute('height', magnifierWidth);

  var drawCanvas = (function () {
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
    function imgReadyListChange(n, img) {
      img.style.display = 'none';
      imgReadyList[n - 1] = img;
    }
    var ctx = canvas.getContext('2d');
    var halfMagnifierWidth = magnifierWidth / 2;
    ctx.arc(halfMagnifierWidth, halfMagnifierWidth, halfMagnifierWidth, 0, 2 * Math.PI, false);
    ctx.clip();
    img1.onload = imgReadyListChange(1, img1);
    img2.onload = imgReadyListChange(2, img2);
    img3.onload = imgReadyListChange(3, img3);
    img4.onload = imgReadyListChange(4, img4);
    function ret(x, y) {
      ctx.clearRect(0, 0, magnifierWidth, magnifierWidth);
      x = Math.round( (x + halfMagnifierWidth) * ratio - halfMagnifierWidth );
      y = Math.round( (y + halfMagnifierWidth) * ratio - halfMagnifierWidth );
      var xMove = Math.round(x - slideMultiRatio);
      if(imgReadyList[0] && imgReadyList[1] && imgReadyList[2] && imgReadyList[3]){
        ctx.drawImage(imgReadyList[0], xMove, y, magnifierWidth, magnifierWidth, 0, 0, magnifierWidth, magnifierWidth);
        ctx.drawImage(imgReadyList[1], xMove, y, magnifierWidth, magnifierWidth, 0, 0, magnifierWidth, magnifierWidth);
        ctx.drawImage(imgReadyList[2], x, y, magnifierWidth, magnifierWidth, 0, 0, magnifierWidth, magnifierWidth);
        ctx.drawImage(imgReadyList[3], xMove, y, magnifierWidth, magnifierWidth, 0, 0, magnifierWidth, magnifierWidth);
      }
    }
    return ret;
  }());

  return function () {
    drawCanvas(lastX, lastY);
    setTimeout(drawCanvas, 500, lastX, lastY);
    magnifier.addEventListener('mousedown', startDrag, false);
    document.addEventListener('mouseleave', endDrag, false);
  };
});

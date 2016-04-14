/**
 * @badeggg
 * 2016.3.12 start
 * 计算、显示结果
 */
define(['slide'], function(slide){
  var resultNum = document.querySelector('#result>.num');
  var resultModel = document.getElementById('resultModel');
  var resultEle = document.getElementById('result');
  var model = 0; //0: always show, 1: mouseover show
  var result = function(){
    slide.slideEventTarget.addEventListener('slide', function(event){
      resultNum.textContent = (event.detail/6).toFixed(1);
    }, false);
    
    //交互好一点
    function mouseoverShow(){
      this.style.backgroundColor = '#5D5D58';
    }
    function mouseoutHide(){
      this.style.backgroundColor = 'gold';
    }
    function changeToMouseoverShow(){
      model = 1;
      resultEle.style.backgroundColor = 'gold';
      resultModel.style.backgroundColor = '#5D5D58';
      resultEle.addEventListener('mouseover', mouseoverShow, false);
      resultEle.addEventListener('mouseout', mouseoutHide, false);
      resultEle.style.cursor = 'pointer';
      resultEle.addEventListener('click', changeToAlwaysShow, false);
    }
    function changeToAlwaysShow(){
      model = 0;
      resultEle.style.backgroundColor = '#5D5D58';
      resultModel.style.backgroundColor = 'gold';
      resultEle.removeEventListener('mouseover', mouseoverShow, false);
      resultEle.removeEventListener('mouseout', mouseoutHide, false);
      resultEle.style.cursor = 'default';
      resultEle.removeEventListener('click', changeToMouseoverShow, false);
    }
    resultModel.addEventListener('click', function(){
      if(model === 0){
        changeToMouseoverShow();
      }else{
        changeToAlwaysShow();
      }
    }, false);
  };
  return result;
});

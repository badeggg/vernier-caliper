/**
 * @badeggg
 * 2016.3.12 start
 * 计算、显示结果
 */
define(['slide'], function(slide){
  var result = function(){
    slide.slideEventTarget.addEventListener('slide', function(event){
      document.getElementById('result').textContent = event.detail + ',' + (event.detail/6).toFixed(1);
    }, false);
  };
  result.love = '侯牧云';
  return result;
});

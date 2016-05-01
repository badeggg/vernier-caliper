/**
 * @badeggg
 * 2016.5.1 start coding
 * 开始
 */
//火狐太他妈的变态，所有元素都是droppable的，而且drop了之后，会新打开一个标签搜索你drag的元素（以dataTransfer.setData为关键词），如果是图片直接打开图片
define(function(){
  var measure = function(){
    measure.setDragSystem();
  };
  measure.setDragSystem = function(){
    var stuffConElems = {};
    stuffConElems.measure120 = document.querySelector('#measure>div>div[stuffCon]:nth-child(1)');
    stuffConElems.measure123 = document.querySelector('#measure>div>div[stuffCon]:nth-child(2)');
    stuffConElems.measure111 = document.querySelector('#measure>div>div[stuffCon]:nth-child(3)');
    
    var stuffElems = {};
    stuffElems.measure120 = document.getElementById('measure120');
    stuffElems.measure123 = document.getElementById('measure123');
    stuffElems.measure111 = document.getElementById('measure111');
    
    var measureBoxElem = document.getElementById('measure-box');
    
    Object.keys(stuffConElems).forEach(function(name){
      var elem = stuffConElems[name];
      elem.addEventListener('dragover', function(event){
        if(event.dataTransfer.getData('text') === name){
          evPreDefStopPro(event);
        }
      }, false);
      elem.addEventListener('drop', function(event){
        append( elem, stuffElems[event.dataTransfer.getData('text')] );
      }, false);
    });
    
    measureBoxElem.addEventListener('dragover', function(event){
      if(event.dataTransfer.getData('text').indexOf('measure') >= 0){
        evPreDefStopPro(event);
      }
    }, false);
    measureBoxElem.addEventListener('drop', function(event){
      if(this.children.length > 0){
        append( stuffConElems[ this.children[0].id ], this.children[0] );
      }
      append( this, stuffElems[event.dataTransfer.getData('text')] );
    }, false);
    
    Object.keys(stuffElems).forEach(function(name){
      var elem = stuffElems[name];
      elem.addEventListener('dragstart', function(event){
        event.dataTransfer.setData('text', name);
      });
    });
    
    //你麻痹火狐，不让火狐重新打开标签
    document.addEventListener('dragover', function(event){
      evPreDefStopPro(event);
    });
    document.addEventListener('dragend', function(event){
      evPreDefStopPro(event);
    });
    document.addEventListener('drop', function(event){
      evPreDefStopPro(event);
    });
    
    function evPreDefStopPro(event){
      event.preventDefault();
      event.stopPropagation();
    }
    function append(parent, child){
      parent.appendChild(child);
    }
  };
  return measure;
});

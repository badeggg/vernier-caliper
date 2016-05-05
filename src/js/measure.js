/**
 * @badeggg
 * 2016.5.1 start coding
 * 开始
 */
//火狐太他妈的变态，所有元素都是droppable的，而且drop了之后，会新打开一个标签搜索你drag的元素（以dataTransfer.setData为关键词），如果是图片直接打开图片
//html5的drag&drop好变态啊，还没有搞清楚它是怎么设计的，有时间再看一下
define(['slide', 'magnifier'], function(slide, magnifier){
  var measure = function(){
    measure.setDragSystem();
  };
  measure.db = {
    stuffAtMeasureId: '',
    answerOfStuffAtMeasure: 0
  };
  window.db = measure.db;/////////////////////////////
  measure.setDragSystem = function(){
    var dndStyleChange = {
      stuffConElemToAccept: 'outline: 1px dashed black;',
      measureBoxElemToAccept: 'outline: 1px dashed black;',
    };
    var stuffAnswerTitle = "测量时，鼠标悬停可见。可用于验证你的读数是否正确";
    
    var stuffConElems = {};
    stuffConElems.measure120 = document.querySelector('#measure>div>div[stuffCon]:nth-child(1)');
    stuffConElems.measure123 = document.querySelector('#measure>div>div[stuffCon]:nth-child(2)');
    stuffConElems.measure112 = document.querySelector('#measure>div>div[stuffCon]:nth-child(3)');
    
    var stuffElems = {};
    stuffElems.measure120 = document.getElementById('measure120');
    stuffElems.measure123 = document.getElementById('measure123');
    stuffElems.measure112 = document.getElementById('measure112');
    
    var stuffAnswerElems = {};
    stuffAnswerElems.measure120 = document.querySelector('#measure span[answer="120"]');
    stuffAnswerElems.measure123 = document.querySelector('#measure span[answer="123"]');
    stuffAnswerElems.measure112 = document.querySelector('#measure span[answer="112"]');
    
    var measureBoxElem = document.getElementById('measure-box');
    
    Object.keys(stuffConElems).forEach(function(name){
      var elem = stuffConElems[name];
      elem.addEventListener('dragover', function(event){
        if(event.dataTransfer.getData('text') === name){
          evPreDefStopPro(event);
        }
      }, false);
      elem.addEventListener('drop', function(event){
        var stuffName = event.dataTransfer.getData('text');
        //如果不是在拖动那几个“零件”
        if( !stuffElems[stuffName] ){
          return;
        }
        
        (name === stuffName) && append( elem, stuffElems[stuffName] );
        elem.style = '';
      }, false);
    });
    
    measureBoxElem.addEventListener('dragover', function(event){
      if(event.dataTransfer.getData('text').indexOf('measure') >= 0){
        evPreDefStopPro(event);
      }
    }, false);
    measureBoxElem.addEventListener('drop', function(event){
      var stuffName = event.dataTransfer.getData('text');
      //如果不是在拖动那几个“零件”
      if( !stuffElems[stuffName] ){
        return;
      }
      
      if(this.children.length > 0){
        this.children[0].dispatchEvent( new CustomEvent('dragend') );//这样的移动仍然视为一次拖放
        append( stuffConElems[ this.children[0].id ], this.children[0] );
      }
      append( this, stuffElems[stuffName] );
      measureBoxElem.style = '';
    }, false);
    
    Object.keys(stuffElems).forEach(function(name){
      var elem = stuffElems[name];
      elem.addEventListener('dragstart', function(event){
        event.dataTransfer.setData('text', name);
        slide.setSize('>=101');
        if(name === measure.db.stuffAtMeasureId){
          stuffConElems[name].style = dndStyleChange.stuffConElemToAccept;
        }else{
          measureBoxElem.style = dndStyleChange.measureBoxElemToAccept;
        }
      });
      elem.addEventListener('dragend', function(event){
        if( measureBoxElem.children[0] ){
          measure.db.stuffAtMeasureId = measureBoxElem.children[0].id;
          measure.db.answerOfStuffAtMeasure = parseInt( measureBoxElem.children[0].id.slice(-3) );
          magnifier.setMeasureStuff( measureBoxElem.children[0].id );
          slide.setMinSize( Math.round( parseInt(measureBoxElem.children[0].id.slice(-3)) * 0.6 ) );
        } else{
          measure.db.stuffAtMeasureId = '';
          measure.db.answerOfStuffAtMeasure = 0;
          magnifier.setMeasureStuff('');
          slide.setMinSize(0);
        }
        
        if(name === measure.db.stuffAtMeasureId){
          stuffConElems[name].style = '';
          
          stuffAnswerElems[name].setAttribute('show', 'true');
          stuffAnswerElems[name].setAttribute('title', '');
        }else{
          measureBoxElem.style = '';
          
          stuffAnswerElems[name].setAttribute('show', 'false');
          stuffAnswerElems[name].setAttribute('title', stuffAnswerTitle);
        }
      }, false);
    });
    
    Object.keys(stuffAnswerElems).forEach(function(name){
      stuffAnswerElems[name].setAttribute('title', stuffAnswerTitle);
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

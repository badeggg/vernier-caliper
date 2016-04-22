/**
 * @badeggg
 * 2016.4.21 start coding
 * 开始
 */
define(function(){
  var teach = function(){
    teach.animation();
    teach.insertHTML();
  };
  teach.insertHTML = function(){
    var insertHTMLString = "<blockquote><h3>如何使用本课件</h3><ul><li><p>游标卡尺的读数显示在页面右上角----读数显示区域</p></li><li><p>鼠标拖动副尺子，游标卡尺的读数会随着变化</p></li><li><p>鼠标拖动“放大镜”可以看到清晰的刻度</p></li><li><p>点击读数显示区域右上角的小圆点，读数将隐藏，只有在鼠标停留在读数显示区域时，才能看见读数。可以借此来练习</p></li><li><p>再次点击读数显示区域或者小圆点，读数将显示</p></li></ul><hr/><h3>游标卡尺的什么？</h3><blockquote><p>游标卡尺，又称为游标尺子或直游标尺子，是一种测量长度的仪器。由主尺子和附在主尺子上能滑动的游标两部分构成。主尺子一般以毫米为单位。根据分格的不同，游标卡尺可分为十分度游标卡尺、二十分度游标卡尺、五十分度格游标卡尺等。本课件中的游标卡尺是一个十分度游标卡尺。</p></blockquote><h3>各个部件的名称</h3><p><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Vernier_caliper.svg/500px-Vernier_caliper.svg.png'alt='游标卡尺样图'title=''width=100%/></p><ul><li>1.外测量爪</li><li>2.内测量爪</li><li>3.深度杆</li><li>4.主尺子(cm)</li><li>5.主尺子(in)</li><li>6.副尺子（cm）</li><li>7.副尺子（in）</li><li>8.推扣</li></ul><h3>原理：</h3><blockquote><p>以本课件中的游标卡尺为例。主尺子上的29mm（29个最小格）对应副尺子上的10个格，那么副尺子上每个格的长度为：29/10=2.9mm。当主、副尺子上的零刻度线对齐时，副尺子上的'1'刻度线在主尺子上的3mm刻度线左侧0.1mm处，副尺子上的'2'刻度线在主尺子上的6mm刻度线左侧0.2mm处，副尺子上的'3'刻度线......那么当副尺子向右移动0.1mm的时候（此时内外测量爪的间距也增大了1mm），副尺子上的'1'刻度线与主尺子的3mm刻度线对齐；当副尺子向右移动0.2mm的时候,副尺子上的'2'刻度线与主尺子上的6mm刻度线对齐......</p><p>因此游标卡尺可以测量0.1mm, 0.2mm, 0.3mm, 0.4mm... 0.9mm</p><p>以此为基础推广一下：当副尺子上的零刻度线与主尺子上的任意一条刻度线对齐后（比如与24mm对齐），再把副尺子向右移动0.x mm（比如0.7mm）,此时副尺子上的7刻度线与主尺子上的某一条刻度线对齐（可以算一下，是45mm），尺子读数为主尺子上的刻度值（精确度为1mm）+副尺子与主尺子的刻度线重叠的刻度值（精确度为0.1mm），例子为:24mm+0.7mm=24.7mm。</p><p>这样的尺子的精确度为0.1mm.</p><p>如果把副尺子上的10格改成20格（10格的总距离和20格的总距离一样），精确度会怎样变化？</p><blockquote><p>|-->精确度将变为0.05mm.可以套用上面的讲解思考。</p></blockquote><p>精确度是0.02mm的游标卡尺是怎样的？</p><blockquote><p>|-->副尺子上有50小格，每一个小格的长度比整数毫米小0.02mm</p></blockquote><p>如果副尺子上有十个均匀的小格，十个小格的总长度为8mm，这样的游标卡尺能不能用？</p><blockquote><p>|-->不能。思考之</p></blockquote></blockquote><h3>读数</h3><ul><li>1.先读主尺子的刻度值，精密度为 1 毫米，副尺子位于 24 与 25 之间，所以主尺子刻度为 24 毫米。</li><li>2.再看副尺子与主尺子的刻度线重叠的刻度，精密度为 0.1 毫米，附尺子 7 与主尺子重叠，所以副尺子刻度为 0.7 毫米。</li><li>3.将主尺子与副尺子数值相加上面刻度代表 24.7 毫米。</li></ul></blockquote><p><img src='https://upload.wikimedia.org/wikipedia/commons/f/f6/Using_the_caliper_new.gif'alt='游标卡尺读数'title=''width=100%/></p>";
    var insertedHTMLContainer = document.createElement('div');
    insertedHTMLContainer.setAttribute('id', 'inserted-HTML-container');
    document.getElementById('teach').appendChild( insertedHTMLContainer );
    insertedHTMLContainer.innerHTML = insertHTMLString;
    var tmp = insertedHTMLContainer.querySelectorAll('img');
    tmp[0].src = 'src/img/500px-Vernier_caliper.svg.png';
    tmp[1].src = 'src/img/Using_the_caliper_new.gif';
  };
  teach.animation = function(){
    var buttonAnimationStyle = 'background-color: gold; right: 2px;',
        hr1AnimationStyle = 'transform: none;',
        hr2AnimationStyle = 'background-color: #6B5C0B;',
        hr3AnimationStyle = 'transform: none;',
        teachAnimationStyle = 'right: -500px; box-shadow: none;';
        resultConAnimationStyle = 'transform: none;';
    
    var buttonElem = document.getElementById('teach-button'),
        hrElems = buttonElem.querySelectorAll('hr'),
        hr1Elem = hrElems[0],
        hr2Elem = hrElems[1],
        hr3Elem = hrElems[2],
        teachElem = document.getElementById('teach'),
        resultConElem = document.querySelector('#result-container>div');
    
    buttonElem.addEventListener('click', function(){
      var flag = 'out';
      return function(){
        if(flag === 'out'){
          buttonElem.setAttribute('style', buttonAnimationStyle);
          hr1Elem.setAttribute('style', hr1AnimationStyle);
          hr2Elem.setAttribute('style', hr2AnimationStyle);
          hr3Elem.setAttribute('style', hr3AnimationStyle);
          teachElem.setAttribute('style', teachAnimationStyle);
          resultConElem.setAttribute('style', resultConAnimationStyle);
          flag = 'in';
        } else{
          buttonElem.setAttribute('style', '');
          hr1Elem.setAttribute('style', '');
          hr2Elem.setAttribute('style', '');
          hr3Elem.setAttribute('style', '');
          teachElem.setAttribute('style', '');
          resultConElem.setAttribute('style', '');
          flag = 'out';
        }
      };
    }(), false);
    
  };
  return teach;
});

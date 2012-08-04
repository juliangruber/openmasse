(function() {
  'use strict';

  var help = document.createElement('div');
  help.id = 'openmasseHelp';
  help.innerHTML = ['Drag a box over the set of links you wish to open', 
    ' (press ESC to abort).'].join('');  
  help.style.backgroundColor = 'lightgrey';
  help.style.position = 'fixed';
  help.style.top = 0;
  help.style.left = 0;
  help.style.width = '200px';
  help.onmouseover = function(e) {
    var style = e.target.style
    if (style.left === '0px') {
      style.left = 'auto';
      style.right = 0;
    } else {
      style.left = 0;
      style.right = 'auto';
    }
  }
  document.body.appendChild(help);
  
  var box = document.createElement('div');
  box.id = 'openmasseBox';
  box.style.backgroundColor = 'grey';
  box.style.opacity = 0.5;
  box.style.position = 'absolute';
  
  var from;

  var onMouseDown = function(e) {
    e.preventDefault();
    from = {x: e.pageX, y: e.pageY};
    
    // TODO: update link count
    box.style.top = e.pageX;
    box.style.left = e.pageY;
    box.style.width = 0;
    box.style.height = 0;
    document.body.appendChild(box);
    
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onclick = function(e) {e.preventDefault();};
  };
  document.onmousedown = onMouseDown;
  
  var onMouseMove = function(e) {
    box.style.top = ((e.pageY >= from.y)? from.y : e.pageY)+'px';
    box.style.left = ((e.pageX >= from.x)? from.x : e.pageX)+'px';
    box.style.width = ((e.pageX - from.x) * ((e.pageX >= from.x)? 1 : -1))+'px';
    box.style.height = ((e.pageY - from.y) * ((e.pageY >= from.y)? 1 : -1))+'px';
  };
  
  var onMouseUp = function(e) {
    e.preventDefault();
    // stop updating the box
    document.onmousemove = null;
    // remove box from dom
    box.parentNode.removeChild(box);
    // aggregate links
    var urls = [];
    var links = document.getElementsByTagName('a');
    for (var i = 0, length = links.length; i < length; i++) {
      var left = 0;
      var top = 0;
      // Find Offset
      var el = links[i];
      do {
        left += el.offsetLeft;
        top += el.offsetTop;
      } while (el = el.offsetParent);
      // Hit detection
      var fromLeft = from.x <= left+links[i].offsetWidth && e.pageX >= left;
      var fromRight = from.x >= left && e.pageX <= left+links[i].offsetWidth;
      var fromBelow = from.y <= top+links[i].offsetHeight && e.pageY >= top;
      var fromAbove = from.y >= top && e.pageY <= top+links[i].offsetHeight;
      var isNew = urls.indexOf(links[i].href) == -1;
      if ((fromLeft || fromRight) && (fromBelow || fromAbove) && isNew) {
        urls.push(links[i].href);
      }
    }
    // open links
    for (var i = 0; i < urls.length; i++) window.open(urls[i]);
  };
  
  document.onkeydown = function(e) {
    if (e.keyCode === 27) {
      // Tidy up
      document.onmousedown = null;
      document.onmouseup = null;
      document.onclick = null;
      document.onmousemove = null;
      help.parentNode.removeChild(help);
      box.parentNode.removeChild(box);
    }
  };
})();
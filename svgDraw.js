function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight
    };
  }

  function drawPath(svg, path, start, end) {
  
    // get the path's stroke width (if one wanted to be  really precise, one could use half the stroke size)
    var style = getComputedStyle(path)
    var stroke = parseFloat(style.strokeWidth);
    
  
    var deltaX = (end.x - start.x) * 0.15;
    var deltaY = (end.y - start.y) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta = Math.min(Math.abs(deltaX), Math.abs(deltaY));
    var xSign = Math.sign(deltaX);
    var ySign = Math.sign(deltaY);
  
    // set sweep-flag (counter/clock-wise)
    // If xSign and ySign are opposite, then the first turn is clockwise
    var arc1 = (xSign !== ySign) ? 1 : 0;
    var arc2 = 1 - arc1;
  
    // draw tha pipe-like path
    // 1. move a bit vertically, 2. arc,  3. move a bit to the horizontally, 4.arc, 5. move vertically to the end 
    path.setAttribute("d", ["M", start.x, start.y,
                            "V", start.y + delta * ySign,
                            "A", delta, delta, 0, 0, arc1, start.x + delta * xSign, start.y + 2 * delta * ySign,
                            "H", end.x - delta * xSign,
                            "A", delta, delta, 0, 0, arc2, end.x, start.y + 3 * delta * ySign,
                            "V", end.y * ySign].join(" "));
  }

function connectElements(svg, path, startElem, endElem) {
    var svgContainer = document.querySelector("#svgContainer");

    var startRect = getOffset(startElem),
        endRect = getOffset(endElem),
        pathStartX = startRect.left + startRect.width / 2,
        pathEndX = endRect.left + endRect.width / 2,
        startElemBottom = startRect.top + startRect.height,
        svgTop = Math.min(startElemBottom, endRect.top + endRect.height),
        svgBottom = Math.max(startRect.top, endRect.top),
        svgLeft = Math.min(pathStartX, pathEndX),
        svgHeight = svgBottom - svgTop;
        svgTop = Math.min(startElemBottom, endRect.top + endRect.height),
        svgBottom = Math.max(startRect.top, endRect.top),
        svgLeft = Math.min(pathStartX, pathEndX),
        svgHeight = svgBottom - svgTop;
  
    // Position the SVG
    svg.style.left = svgLeft + 'px';
    svg.style.top = svgTop + 'px';
    svg.style.width = Math.abs(pathEndX - pathStartX) + 'px';
    svg.style.height = svgHeight + 'px';
  
    // Call function for drawing the path
    var pathStart = {x: pathStartX - svgLeft, y: (svgTop === startElemBottom) ? 0 : svgHeight};
    var pathEnd   = {x: pathEndX - svgLeft,   y: (svgTop === startElemBottom) ? svgHeight : 0};

    drawPath(svg, path, pathStart, pathEnd);
}

function connectAll() {
    // connect all the paths you want!
    // This script manipulates the SVG lines in product_page.tpl.php to join the stock code <spans> to the drupal field outputs for each build materials bit. 
    // the machine names for the feilds are pretty awful

    var svg = document.getElementById('svg1');
    var roatary1 = document.querySelector('.Rotary1');
    var stationary1 = document.querySelector('.Stationary1');
    var elastomer1 = document.querySelector('.Elastomer1');
    var rotary2 = document.querySelector('.field-name-build-materials-secondary-rotary') || document.querySelector(".field-name-build--secondary-rotary-standard");
    var stationary2 = document.querySelector('.Stationary2');
    var elastomer2 = document.querySelector('.Elastomer2');
    var build1 = document.querySelector('.build-code');
    var primaryRotary = document.querySelector(".field-name-build-materials-primary-rotary");
    var primaryStatioary = document.querySelector(".field-name-build-materials-primary-stationa");
    var primaryElastomer = document.querySelector(".field-name-build-materials-primary-elastome");
    var secondaryRotary = document.querySelector(".field-name-build-materials-secondary-rotary") || document.querySelector(".field-name-build--secondary-rotary-standard");
    var secondaryStationary = document.querySelector(".field-name-build-materials-secondary-statio");
    var secondaryElastomer = document.querySelector(".field-name-build-materials-secondary-elasto");
    var buildCode = document.querySelector(".field-name-build-materials-build-code");
    
   if (document.querySelector(".Rotary1")){
    connectElements(svg, document.querySelector("#rotary1"), roatary1,   primaryRotary);
    offset +=30;
    };
    
   if (document.querySelector(".Stationary1")){
    connectElements(svg, document.querySelector("#stationary1"), stationary1,   primaryStatioary);
    };
     
   if (document.querySelector(".Elastomer1")){
    connectElements(svg, document.querySelector("#elastomer1"), elastomer1,   primaryElastomer);
    };
   
   
   if (document.querySelector(".field-name-build-materials-secondary-rotary")){ //Tandem rotary position
    connectElements(svg, document.querySelector("#rotary2"), rotary2,   secondaryRotary);
    };
     
     
   if (document.querySelector(".field-name-build--secondary-rotary-standard")){ //Standard rotary position, sorry these machine names are terrible. 
    connectElements(svg, document.querySelector("#rotary2"), rotary2,   secondaryRotary);
    };
    
   if (document.querySelector(".Stationary2")){
    connectElements(svg, document.querySelector("#stationary2"), stationary2,   secondaryStationary);
    };
   
   if (document.querySelector(".Elastomer2")){
    connectElements(svg, document.querySelector("#elastomer2"), elastomer2,   secondaryElastomer);
    };
     
   if (document.querySelector(".build-code")){        
    connectElements(svg, document.querySelector("#build1"), build1,   buildCode);
     };
}

document.addEventListener("DOMContentLoaded", function() {
    // reset svg each time 
    document.querySelector("#svg1").style.height = "0";
    document.querySelector("#svg1").style.width = "0";
    connectAll();
});

window.addEventListener("resize", function () {
    // reset svg each time 
    
    document.querySelector("#svg1").style.height = "0";
    document.querySelector("#svg1").style.width = "0";
    connectAll();
});
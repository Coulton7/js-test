function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight
    };
}

//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}
  var offset= 0;
function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.getAttribute("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.getAttribute("height") <  endY)                 svg.setAttribute("height", endY);
    if (svg.getAttribute("width" ) < (startX + stroke) )    svg.setAttribute("width", (startX + stroke));
    if (svg.getAttribute("width" ) < (endX   + stroke) )    svg.setAttribute("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);
    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
        
    }
  
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    path.setAttribute("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta + offset) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta+ offset) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta + offset) +
                    " V" + endY );                 
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer = document.querySelector("#svgContainer");
    // if first element is lower than the second, swap!

    var startRect = getOffset(startElem),
        endRect = getOffset(endElem);
      
    if(startRect.top > endRect.top){
        var temp = startRect;
        startRect = endRect;
        endRect = temp;
    }
    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offsetTop;
    var svgLeft = svgContainer.offsetLeft;
    // get (top, left) coordinates for the two elements
    var startCoord = startRect;
    var endCoord   = endRect;
    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startRect.width - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startRect.height - svgTop;        // y = top offset + height - svg's top offset
        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endRect.width - svgLeft;
    var endY = endCoord.top  - svgTop;
    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
}
function connectAll() {
    // connect all the paths you want!
    // This script manipulates the SVG lines in product_page.tpl.php to join the stock code <spans> to the drupal field outputs for each build materials bit. 
    // the machine names for the feilds are pretty awful
    
   if (document.querySelector(".Rotary1")){
    connectElements(document.querySelector("#svg1"), document.querySelector("#rotary1"), document.querySelector(".Rotary1"),   document.querySelector(".field-name-build-materials-primary-rotary"));
    offset +=30;
    };
    
   if (document.querySelector(".Stationary1")){
    connectElements(document.querySelector("#svg1"), document.querySelector("#stationary1"), document.querySelector(".Stationary1"),   document.querySelector(".field-name-build-materials-primary-stationa"));
    offset +=30;
     };
     
   if (document.querySelector(".Elastomer1")){
    connectElements(document.querySelector("#svg1"), document.querySelector("#elastomer1"), document.querySelector(".Elastomer1"),   document.querySelector(".field-name-build-materials-primary-elastome"));
    offset +=50;
          };
   
   
   if (document.querySelector(".field-name-build-materials-secondary-rotary")){ //Tandem rotary position
    connectElements(document.querySelector("#svg1"), document.querySelector("#rotary2"), document.querySelector(".Rotary2"),   document.querySelector(".field-name-build-materials-secondary-rotary"));
    offset +=40;
     };
     
     
   if (document.querySelector(".field-name-build--secondary-rotary-standard")){ //Standard rotary position, sorry these machine names are terrible. 
    connectElements(document.querySelector("#svg1"), document.querySelector("#rotary2"), document.querySelector(".Rotary2"),   document.querySelector(".field-name-build--secondary-rotary-standard"));
    offset -=20;
     };
    
   if (document.querySelector(".Stationary2")){
    connectElements(document.querySelector("#svg1"), document.querySelector("#stationary2"), document.querySelector(".Stationary2"),   document.querySelector(".field-name-build-materials-secondary-statio"));
    offset -=30;
     };
   
   if (document.querySelector(".Elastomer2")){
    connectElements(document.querySelector("#svg1"), document.querySelector("#elastomer2"), document.querySelector(".Elastomer2"),   document.querySelector(".field-name-build-materials-secondary-elasto"));
    offset -=30;
     };
     
   if (document.querySelector(".build-code")){        
    connectElements(document.querySelector("#svg1"), document.querySelector("#build1"), document.querySelector(".build-code"),   document.querySelector(".field-name-build-materials-build-code"));
     };
}
document.addEventListener("DOMContentLoaded", function() {
    // reset svg each time 
    connectAll();
});
window.addEventListener("resize", function () {
    // reset svg each time 
    offset = 0;
    connectAll();
});
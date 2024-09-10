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
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
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
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta + offset) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta+ offset) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta + offset) +
                    " V" + endY );
                    
                     
                  
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#svgContainer");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}



function connectAll() {
    // connect all the paths you want!
    // This script manipulates the SVG lines in product_page.tpl.php to join the stock code <spans> to the drupal field outputs for each build materials bit. 
    // the machine names for the feilds are pretty awful
    
   if ($(".Rotary1").length){
    connectElements($("#svg1"), $("#rotary1"), $(".Rotary1"),   $(".field-name-build-materials-primary-rotary"));
    offset +=30;
    };
    
   if ($(".Stationary1").length){
    connectElements($("#svg1"), $("#stationary1"), $(".Stationary1"),   $(".field-name-build-materials-primary-stationa"));
    offset +=30;
     };
     
   if ($(".Elastomer1").length){
    connectElements($("#svg1"), $("#elastomer1"), $(".Elastomer1"),   $(".field-name-build-materials-primary-elastome"));
    offset +=50;
          };
   
   
   if ($(".field-name-build-materials-secondary-rotary").length){ //Tandem rotary position
    connectElements($("#svg1"), $("#rotary2"), $(".Rotary2"),   $(".field-name-build-materials-secondary-rotary"));
    offset +=40;
     };
     
     
   if ($(".field-name-build--secondary-rotary-standard").length){ //Standard rotary position, sorry these machine names are terrible. 
    connectElements($("#svg1"), $("#rotary2"), $(".Rotary2"),   $(".field-name-build--secondary-rotary-standard"));
    offset -=20;
     };
    
   if ($(".Stationary2").length){
    connectElements($("#svg1"), $("#stationary2"), $(".Stationary2"),   $(".field-name-build-materials-secondary-statio"));
    offset -=30;
     };
   
   if ($(".Elastomer2").length){
    connectElements($("#svg1"), $("#elastomer2"), $(".Elastomer2"),   $(".field-name-build-materials-secondary-elasto"));
    offset -=30;
     };
     
   if ($(".build-code").length){        
    connectElements($("#svg1"), $("#build1"), $(".build-code"),   $(".field-name-build-materials-build-code"));
     };
}

$(window).load(function() {
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});

$(window).resize(function () {
    // reset svg each time 
    offset = 0;
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});
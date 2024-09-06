$(document).ready(function() {
    $(function() {
  
      var colArray = Array.prototype.map.call(document.querySelector('#metric-table .table td:nth-child(2)'), function(ml) {
        return ml.text();
      }).get();
  
      var lastVal = colArray.length - 1;
      var minVal = parseFloat(colArray[0]);
      var maxVal = parseFloat(colArray[lastVal]);
      document.querySelector("#slider-range, #slider-range2").slider({
        range: true,
        min: minVal,
        max: maxVal,
        step: 0.05,
        values: [minVal, maxVal],
        slide: function(event, ui) {
          // in this function we can define what happens when a user changes the sliders
          document.querySelector("#amount").value(ui.values[0] + " - " + ui.values[1] + "mm");
  
          var table = document.getElementById("metric-table").getElementsByClassName("tablefield")[0];
          for (var i = 1, row; row = table.rows[i]; i++) {
            //iterate through rows (we SKIP the first row: counter starts at 1!)
            for (var j = 0, col; col = row.cells[j]; j++) {
              //iterate through columns: if first column not in range: HIDE, else SHOW
  
              if (j == 1) { // if first column
                if (document.querySelector(col).html() >= ui.values[0] && $(col).html() <= ui.values[1]) {
                  // if in interval
                  document.querySelector(row).style.display = "block";
                } else {
                    document.querySelector(row).style.display = "none";
                }
              }
            }
          }
        }
      });
  
      document.querySelector("#amount").value(document.querySelector("#slider-range").slider("values", 0) +
        " - " + document.querySelector("#slider-range").slider("values", 1) + "mm");
    });
    $(function() {
  
      var impcolArray = Array.prototype.map.call(document.querySelector('#imperial-table .table td:nth-child(2)'), function(il) {
        return il.text();
      }).get();
  
      var implastVal = impcolArray.length - 1;
      var impminVal = parseFloat(impcolArray[0]);
      var impmaxVal = parseFloat(impcolArray[implastVal]);
      document.querySelector("#slider-range-imp").slider({
        range: true,
        min: impminVal,
        max: impmaxVal,
        step: 0.01,
        values: [impminVal, impmaxVal],
        slide: function(event, ui) {
          var table = document.getElementById("imperial-table").getElementsByClassName("tablefield")[0];
          // in this function we can define what happens when a user changes the sliders
          $("#amount-imp").value(ui.values[0] + " - " + ui.values[1] + " Inches");
  
          for (var i = 1, row; row = table.rows[i]; i++) {
            //iterate through rows (we SKIP the first row: counter starts at 1!)
            for (var j = 0, col; col = row.cells[j]; j++) {
              //iterate through columns: if first column not in range: HIDE, else SHOW
  
              if (j == 1) { // if first column
                if (document.querySelector(col).html() >= ui.values[0] && document.querySelector(col).html() <= ui.values[1]) {
                  // if in interval
                  document.querySelector(row).style.display = "block";
                } else {
                  document.querySelector(row).style.display = "none";
                }
              }
            }
          }
        }
      });
  
      document.querySelector("#amount-imp").value($("#slider-range-imp").slider("values", 0) +
        " - " + document.querySelector("#slider-range-imp").slider("values", 1) + "inches");
    });
  
  });
  
$(document).ready(function() {
  $(function() {

    var colArray = $('#metric-table .table td:nth-child(2)').map(function() {
      return $(this).text();
    }).get();

    var lastVal = colArray.length - 1;
    var minVal = parseFloat(colArray[0]);
    var maxVal = parseFloat(colArray[lastVal]);
    $("#slider-range, #slider-range2").slider({
      range: true,
      min: minVal,
      max: maxVal,
      step: 0.05,
      values: [minVal, maxVal],
      slide: function(event, ui) {
        // in this function we can define what happens when a user changes the sliders
        $("#amount").val(ui.values[0] + " - " + ui.values[1] + "mm");

        var table = document.getElementById("metric-table").getElementsByClassName("tablefield")[0];
        for (var i = 1, row; row = table.rows[i]; i++) {
          //iterate through rows (we SKIP the first row: counter starts at 1!)
          for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns: if first column not in range: HIDE, else SHOW

            if (j == 1) { // if first column
              if ($(col).html() >= ui.values[0] && $(col).html() <= ui.values[1]) {
                // if in interval
                $(row).show();
              } else {
                $(row).hide();
              }
            }
          }
        }
      }
    });

    $("#amount").val($("#slider-range").slider("values", 0) +
      " - " + $("#slider-range").slider("values", 1) + "mm");
  });
  $(function() {

    var impcolArray = $('#imperial-table .table td:nth-child(2)').map(function() {
      return $(this).text();
    }).get();

    var implastVal = impcolArray.length - 1;
    var impminVal = parseFloat(impcolArray[0]);
    var impmaxVal = parseFloat(impcolArray[implastVal]);
    $("#slider-range-imp").slider({
      range: true,
      min: impminVal,
      max: impmaxVal,
      step: 0.01,
      values: [impminVal, impmaxVal],
      slide: function(event, ui) {
        var table = document.getElementById("imperial-table").getElementsByClassName("tablefield")[0];
        // in this function we can define what happens when a user changes the sliders
        $("#amount-imp").val(ui.values[0] + " - " + ui.values[1] + " Inches");

        for (var i = 1, row; row = table.rows[i]; i++) {
          //iterate through rows (we SKIP the first row: counter starts at 1!)
          for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns: if first column not in range: HIDE, else SHOW

            if (j == 1) { // if first column
              if ($(col).html() >= ui.values[0] && $(col).html() <= ui.values[1]) {
                // if in interval
                $(row).show();
              } else {
                $(row).hide();
              }
            }
          }
        }
      }
    });

    $("#amount-imp").val($("#slider-range-imp").slider("values", 0) +
      " - " + $("#slider-range-imp").slider("values", 1) + "inches");
  });

});

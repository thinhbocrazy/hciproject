$(document).ready(function () {
  var x = document.getElementById("bubbleChart");
    var bubbleChart = new d3.svg.BubbleChart({
        supportResponsive: true,
        container: ".bubbleChart",
        //container: => use @default
        size: 400,
        //viewBoxSize: => use @default
        innerRadius: 400 / 4.5,
        //outerRadius: => use @default
        radiusMin: 32,
        //radiusMax: use @default
        //intersectDelta: use @default
        //intersectInc: use @default
        //circleColor: use @default
        data: {
          items: [
            {text: "Apple", count: "30"},
            {text: "Samsung", count: "50"},
            {text: "Xiaomi", count: "37"},
            {text: "Huawei", count: "32"},
            {text: "Oneplus", count: "20"},
			{text: "LG", count: "10"},
			{text: "Sony", count: "20"},
			{text: "HTC", count: "20"},
			{text: "Oppo", count: "20"},
			{text: "Vivo", count: "20"},
            {text: "Top viewed", count: "10"},
          ],
          eval: function (item) {return item.count;},
          classed: function (item) {return item.text.split(" ").join("");}
        },
        plugins: [
          {
            name: "central-click",
            options: {
              text: "(See more detail)",
              style: {
                "font-size": "10px",
                "font-style": "light",
                "font-family": "Source Sans Pro, sans-serif",
                //"font-weight": "700",
                "text-anchor": "middle",
                "fill": "white"
              },
              attr: {dy: "50px"},
              centralClick: function() {
                alert("Here is more details!!");
              }
            }
          },
          {
            name: "lines",
            options: {
              format: [
                {// Line #0
                  textField: "count",
                  classed: {count: true},
                  style: {
                    "font-size": "14px",
                    "font-family": "Open Sans, sans-serif",
                    "text-anchor": "middle",
                    fill: "white"
                  },
                  attr: {
                    dy: "0px",
                    x: function (d) {return d.cx;},
                    y: function (d) {return d.cy;}
                  }
                },
                {// Line #1
                  textField: "text",
                  classed: {text: true},
                  style: {
                    "font-size": "9px",
                    "font-style":"light",
                    "font-family": "Open Sans, sans-serif",
                    "text-anchor": "middle",
                    fill: "white"
                  },
                  attr: {
                    dy: "14px",
                    x: function (d) {return d.cx;},
                    y: function (d) {return d.cy;}
                  }
                }
              ],
              centralFormat: [
                {// Line #0
                  style: {"font-size": "42px"},
                  attr: {}
                },
                {// Line #1
                  style: {"font-size": "20px"},
                  attr: {dy: "30px"}
                }
              ]
            }
          }]
      });
      });
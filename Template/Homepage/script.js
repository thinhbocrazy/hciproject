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

      /**
 * central-click.js
 */
d3.svg.BubbleChart.define("central-click", function (options) {
  var self = this;

  self.setup = (function (node) {
    var original = self.setup;
    return function (node) {
      var fn = original.apply(this, arguments);
      self.event.on("click", function(node) {
        if (node.selectAll("text.central-click")[0].length === 1) {
          alert("Hello there!\nCentral bubble is clicked.");
        }
      });
      return fn;
    };
  })();

  self.reset = (function (node) {
    var original = self.reset;
    return function (node) {
      var fn = original.apply(this, arguments);
      node.select("text.central-click").remove();
      return fn;
    };
  })();

  self.moveToCentral = (function (node) {
    var original = self.moveToCentral;
    return function (node) {
      var fn = original.apply(this, arguments);
      var transition = self.getTransition().centralNode;
      transition.each("end", function() {
        node.append("text").classed({"central-click": true})
          .attr(options.attr)
          .style(options.style)
          .attr("x", function (d) {return d.cx;})
          .attr("y", function (d) {return d.cy;})
          .text(options.text)
          .style("opacity", 0).transition().duration(self.getOptions().transitDuration / 2).style("opacity", "0.8");
      });
      return fn;
    };
  })();
});
/* global Plotly */
// Plot.js
import React from 'react';

var Plot = React.createClass({
  componentDidMount: function() {
  	// console.log('PLOT');
  	Plotly.newPlot('plot',[{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type 
    }]);
  },
  componentDidUpdate: function(){
  	Plotly.newPlot('plot',[{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type 
    }]);
  },

  render: function() {
  	
    return (
      <div id="plot"></div>
      );
  }
});

module.exports =  Plot;
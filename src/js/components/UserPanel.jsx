
var React = require('react');
var moment = require('moment');

var List = require('./List.jsx');
var ClockButton = require('./ClockButton.jsx');
var BreakLabel = require('./BreakLabel.jsx');

var breakHelper = require('../services/breakHelper');
var firebase = require('../services/firebase');


var UserPanel = React.createClass({
 
  render: function() {

  	var nextIsClockOut = false;
  	if(breakHelper.getLastEventType(this.props.events) === "CLOCK_IN"){
  		nextIsClockOut = true;
  	}
  	// console.log('nextIsClockOut', nextIsClockOut);

  	return (
  		<div>
	 		<div className="text-center">
  			<h2>Have a break { this.props.name }</h2>
			{
				// If onClickIn is defined, the user is using it.
				// Else, this is admin : no need for buttons.
				(this.props.onClockIn)?
				(<div>
					<ClockButton 
						label="Début de la pause" 
						onClick={ this.props.onClockIn } 
						disabled={ nextIsClockOut }
					/> 
					<ClockButton 
						label="Fin de la pause" 
						onClick={ this.props.onClockOut } 
						disabled={ !nextIsClockOut }
					/>
				</div> )
				:"Admin Plot" 
			}
			</div>
	            	
	        <BreakLabel events={ this.props.events } />
	        <List events={ this.props.events } />
	   	</div>
    );
  }
});

module.exports = UserPanel;
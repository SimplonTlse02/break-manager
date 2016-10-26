
var React = require('react');
var moment = require('moment');

var List = require('./List.jsx');
var ClockButton = require('./ClockButton.jsx');
var BreakLabel = require('./BreakLabel.jsx');

var breakHelper = require('../services/breakHelper');
var firebase = require('../services/firebase');


var UserPanel = React.createClass({
	getInitialState(){
		return {showList:false};
	},
 
  render() {

  	var nextIsClockOut = false;
  	if(breakHelper.getLastEventType(this.props.events) === "CLOCK_IN"){
  		nextIsClockOut = true;
  	}
  	let details;
  	if(this.state.showList) {
  		details = <List events={ this.props.events } />;
	}
	let breakOverlayStatus = this.props.isOnBreak ? 'on' : 'off';
	  return (
		  <div>
			  <div className="text-center">
				  {
					  // If onClickIn is defined, the user is using it.
					  // Else, this is admin : no need for buttons.
					  (this.props.onClockIn)?
						  (<div>
							  <ClockButton
								  label={"Have a break " + this.props.name + " !"}
								  onClick={ this.props.onClockIn }
								  disabled={ this.props.isOnBreak }
								  className="fluid green"
							  />
							  <section className={"break-overlay break-overlay--" + breakOverlayStatus}>
								  <ClockButton
									  label="Let's go back to work !"
									  onClick={ this.props.onClockOut }
									  disabled={ !this.props.isOnBreak  }
									  className="red huge"
								  />
							  </section>

						  </div> )
						  :"Admin Plot"
				  }
			  </div>

			  <BreakLabel events={ this.props.events } />
			  <button className="ui tiny button" onClick={()=>{this.setState({showList:!this.state.showList})}}><i className="icon list" /> Détails</button>
			  {details}

		  </div>
	  );

  }
});

module.exports = UserPanel;
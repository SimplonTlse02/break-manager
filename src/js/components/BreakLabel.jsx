var React = require('react');
var breakHelper = require('../services/breakHelper');

var ClockButton = React.createClass({

	render : function() {
		var totalTime = breakHelper.getTotalTime(this.props.events);
		var lastTime = breakHelper.getLastTime(this.props.events);

		breakHelper.getTodayEvents(this.props.events);
		return (
			<div>
				<p>Durée de la dernière pause : <i className="wait icon"></i> { lastTime }min</p>
				<p>Durée journalière : <i className="wait icon"></i> { totalTime }min</p>
			</div>
		);
	}
});

module.exports = ClockButton;
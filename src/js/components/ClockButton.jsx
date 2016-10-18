var React = require('react');

var ClockButton = React.createClass({
	handleClick : function(e) {
		e.preventDefault();
		// console.log('Click');
		this.props.onClick();
	},
	render : function() {
		return (
			<button onClick={ this.handleClick } disabled={ this.props.disabled } className="ui button">
				{ this.props.label }
			</button>
		);
	}
});

module.exports = ClockButton;
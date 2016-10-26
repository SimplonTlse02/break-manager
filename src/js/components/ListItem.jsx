var React = require('react');

var ListItem = React.createClass({
	
	render : function() {
		return (
			<tr>
				<td className="collapsing">
					{ 
						this.props.type==="CLOCK_IN" ? 
						<i className="sign out icon" aria-hidden="true"></i> : 
						<i className="sign in icon" aria-hidden="true"></i> 
					} 
				</td>
				<td> { moment(this.props.date).format("dddd D MMM HH:mm") } </td>
			</tr>
		);
	}
});

module.exports = ListItem;
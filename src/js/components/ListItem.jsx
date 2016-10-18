var React = require('react');

var ListItem = React.createClass({
	
	render : function() {
		return (
			<tr>
				<td>
					{ 
						this.props.type==="CLOCK_IN" ? 
						<i className="sign out icon" aria-hidden="true"></i> : 
						<i className="sign in icon" aria-hidden="true"></i> 
					} 
				</td>
				<td> { this.props.date } </td>
			</tr>
		);
	}
});

module.exports = ListItem;
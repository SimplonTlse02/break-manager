var React = require('react');

var ListItem = require('./ListItem.jsx');

var List = React.createClass({
	
	render : function(){
		var eventNodes = this.props.events.map(function(event){
			return (
				<ListItem type={event.type} date={ event.date } key={ event.date }/>
			)
		});

		return (
			<table className="ui celled striped table compact">
			<thead>
				<tr>
					<th>Type</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{ eventNodes }
			</tbody>
			</table>
		)
	}
});

module.exports = List;
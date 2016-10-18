var React = require('react');

var NameInput = React.createClass({

	handleNameChange: function(e){
		e.preventDefault();
		var name = e.target.value;
		this.props.onNameChange(name);
	},


	render : function() {
		console.log('render');
		var namesNodes = this.props.users.map(function(user){
			return <option key={ user }> { user } </option>
		});
		return (
			<form>
				<select className="form-control"  onChange={ this.handleNameChange }>
					<option value="">Select your name</option>
					  { namesNodes }
				</select>
			</form>
		);
	}
});

module.exports = NameInput;
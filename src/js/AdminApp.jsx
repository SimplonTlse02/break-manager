var React = require('react');
var ReactDOM = require('react-dom');


var NameInput = require('./components/NameInput.jsx');
var UserPanel =  require('./components/UserPanel.jsx');
var Plot = require('./components/Plot.jsx');

var breakHelper = require('./services/breakHelper');
var firebase = require('./services/firebase');



var AdminApp = React.createClass({

    getInitialState: function(){
        return {
            "users" : [],
            "events":[],
            showUserPanel : false
        };
    },

    componentDidMount: function() {
        this.handleNameChange(this.props.name);
    },

    handleNameChange : function(name){
        this.setState({ name: name, showUserPanel: true });
        firebase.getTimes(name).then(function(times){
            this.setState({ events : times});
        }.bind(this));
    },


    render: function() {

        var events = this.state.events;
        // console.log(events);
        var data = breakHelper.getDurationsByDay(this.state.events);
        data = breakHelper.parseDurationsByDayToPlotData(data);
        var xData = data.x;
        var yData = data.y;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <UserPanel
                            name={ this.state.name }
                            events={ this.state.events }
                        />
                    </div>
                </div>
                <Plot xData={ xData } yData={ yData } type="bar"/>
            </div>
        );
    }
});

module.exports = AdminApp;
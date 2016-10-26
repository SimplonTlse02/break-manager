let React = require('react');
let ReactDOM = require('react-dom');

// Components
let NameInput = require('./components/NameInput.jsx');
let UserPanel =  require('./components/UserPanel.jsx');
let AdminApp =  require('./AdminApp.jsx');

// Services
let breakHelper = require('./services/breakHelper');
let firebase = require('./services/firebase');


let App = React.createClass({
  getInitialState: function(){
    return {
      "users" : [],
      "events": [],
      showUserPanel : false,
      "name": "",
      isOnBreak:false
    };
  },

  componentDidMount: function() {
    firebase.getUsers().then(function(users){
      this.setState({ users : users, showUserPanel:true});
    }.bind(this));


    this.setState({'name': this.props.name});
    this.fetchUserTimes(this.props.name);
  },

  handleNameChange : function(name){
    this.setState({ name: name, showUserPanel: true });
  },

  fetchUserTimes : function(name){
    firebase.getTimes(name).then(function(times){
      let currState = breakHelper.getLastEventType(times) === 'CLOCK_IN';
      this.setState({ events : times, isOnBreak: currState});
    }.bind(this));
  },

  handleClockIn : function() {

    let event = {
      type : 'CLOCK_IN',
      date :  {".sv": "timestamp"}
    };
    let events = this.state.events;
    let newEvents = events.concat([event]);
    firebase.pushTime(this.state.name, event);
    this.setState({events: newEvents, isOnBreak:true});

  },

  handleClockOut : function() {

    let event = {
      type : 'CLOCK_OUT',
      date :  {".sv": "timestamp"}
    };
    let events = this.state.events;

    let newEvents = events.concat([event]);
    firebase.pushTime(this.state.name, event);
    this.setState({events: newEvents,isOnBreak:false});
  },

  render: function() {
    let todayEvents = breakHelper.getTodayEvents(this.state.events);

    return (
        <div className="container">
          <div className="row">
            <div className="">
              { this.state.showUserPanel ?
                  <UserPanel
                      name={ this.state.name }
                      events={ todayEvents }
                      onClockIn={ this.handleClockIn }
                      onClockOut={ this.handleClockOut }
                      isOnBreak={this.state.isOnBreak}
                  />
                  : <i className="icon loading notched circle" /> }
            </div>
          </div>
        </div>
    );
  }
});

let element = document.getElementById('break-manager');
let name = element.getAttribute('data-name');
let isAdmin = ("1" == element.getAttribute('data-isAdmin'));

ReactDOM.render(
    <div>
      <App name={ name }/>
      {
        (isAdmin)?
            <AdminApp name={ name }/>
            :""
      }
    </div>,
    element
);
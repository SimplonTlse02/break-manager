// To remove for PROD
// if( typeof window.jQuery == 'undefined' || typeof window.$  == 'undefined'){
//   window.jQuery = window.$ = require('jquery');
// } 

let React = require('react');
let ReactDOM = require('react-dom');

// Components
let NameInput = require('./components/NameInput.jsx');
let UserPanel =  require('./components/UserPanel.jsx');
let AdminApp =  require('./AdminApp.jsx');

// Services
let breakHelper = require('./services/breakHelper');
let firebase = require('./services/firebase');

let moment = require('moment');
moment.locale('fr');

let App = React.createClass({
  timeEndpoint : "https://script.googleusercontent.com/macros/echo?user_content_key=7U6CMeU20QWHuf5wpVvUkoSGHIvjQFSxprCqHwcBMPWbbHNBfh60cStQKyvIfX5LJqjYZIcsFptzw1KIdgXELK-vGRB4Bu9Om5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-YSRgvERRRx_Glx38N8iKHQ&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk",

	getInitialState: function(){
		return { 
      "users" : [],
      "events": [],
      showUserPanel : false,
      "name": ""
		 };
	},

  componentDidMount: function() {
    firebase.getUsers().then(function(users){
      // console.log('--------------- users: ',users);
      this.setState({ users : users});
    }.bind(this));

    
    this.setState({'name': this.props.name,  showUserPanel: true});
    this.fetchUserTimes(this.props.name);
  },

  handleNameChange : function(name){
  		this.setState({ name: name, showUserPanel: true });
  },

  fetchUserTimes : function(name){
    firebase.getTimes(name).then(function(times){
        this.setState({ events : times});
      }.bind(this));
  },
  
  handleClockIn : function() {

    let event = {
      type : 'CLOCK_IN',
      date :  moment().format()
    };
    let events = this.state.events;
    let newEvents = events.concat([event]);
    this.setState({events: newEvents});

    // Get time from api to avoid cheating.
    // And push to firebase after 
    $.get(this.timeEndpoint, function (result) {
      let jsonResult = JSON.parse(result);
      let fullDate = new Date(jsonResult.fulldate);
      let eventDate = moment(fullDate).format();

      event.date = eventDate;
      firebase.pushTime(this.state.name, event);
    }.bind(this));

  },

  handleClockOut : function() {
    
    let event = {
      type : 'CLOCK_OUT',
      date :  moment().format()
    };

    let events = this.state.events;
    let newEvents = events.concat([event]);
    this.setState({events: newEvents});

    $.get(this.timeEndpoint, function (result) {
      let jsonResult = JSON.parse(result);
      let fullDate = new Date(jsonResult.fulldate);
      let eventDate = moment(fullDate).format();

      event.date = eventDate;
      firebase.pushTime(this.state.name, event);
    }.bind(this));
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
              /> 
              : <NameInput 
                  onNameChange={ this.handleNameChange } 
                  users={ this.state.users }
                /> }
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
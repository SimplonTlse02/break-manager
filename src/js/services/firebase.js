"use strict";
var firebase = require("firebase");



firebase.initializeApp(window.breakmanConfig);

// Get a reference to the database service
var database = firebase.database();


function pushTime(user, time){
	database.ref('events/'+user).push(time);
}

function setUser(user){
	database.ref('users/'+user).set({
		name: user
	});
}

function getTimes(user){

	return database.ref('events/'+user ).once('value').then(function(snapshot){
  // console.log(snapshot.val());

  var times = [];
  for(var k in snapshot.val()){
  	var v = snapshot.val()[k];
  	// console.log('value',v);
  	times.push(v);
  }
  return times;
});
}

function getUsers(){
	return database.ref('users/').once('value').then(function(snapshot){
		// console.log(snapshot.val());

		var usernames = [];
		for(var k in snapshot.val()){
			usernames.push(k);
		}
		// console.log(usernames);

		return usernames;
	});
}



module.exports = {
	pushTime: pushTime,
	getTimes: getTimes,
	getUsers: getUsers
};
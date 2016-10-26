'use strict';
var moment = require('moment');

var app = {
	getTotalTime: function(events){

		if(!events || events.length < 1 || events[0].type != "CLOCK_IN"){
			return 0;
		}

		var time = 0

		for(var i=1; i < events.length; i=i+2){
			var start = moment(events[i-1].date);
			var end = moment(events[i].date);

			time += end.diff(start, 'minutes');
		}
		return time;
	},

	getDurations: function(events){

		if(!events || events.length < 1 || events[0].type != "CLOCK_IN"){
			return 0;
		}

		var time = 0;
		var x = [];
		var y = [];

		for(var i=1; i < events.length; i=i+2){
			var start = moment(events[i-1].date);
			var end = moment(events[i].date);

			var duration = end.diff(start, 'minutes');

			x.push(start.format());
			y.push(duration);

		}
		return {x: x, y:y};
	},
	getDurationsByDay: function(events){

		if(!events || events.length < 1 || events[0].type != "CLOCK_IN"){
			return 0;
		}

		var time = 0;
		var x = [];
		var y = [];
		var durations = {};

		for(var i=1; i < events.length; i=i+2){
			var start = moment(events[i-1].date);
			var end = moment(events[i].date);
			var duration = end.diff(start, 'minutes');

			var startOfDay = start.startOf('days').format();

			if(!durations[startOfDay]){
				durations[startOfDay] = 0;
			}
			durations[startOfDay] += duration;

		}
		return durations;
	},
	parseDurationsByDayToPlotData: function(durations){
		if(!durations || durations.length === 0){
			return {x:[],y:[]};
		}
		var x = [];
		var y = [];
		for(var k in durations){
			x.push(moment(k).format('ll'));
			y.push(durations[k]);
		}

		return { x:x, y:y };
	},

	getTodayEvents: function(events){

		if(!events){
			return [];
		}
		var today = moment().startOf('days');
		var tomorrow = today.clone().add(1, 'days');

		var todayEvents = events.filter(function(event){
			var eventDate = moment(event.date);
			return eventDate.isBetween(today, tomorrow);
		})
		return todayEvents;
	},
	getLastEventType: function(events){
		var res = "CLOCK_OUT";
		if(events && events.length > 0){
			res = events[events.length-1].type;
		}
		console.log('lstenttype', res)
		return res;
	},
	getLastTime: function(events){

		if(!events || events.length < 2 || events[0].type != "CLOCK_IN"){
			return 0;
		}

		var time = 0;
		var start;
		var end;

		var lastEvent = events[events.length-1];
		if(lastEvent.type === "CLOCK_OUT"){
			end = moment(lastEvent.date);
			start = moment(events[events.length-2].date);
			
		}else{
			end = moment(events[events.length-2].date);
			start = moment(events[events.length-3].date);
		}
		time = end.diff(start, 'minutes');
		return time;
	}
}

module.exports = app;
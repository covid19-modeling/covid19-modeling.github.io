var Plot = (function () {
	'use strict';
	return {
		make: function(id, code, variable) {
			var url = 'https://raw.githubusercontent.com/covid19-modeling/forecasts/master/results/latest/' + code + '.csv';
			Plotly.d3.csv(url, function(err, rows){ 
				var dates = [], lb = [], ub = [], observed = [], avg_prediction = [];
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
					dates.push(row['date']);
					lb.push(row['lb_' + variable]);
					ub.push(row['ub_' + variable]);
					observed.push(row['obs_' + variable]);
					avg_prediction.push(parseFloat(row['mean_' + variable]));
				}
				var lb_trace = {
					name: 'lower bound',
					marker: {
						color: '#444'
					},
					line: {
						width: 0
					},
					x: dates,
					y: lb,
					type: 'scatter'
				};
				var prediction_trace = {
					name: 'prediction',
					mode: 'lines',
					line: {
						color: 'rgb(31, 119, 180)',
						dash: 'dot'
					},
					fillcolor: 'rgba(68, 68, 68, 0.1)',
					fill: 'tonexty',
					x: dates,
					y: avg_prediction,
					type: 'scatter'
				};
				var ub_trace = {
					name: 'upper bound',
					x: dates,
					y: ub,
					mode: 'lines',
					marker: {
						color: '#444'
					},
					line: {
						width: 0
					},
					fillcolor: 'rgba(68, 68, 68, 0.1)',
					fill: 'tonexty',
					type: 'scatter'
				};
				var observed_trace = {
					name: 'observed',
					mode: 'markers',
					line: {
						color: 'rgb(200, 119, 180)'
					},
					x: dates,
					y: observed,
					type: 'scatter'
				};
				var data = [lb_trace, prediction_trace, ub_trace, observed_trace];
				var layout = {
					showlegend: false
				};
				Plotly.newPlot(id, data, layout);
		   });
	   }
	}
})();
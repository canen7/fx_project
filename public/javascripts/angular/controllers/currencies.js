myApp.controller('CurrenciesController', function($scope, CurrenciesFactory){
	// invoke the method immediately!!!
	$scope.getCurrency = function(){
		var currency = $scope.currency

	}


	$(function(){
	var symbol = $scope.currency;
		var auth_token = 'auth_token=hp7KBR5vrnKzh5zw9qG1'
		var quandl_url = 'http://www.quandl.com/api/v1/datasets/QUANDL/' + symbol +'.json?trim_start=1994-05-27&trim_end=2014-10-13' + auth_token
		console.log(quandl_url)

		$.getJSON(quandl_url, function (data) {

	var formatted_data = [];

	for ( var i=0; i<data.data.length; i++){
		var d = Date.parse(data.data[i][0])
		formatted_data.push([d, data.data[i][1]])
	}

	formatted_data = formatted_data.reverse()

	console.log(formatted_data)


	$('#container_chart1').highcharts('StockChart', {


	rangeSelector : {
				selected : 1
				},

	title : {
	text : 'Associated losses'
	},

	series : [{
		name : 'test',
		data : formatted_data,
		tooltip: {
		valueDecimals: 2
		}
		}]
	});
	});
		});

});

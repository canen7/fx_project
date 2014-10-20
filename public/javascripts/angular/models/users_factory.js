myApp.factory('UsersFactory', function($http){
	var users;

	var factory = {};

	var formatted_data = [];
	
	factory.addUser = function(user, update_errors){

		//angular is a http module, something inside node
		
		$http.post('/users/create', user).success(function(data, status, headers, config) {
		  console.log('data is', data);
		  if(data == 'success')
	      {
			users.push({
				name: user.name,
				email: user.email
			});
	      	// users = data; not neccesary....
	      	update_errors(false);
	      }
	      else
	      {
	      	update_errors(data.errors);
	      }
		});
	}

	factory.getUsers = function(callback){
		$http.get('/users/index.json').
	    success(function(data, status, headers, config) {
	      callback(data);
	      users = data;
	    });
	 }

	factory.getQuandlCurrencyData = function (currency){
		var symbol = currency;
		var auth_token = 'auth_token=hp7KBR5vrnKzh5zw9qG1';
		var quandl_url = 'http://www.quandl.com/api/v1/datasets/QUANDL/' + symbol +'.json?trim_start=1994-05-27&trim_end=2014-10-13' + auth_token

		$.getJSON(quandl_url, function (data) {


		for ( var i=0; i<data.data.length; i++){
			var d = Date.parse(data.data[i][0])
			formatted_data.push([d, data.data[i][1]])
			};

		formatted_data = formatted_data.reverse();

		
		$('#container_chart1').highcharts('StockChart', {
					rangeSelector : {
						selected : 1
					},

					title : {
						text : 'Nice chart'
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


	 }

	return factory;
})
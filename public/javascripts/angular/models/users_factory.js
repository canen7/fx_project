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
	      console.log(data);
	    });
	 }

	factory.getQuandlCurrencyData = function (currency){

		var symbol = currency;
		console.log(symbol);
		var auth_token = 'auth_token=hp7KBR5vrnKzh5zw9qG1';
		var quandl_url = 'http://www.quandl.com/api/v1/datasets/QUANDL/' + symbol +'.json?trim_start=1994-05-27&trim_end=2014-10-13&' + auth_token;

		console.log(quandl_url);

		$.getJSON(quandl_url, function (data) {
			console.log(data)

			console.log("In the factory and this is my data [5]: " + data.data[5] + " and data [6]" + data.data[6])

		var formatted_data = [];

		for ( var i=0; i<data.data.length; i++){
			var d = Date.parse(data.data[i][0])
			formatted_data.push([d, data.data[i][1]])
			};

		console.log(formatted_data.length);

		formatted_data = formatted_data.reverse();

		
		$('#container_chart1').highcharts('StockChart', {
					rangeSelector : {
						selected : 1
					},

					title : {
						text : currency
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

	 factory.calculateStats = function (callback){
		$http.get('/stats').success(function(data, status, headers, config) {
	      callback(data);
	      exposure = 100;
	      formatted_stats = data;
	      console.log(data);
	    });
	 }
	 		//$('#stats').append('this is a jquery append test')
	 	
	 	//with the data calculated from diff Quandl data we can get the proportional expected losses
	 	
	 		//$('#stats').append("<h3>Once in 5 years you will loose {{json_stats.pc20 * exposure}}</h3>")


	 


	return factory;
})
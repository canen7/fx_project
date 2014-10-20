myApp.controller('UsersController', function($scope, UsersFactory){
	// invoke the method immediately!!!
	UsersFactory.getUsers(function(users){
		$scope.users = users;
		$scope.formatted_data = [];
	});


	$scope.addUser = function(){
		// this method takes two parameters: first one is new user data, second is a callback to be executed after the DB
		// runs the query.  
		UsersFactory.addUser($scope.new_user, function(err){
			$scope.errors = err;
		});
	}

	$scope.getQuandlCurrencyData = function(){
		//this method calls the factory method which calls the Quandl API to get the data for a currency pair passed as function argument

		UsersFactory.getQuandlCurrencyData($scope.currency, function(err){
			$scope.formatted_data = formatted_data

		});
	};

})
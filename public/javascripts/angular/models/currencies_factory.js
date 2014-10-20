myApp.factory('UsersFactory', function($http){
	var users;

	var factory = {};
	
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

	return factory;
})
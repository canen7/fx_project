var mongoose = require('mongoose'),
	User = mongoose.model('User');

var ss = require('simple-statistics');

var http = require ('http');

module.exports = {

	index: function(req, res){
		res.render('./../server/views/users/index', {title:'Welcome Page'});
	},

	index_json: function(req, res){	
		User.find({}, function(err, results){
			// this spits back all the users in a json format!
			res.send(JSON.stringify(results));
		});
	},

	create: function(req, res){
		var a = new User(req.body);
		a.save(function(err){
			if(err){
				res.send(JSON.stringify(err));
			}
			else
			{
				res.send('success');
			}
		});
	},

	show: function(req, res){
		console.log(req.params.id);
		res.render('./../server/views/users/show', {title:'Welcome Page'});
	},

	edit: function(req, res){
		res.render('./../server/views/users/edit', {title:'Welcome Page'});
	},

	calculate_mean: function (req, res){

		var auth_token = 'auth_token=hp7KBR5vrnKzh5zw9qG1';
		var quandl_url = '/api/v1/datasets/QUANDL/EURUSD.json?trim_start=1994-05-27&trim_end=2014-10-13&' + auth_token;


		var options = {
			hostname:'www.quandl.com',
			path: quandl_url,
			method:'GET'
		};

		var req = http.request(options,function(res){
			var body = "";
			res.on('data', function (chunk) {
				body += chunk;
				//console.log('BODY: ' + chunk);
				
				// for ( var i=0; i<body.length; i++){
				// console.log(body[i]);
				// };

			});
			
			res.on('end', function(){
				console.log(JSON.parse(body));

				res.send(body);
			})

		});

		req.on('error',function(e){
			console.log(e);
		});

		req.end();



		// console.log('Within the calculate_mean function');
		// res.render('./../server/views/users/index', {title:'Welcome Page'});
	}



}
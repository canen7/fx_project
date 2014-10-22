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

	get_stats: function (request, response){

		var auth_token = 'auth_token=hp7KBR5vrnKzh5zw9qG1';
		var quandl_url = '/api/v1/datasets/QUANDL/EURUSD.json?trim_start=1994-05-27&trim_end=2014-10-13&transformation=rdiff&' + auth_token;


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
			
			res.on('end', function(res){
				
				parsed_json = JSON.parse(body);

				var close_prices = [];
				for (var i = 0; i<parsed_json.data.length-1; i++) {
					close_prices[i]=parsed_json.data[i][1];
				}  

				//console.log("This is the parsed_json.data ",parsed_json.data);

				//console.log("These are the close prices ",close_prices);

				json_stats = {};

				json_stats.begin_data = parsed_json.data[parsed_json.data.length -1][0];
				json_stats.end_data = parsed_json.data[0][0];
				json_stats.min = ss.min(close_prices);
				json_stats.max = ss.max(close_prices);
				json_stats.mean = ss.mean(close_prices);
				json_stats.pc10 = ss.quantile(close_prices,0.1);
				json_stats.pc15 = ss.quantile(close_prices,0.15);
				json_stats.pc20 = ss.quantile(close_prices,0.2);
				json_stats.pc25 = ss.quantile(close_prices,0.25);
				json_stats.pc30 = ss.quantile(close_prices,0.3);
				json_stats.pc35 = ss.quantile(close_prices,0.35);
				json_stats.pc40 = ss.quantile(close_prices,0.4);
				json_stats.pc45 = ss.quantile(close_prices,0.45);
				json_stats.pc50 = ss.quantile(close_prices,0.5);
				json_stats.pc55 = ss.quantile(close_prices,0.55);
				json_stats.pc60 = ss.quantile(close_prices,0.6);
				json_stats.pc65 = ss.quantile(close_prices,0.65);
				json_stats.pc70 = ss.quantile(close_prices,0.7);
				json_stats.pc75 = ss.quantile(close_prices,0.75);
				json_stats.pc80 = ss.quantile(close_prices,0.8);
				json_stats.pc85 = ss.quantile(close_prices,0.85);
				json_stats.pc90 = ss.quantile(close_prices,0.9);
				json_stats.pc95 = ss.quantile(close_prices,0.95);


				response.send(json_stats);
				//res.render('./../server/views/users/index', {stats: json_stats})
			});

		});

		req.on('error',function(e){
			console.log(e);
		});

		req.end();



		// console.log('Within the calculate_mean function');
		// res.render('./../server/views/users/index', {title:'Welcome Page'});
	}  // end get_stats



}
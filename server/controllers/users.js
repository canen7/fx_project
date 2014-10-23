var mongoose = require('mongoose'),
	User = mongoose.model('User');

var ss = require('simple-statistics');

var http = require ('http');

module.exports = {

	index: function(req, res){
		res.render('./../server/views/users/index', {title:'Welcome!'});
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

	destroy: function(req,res){
		var message = {};
		User.remove({_id: req.params.id},function(err){
			if(!err) {
				message.type = "notif";
			}
			else {
				message.type = 'error'
			}
			res.send(message);
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

		var amount = request.body.amount;
		var currency = request.body.currency;

		var auth_token = 'auth_token=hp7KBR5vrnKzh5zw9qG1';
		var quandl_url = '/api/v1/datasets/QUANDL/'+currency+'.json?trim_start=1994-05-27&trim_end=2014-10-13&' + auth_token;

		console.log("The amount is: ",amount);
		console.log("the currency is: ",currency);

		amount = Number(amount);
		
		console.log("the type of amount is: ",typeof(amount));
		console.log(JSON.parse(JSON.stringify(amount)));

		var options = {
			hostname:'www.quandl.com',
			path: quandl_url,
			method:'GET'
		};

		var req = http.request(options,function(res){
			var body = "";
			res.on('data', function (chunk) {
				body += chunk;
			});
			
			res.on('end', function(res){
				
				parsed_json = JSON.parse(body);

				var close_prices = [];
				for (var i = 0; i<parsed_json.data.length-1; i++) {
					close_prices[i]=parsed_json.data[i][1];
				}  

				var rolling_returns_1y = [];
				for (var i = 0; i<close_prices.length-260; i++) {
					rolling_returns_1y[i] =  ( close_prices[i] / close_prices[i+250] ) - 1;
				}

				json_stats = {};

				json_stats.begin_data = parsed_json.data[parsed_json.data.length -1][0];
				json_stats.end_data = parsed_json.data[0][0];
				json_stats.min = ss.min(rolling_returns_1y)*amount;
				json_stats.max = ss.max(rolling_returns_1y)*amount;
				json_stats.mean = ss.mean(rolling_returns_1y)*amount;
				json_stats.pc10 = ss.quantile(rolling_returns_1y,0.1)*amount;
				json_stats.pc15 = ss.quantile(rolling_returns_1y,0.15)*amount;
				json_stats.pc20 = ss.quantile(rolling_returns_1y,0.2)*amount;
				json_stats.pc25 = ss.quantile(rolling_returns_1y,0.25)*amount;
				json_stats.pc30 = ss.quantile(rolling_returns_1y,0.3)*amount;
				json_stats.pc35 = ss.quantile(rolling_returns_1y,0.35)*amount;
				json_stats.pc40 = ss.quantile(rolling_returns_1y,0.4)*amount;
				json_stats.pc45 = ss.quantile(rolling_returns_1y,0.45)*amount;
				json_stats.pc50 = ss.quantile(rolling_returns_1y,0.5)*amount;
				json_stats.pc55 = ss.quantile(rolling_returns_1y,0.55)*amount;
				json_stats.pc60 = ss.quantile(rolling_returns_1y,0.6)*amount;
				json_stats.pc65 = ss.quantile(rolling_returns_1y,0.65)*amount;
				json_stats.pc70 = ss.quantile(rolling_returns_1y,0.7)*amount;
				json_stats.pc75 = ss.quantile(rolling_returns_1y,0.75)*amount;
				json_stats.pc80 = ss.quantile(rolling_returns_1y,0.8)*amount;
				json_stats.pc85 = ss.quantile(rolling_returns_1y,0.85)*amount;
				json_stats.pc90 = ss.quantile(rolling_returns_1y,0.9)*amount;
				json_stats.pc95 = ss.quantile(rolling_returns_1y,0.95)*amount;

				response.send(json_stats);
				//response.send(JSON.stringify(json_stats);
			});

		});

		req.on('error',function(e){
			console.log(e);
		});

		req.end();

	},  // end get_stats

	show_methodology: function (req, res) {
		res.render('./../server/views/users/methodology', {title:'Welcome!'});
	}

}
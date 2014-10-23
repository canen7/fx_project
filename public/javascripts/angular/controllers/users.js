myApp.controller('UsersController', function($scope, UsersFactory){
	// invoke the method immediately!!!
	UsersFactory.getUsers(function(users){
		$scope.users = users;
		$scope.formatted_data = [];

	});


	$scope.addUser = function(){
		// this method takes two parameters: first one is new user data, 
		//second is a callback to be executed after the DB runs the query.  
		UsersFactory.addUser($scope.new_user, function(err){
			$scope.errors = err;
		});
	}

	$scope.deleteUser = function(user){
		//two paramenters: first one is the user id to be deleted, 
		//second a callback to be executes after the DB runs the query
		UsersFactory.deleteUser(user, function(err){
			$scope.errors = err;
		 })
	}

	$scope.getQuandlCurrencyData = function(){
		//this method calls the factory method which calls the Quandl API to get the data for a currency pair passed as function argument

		UsersFactory.getQuandlCurrencyData($scope.currency, function(err){
			$scope.formatted_data = formatted_data;
			$scope.currency = currency;

		});
	}

	$scope.calculateStats = function(){
		//this method calls the factory method which will call stats in the backend
		var amount = {amount : $scope.amount}
		UsersFactory.calculateStats(amount, function(data){
			$scope.formatted_stats = data;

			$scope.chartConfig = {
        		options: {
            		chart: {
                		type: 'bar'
            		}
        		},
        		series: [{
        			yAxis: 0, 
            		data: [$scope.formatted_stats.pc20, $scope.formatted_stats.pc30, $scope.formatted_stats.pc40, $scope.formatted_stats.pc50, $scope.formatted_stats.pc60] //UsersFactory.calculateStats(function(data){ })
        			}],
        		title: {
            		text: 'Gains/losses due to currency fluctuations'
        		},
        		loading: false
    		}

		})
	}

    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
    }

    $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading
    }

    

   

});


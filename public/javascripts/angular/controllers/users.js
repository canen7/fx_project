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
			$scope.formatted_data = formatted_data;
			$scope.currency = currency;

		});
	}

	$scope.calculateStats = function(){
		//this method calls the factory method which will call stats in the backend
		UsersFactory.calculateStats(function(data){
			$scope.exposure = data;
			$scope.formatted_stats = data;
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

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },

        loading: false
    }

});


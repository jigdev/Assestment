angular.module('foodController', [])

	// inject the Food service factory into our controller
	.controller('mainController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.formData.foodName ='';
		$scope.formData.foodPrice ='';
		$scope.loading = true;

		$scope.sortType     = 'foodName'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		


		// GET =====================================================================
		// when landing on the page, get all food and show them
		// use the service to get all the food
		Food.get()
			.success(function(data) {
				
				if(data.length > 0){
					$scope.formDatas = data;
				/*$scope.formData.foodPrice = data.foodPrice;
				$scope.formData.foodName = data.foodName;}*/
				
			}
			$scope.loading = false;
			});

		//Get total of all food items
		$scope.getTotal = function() {
			$http.get("/api/total", {}).then(function(totalData){
				
				$scope.total = totalData.data;
			});
		}	

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() { 

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.foodName != undefined && $scope.formData.foodPrice != undefined ) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Food.create($scope.formData)

					// if successful creation, call our get function to get all the new food
					.success(function(data) { 
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.formDatas = data; // assign our new list of food
						//$scope.formData.foodName =data.foodName;
						$scope.getTotal();
					});
			}
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Food.delete(id)
				// if successful creation, call our get function to get all the new food
				.success(function(data) {
					$scope.loading = false;
					$scope.formDatas = data; // assign our new list of food
					$scope.getTotal();
				});
		};
	}]);
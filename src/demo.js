angular.module('MyApp', ['waterScroll'])
    .controller('TestCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        var vm = this;
        var count = 1;
        vm.listData = [{
            name: 1
        }]


        vm.loadData = function() {
            count++;
            console.log(1);
            if (count < 60) {
                vm.listData.push({
                    name: count
                })
                $scope.$broadcast('scrollLoadingFinfish')

            } else {
                $scope.$broadcast('stopLoading')
                $timeout(function() {
                    count = 0;
                    $scope.$broadcast('startLoading')
                }, 2000);
            }

        }
        return vm;
    }])
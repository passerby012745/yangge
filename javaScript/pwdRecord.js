angular.module('myApp', ['ionic']).controller('myCtrl',['$scope','$timeout' ,'$http',function($scope,$timeout,$http){

    //下拉刷新
    $scope.doRefresh = function() {
        $scope.$broadcast('scroll.refreshComplete');
    };
}])
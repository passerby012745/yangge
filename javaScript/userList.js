var changeId="";

angular.module('myApp', ['ionic']).controller('myCtrl',['$scope','$timeout' ,'$http',function($scope,$timeout,$http){

    //下拉刷新
    $scope.doRefresh = function() {
        $scope.$broadcast('scroll.refreshComplete');
    };
}])

function changeName(id) {
    $(".changeNameDiv").css("display", "block");
    $(".inputName").val($("#"+id).html());
    changeId=id;
}


$(function () {
    $(".ui-block-a").click(function () {
        $(".changeNameDiv").css("display", "none");

    })

    $(".ui-block-b").click(function () {
        if ($(".inputName").val() == "" || $(".inputName").val() == null) {
            return;
        }
        $(".changeNameDiv").css("display", "none");
        $("#"+changeId).html($(".inputName").val());

    })

})
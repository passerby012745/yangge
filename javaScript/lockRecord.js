
$(function() {
    $("#selectType").on("click", function(event) {
        if( $("#typeLi").css("display")=="block"){
            $("#typeLi").css("display","none");
            return;
        }
        $("#i").removeClass("fa-caret-down").addClass(
            "fa-caret-up")// 当点隐藏ul弹窗时候，把小图标恢复原状
        $("#typeLi").css("display","block");
        if (event.stopPropagation) {
            // 针对 Mozilla 和 Opera
            event.stopPropagation();
        } else if (window.event) {
            // 针对 IE
            window.event.cancelBubble = true;
        } /*
			 * 阻止事件传播，事件从点击的元素出发，向外（window）传播，
			 * 如果不写个阻止事件，会导致下面的document点击函数一起执行，导致显示失败
			 */

    });
    $("#typeLi").on("click", "li", function(event) {
        console.log("click", "click");
        var oliName = $(this).attr("oliName");// 定义一个name属性，获取点击的元素属性赋值到当前，方便动态化传值
        var oliId = $(this).attr("oliId");// 定义一个id属性，获取点击的元素属性赋值到当前，方便动态化传值
        console.log("oliName", oliName);
        console.log("oliId", oliId);
        $("#type").html(oliName);
        $("#i").removeClass("fa-caret-up").addClass("fa-caret-down");
    });


    $(document).click(
        function(event) {
            $("#i").removeClass("fa-caret-up").addClass(
                "fa-caret-down")// 当点隐藏ul弹窗时候，把小图标恢复原状
            $(".selectUl").hide();// 当点击空白处，隐藏ul弹窗
        });

})



angular.module('myApp', ['ionic']).controller('myCtrl',['$scope','$timeout' ,'$http',function($scope,$timeout,$http){

    //下拉刷新
    $scope.doRefresh = function() {
        $scope.$broadcast('scroll.refreshComplete');
    };
}])
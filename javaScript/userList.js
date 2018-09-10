var changeId = "";
var resource = null;
var user = null;
var defaultUser = null;
var primaryColor = null;//主色
var minorColor = null;//次色
var color = null;
function getResource() {
    return resource;
}

function initPage() {
    var spanArray = document.getElementsByTagName("span");
    for (var i = 0; i < spanArray.length; i++) {
        if (spanArray[i].getAttribute("local_key")) {
            var key = spanArray[i].getAttribute("local_key")
            spanArray[i].innerHTML = getResource()[key];
        }
    }
}

function getLockSN() {
    var urlObj = getUrlParams(decodeURI(window.location.href));
    return urlObj.sn;
}
function getColor() {
    var urlObj = getUrlParams(decodeURI(window.location.href));
    return urlObj.primaryColor.replace("/","");
}


//下拉刷新
function load() {
    queryAllUsedId();
    primaryColor=getColor();
    console.log(primaryColor);
    $(".group").css("color",primaryColor);
    $("#list").empty();
    window.AppJsBridge.service.deviceService.getDevice({
        "sn": getLockSN(),
        "success": function (data) {
            console.log(data);
            defaultUser = data.yanggeSmartCivilianDoorLock.userList;

            user = data.yanggeSmartCivilianDoorLock.userList;
            //遍历用户并显示
            for (var i = 0; i < user.length; i++) {
                switch (user[i].userType) {
                    case 1:
                        user[i].userType = getResource()["fingerprint"];
                        break;
                    case 2:
                        user[i].userType = getResource()["password"];
                        break;
                    case 3:
                        user[i].userType = getResource()["card"];
                        break;
                    case 4:
                        user[i].userType = getResource()["long"];
                        break;
                    case 5:
                        user[i].userType = getResource()["key"];
                        break;
                    default:
                        break;
                }
                var text = "<div class=\"each_div\" onclick=\"openChangeNameDiv('"+i+"')\">\n" +
                    "                <div class=\"name_div\">\n" +
                    "                    <span id=\"user"+i+"\" style=\"padding-left: 20px\">"+user[i].userName+"</span>\n" +
                    "                </div>\n" +
                    "                <div class=\"type_div\">\n" +
                    "                    <img style=\"padding-right:20px\" src=\"../images/btn-jinru.png\" height=\"30px\">\n" +
                    "                    <span>&nbsp;</span><span>ID:" + user[i].userNumber+"</span> <span style=\"padding-right:20px;\">"+ user[i].userType+"</span>\n" +
                    "                </div>\n" +
                    "            </div>";
                ;
                $("#list").append(text);
            }
            // document.getElementById("msg").style.display="block";
        },
        "error": function (res) {
        }
    });
}


//确认按钮
function changeName(name) {
    var userNumber = user[changeId].userNumber;
    window.AppJsBridge.service.deviceService.doAction({
        "sn": getLockSN(),
        "deviceClass": "yanggeSmartCivilianDoorLock",
        "action": "editUser",
        "parameters": {
            "userNumber": userNumber,
            "userName": name
        },
        "success": function (res) {
            $("#span" + changeId).html(name);
            console.log("改名成功");
        },
        "error": function (res) {
        }
    });
}


function queryAllUsedId() {
    window.AppJsBridge.service.deviceService.doAction({
        "sn": getLockSN(),
        "deviceClass": "yanggeSmartCivilianDoorLock",
        "action": "queryAllUsedId",
        "parameters": {},
        "success": function (res) {
            console.log("queryAllUsedId Success");

        },
        "error": function (res) {
        },
    });

}

$(document).ready(function () {
    /*var sUserAgent = navigator.userAgent.toLowerCase();
    if (sUserAgent.indexOf('android') > -1) {
        //android
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#"+color.colorPrimary.substring(2,8);
        minorColor = "#"+color.colorPrimary2.substring(2,8);
        $(".group").css("color",primaryColor);

    } else if (sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('ipad') > -1) {
        //ios
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#"+color.colorPrimary.substring(2,8);
        minorColor = "#"+color.colorPrimary2.substring(2,8);
        $(".group").css("color",primaryColor);
    } else {
        //pc
    }*/

    window.AppJsBridge.service.localeService.getResource({
        "success": function (data) {
            resource = data;
            //window.AppJsBridge.service.applicationService.setTitleBar(getResource()["user_management"]);
            initPage();
            load();
        },
        "error": function (data) {
        }
    });
});


function openChangeNameDiv(id) {
    $(".changeNameDiv").css("display", "block");
    $(".inputName").val($("#user" + id).html());
    changeId = id;
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
        $("#user" + changeId).html($(".inputName").val());
        changeName($(".inputName").val());
    })

})

angular.module('myApp', ['ionic']).controller('myCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    //下拉刷新
    $scope.doRefresh = function () {
        load();
        $scope.$broadcast('scroll.refreshComplete');
    };
}])

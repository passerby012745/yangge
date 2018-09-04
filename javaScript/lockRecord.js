var resource = null;
var msg = [];
var height = null;
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

// 获取地址栏的sn
function getLockSN() {
    var urlObj = getUrlParams(decodeURI(window.location.href));
    return urlObj.sn;
}

function load(openType, openName) {
    $("#list").empty();
    if (openName == "" || openName == null) {
        openName = null;
    }
    window.AppJsBridge.service.deviceService.getDevice({
        "sn": getLockSN(),
        "success": function (data) {
            console.log("getDevice", data);
            var src = null;
            msg = data.yanggeSmartCivilianDoorLock.logRecord;

            //去除远程开锁
            for (var i = 0; i < msg.length; i++) {
                if (msg[i].type == 0) {
                    msg.splice(i, 1);
                }
            }

            if (openType == 0) {
                if (openName != null) {
                    for (var i = 0; i < msg.length; i++) {
                        if (msg[i].name == openName) {
                            msg.splice(i, 1);
                        }
                    }
                }
            } else {
                if (openName != null) {
                    for (var i = 0; i < msg.length; i++) {
                        if (msg[i].name == openName || msg[i].type == openType) {
                            msg.splice(i, 1);
                        }
                    }
                } else {
                    for (var i = 0; i < msg.length; i++) {
                        if (msg[i].name == openName) {
                            msg.splice(i, 1);
                        }
                    }
                }
            }

            console.log("处理后的msg长度" + msg.length);
            for (var i = msg.length - 1; i >= 0; i--) {
                var str = null;
                if (msg[i].hasOwnProperty("name")) {
                    str = msg[i].name;
                }
                if (msg[i].type != 0 && msg[i].hasOwnProperty("name")) {
                    switch (msg[i].type) {
                        case 1:
                            src = "../images/zhiwen.png";
                            str = str + getResource()["use_fingerprint_open_the_door"];
                            msg[i].src = src;
                            msg[i].str = str;
                            break;
                        case 2:
                            src = "../images/mima.png";
                            str = str + getResource()["use_password_open_the_door"];
                            msg[i].src = src;
                            msg[i].str = str;
                            break;
                        case 3:
                            src = "../images/card.png";
                            str = str + getResource()["use_card_open_the_door"];
                            msg[i].src = src;
                            msg[i].str = str;
                            break;
                        case 4:
                            src = "../images/yuanchengkaisuo.png";
                            str = getResource()["app_remote_door"];
                            msg[i].src = src;
                            msg[i].str = str;
                            break;
                        case 5:
                            src = "../images/yaoshi.png";
                            str = str + getResource()["use_key_open_the_door"];
                            msg[i].src = src;
                            msg[i].str = str;
                            break;
                        default:
                            break;
                    }
                    var time = new Date(msg[i].time);
                    var year = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate();
                    var hour = time.getHours() + ":" + time.getMinutes();
                    if (time.getMinutes() < 10) {
                        hour = time.getHours() + ":0" + time.getMinutes();
                    }
                    msg[i].year = year;
                    msg[i].hour = hour;
                    var txt = "            <div class=\"msg_div_each\">\n" +
                        "                <div class=\"msg_div_each_time\">\n" +
                        "                    " + year + " <br> <br>\n" +
                        "                    " + hour + "\n" +
                        "                </div>\n" +
                        "                <div class=\"msg_div_each_node\">\n" +
                        "                    <div style=\"height:3rem;width: 1px;border:1px solid " + primaryColor + ";display: block\"></div>\n" +
                        "                    <div style=\"height: 1.5rem;width: 1.5rem;border-radius: 100%;background-color:" + primaryColor + ";\"></div>\n" +
                        "                    <div style=\"height: 3rem;width: 1px;border:1px solid " + primaryColor + "\"></div>\n" +
                        "                </div>\n" +
                        "                <div class=\"msg_div_each_img\">\n" +
                        "                    <img src=\"" + src + "\" height=\"80%\">\n" +
                        "                </div>\n" +
                        "                <div class=\"msg_div_each_desc\">\n" +
                        "                    <span style=\"color: #333333\">" + str + "</span><br>\n" +
                        "                    <span style=\"color: #666666\"> ID:" + msg[i].id + "</span>\n" +
                        "                </div>\n" +
                        "            </div>";
                    // 显示查到的消息
                    $("#list").append(txt);
                }
            }
        },
        "error": function (res) {
        }
    });
}

function search() {
    load($("#type").attr("oliId"), $("#nameInput").val());
}

$(document).ready(function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (sUserAgent.indexOf('android') > -1) {
        //android
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#" + color.colorPrimary.substring(2, 8);
        minorColor = "#" + color.colorPrimary2.substring(2, 8);
         $("#i").css("color",primaryColor);

    } else if (sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('ipad') > -1) {
        //ios
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#" + color.colorPrimary.substring(2, 8);
        minorColor = "#" + color.colorPrimary2.substring(2, 8);
        $("#i").css("color",primaryColor);
    } else {
        //pc
    }

    window.AppJsBridge.service.localeService.getResource({
        "success": function (data) {
            resource = data;
            //window.AppJsBridge.service.applicationService.setTitleBar(getResource()["details_of_the_lock"]);
            initPage();
            $("#nameInput").attr("placeholder",getResource()["please_enter_the_user_to_find"]);
            $("#li1").attr("oliName",getResource()["all"]);
            $("#li2").attr("oliName",getResource()["password"]);
            $("#li3").attr("oliName",getResource()["card"]) ;
            $("#li4").attr("oliName",getResource()["fingerprint"]);
            $("#li5").attr("oliName",getResource()["key"]);
            load(0,null);
        },
        "error": function (data) {
        }
    });
});


$(function () {
    $("#selectType").on("click", function (event) {
        if ($("#typeLi").css("display") == "block") {
            $("#typeLi").css("display", "none");
            return;
        }
        $("#i").removeClass("fa-caret-down").addClass(
            "fa-caret-up")// 当点隐藏ul弹窗时候，把小图标恢复原状
        $("#typeLi").css("display", "block");
        if (event.stopPropagation) {
            // 针对 Mozilla 和 Opera
            event.stopPropagation();
        } else if (window.event) {
            // 针对 IE
            window.event.cancelBubble = true;
        }
        /*
                    * 阻止事件传播，事件从点击的元素出发，向外（window）传播，
                    * 如果不写个阻止事件，会导致下面的document点击函数一起执行，导致显示失败
                    */

    });
    $("#typeLi").on("click", "li", function (event) {
        console.log("click", "click");
        var oliName = $(this).attr("oliName");// 定义一个name属性，获取点击的元素属性赋值到当前，方便动态化传值
        var oliId = $(this).attr("oliId");// 定义一个id属性，获取点击的元素属性赋值到当前，方便动态化传值
        console.log("oliName", oliName);
        console.log("oliId", oliId);
        $("#type").html(oliName);
        $("#type").attr("oliId",oliId);
        //input框赋值为空
        $("#nameInput").val("");
        $("#nameInput").attr("placeholder",getResource()["please_enter_the_user_to_find"]);
        load(oliId,null);
        $("#i").removeClass("fa-caret-up").addClass("fa-caret-down");

    });


    $(document).click(
        function (event) {
            $("#i").removeClass("fa-caret-up").addClass(
                "fa-caret-down")// 当点隐藏ul弹窗时候，把小图标恢复原状
            $(".selectUl").hide();// 当点击空白处，隐藏ul弹窗
        });

})


angular.module('myApp', ['ionic']).controller('myCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    //下拉刷新
    $scope.doRefresh = function () {
        load($("#type").attr("oliId"),$("#nameInput").val());
        $scope.$broadcast('scroll.refreshComplete');
    };
}])
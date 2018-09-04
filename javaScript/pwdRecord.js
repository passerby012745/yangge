var resource = null;
var pwd = null;
color = null;
primaryColor = null;
minorColor = null;

function getparam() {
    var urlObj = getUrlParams(decodeURI(window.location.href));
    return urlObj;
}

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

function loadPage() {
    //msg=本地缓存的pwd
    var msg = JSON.parse(localStorage.getItem("pwd"));
    console.log(msg);
    for (var i = msg.length - 1; i >= 0; i--) {
        var time = new Date(msg[i].time);
        var month = (time.getMonth() + 1) + "/" + time.getDate();
        var hour = time.getHours() + ":" + time.getMinutes();
        if (time.getMinutes() < 10) {
            hour = time.getHours() + ":0" + time.getMinutes();
        }
        if ((msg.length - 1) == i) {
            // var month1 = (time.getMonth() + 1) + "月" + time.getDate() + "日";
            var str1 = getResource()["you_have"] + msg[i].useNum + getResource()["chance_before"] + month + "/" + hour + getResource()["use"];
            var str2 = msg[i].password + getResource()["open_the_door"];
            $("#pwd").html(msg[i].password);
            $("#desc1").html(str1);
            $("#desc2").html(str2);
        }
        var str = month + " " + hour + "  " + getResource()["before1"];
        var txt = "<div class=\"pwd_each\">\n" +
            "                <div class=\"pwd_div\">\n" +
            "                    <span style=\"padding-left: 20px\">" + msg[i].password + "</span>\n" +
            "                </div>\n" +
            "                <div class=\"time_div\">\n" +
            "                    <span style=\"padding-right: 20px\">" + str + "</span><span>&nbsp;</span><span>sssss</span>\n" +
            "                </div>\n" +
            "            </div>";
        $("#list").append(txt);
    }
}

$(document).ready(function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (sUserAgent.indexOf('android') > -1) {
        //android
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#" + color.colorPrimary.substring(2, 8);
        minorColor = "#" + color.colorPrimary2.substring(2, 8);
        $("#btn").css("background-color",primaryColor);
    } else if (sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('ipad') > -1) {
        //ios
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#" + color.colorPrimary.substring(2, 8);
        minorColor = "#" + color.colorPrimary2.substring(2, 8);
        $("#btn").css("background-color",primaryColor);
    } else {
        //pc
    }
    window.AppJsBridge.service.localeService.getResource({
        "success": function (data) {
            resource = data;
            window.AppJsBridge.service.applicationService.setTitleBar(getResource()["backup_password"]);
            initPage();
            loadPage();
        },
        "error": function (data) {
        }
    });
});

angular.module('myApp', ['ionic']).controller('myCtrl', function ($scope, $ionicPopup, $timeout) {
    $scope.copyPwd = function () {
        var Url2 = document.getElementById("pwd").innerText;
        var oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        console.log("copy");
        var myPopup = $ionicPopup.show({
            title: '复制成功',
            scope: $scope,
        });
        $timeout(function () {
            myPopup.close();
        }, 1000);
    }
});

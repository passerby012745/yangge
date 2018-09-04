var resource = null;
var pwd = null;
var primaryColor = null;//主色
var minorColor = null;//次色
var color = null;

function getLockSN() {
    var urlObj = getUrlParams(decodeURI(window.location.href));
    return urlObj.sn;
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

//创建密码
function createPwd() {
    //mivalidTime=有效时间
    var mivalidTime = $("#longValue").html();
    if (getResource()["30min"] == mivalidTime) {
        mivalidTime = 30;
    } else if (getResource()["60min"] == mivalidTime) {
        mivalidTime = 60;
    } else if (getResource()["90min"] == mivalidTime) {
        mivalidTime = 90;
    } else {
        mivalidTime = 120;
    }
    //useNumber=有效次数
    var useNumber =  $("#numValue").html();
    console.log(useNumber);
    console.log(mivalidTime);
    //passwordSend=随机生成的8为数字密码
    var passwordSend = parseInt(Math.random() * (99999999 - 10000000 + 1) + 10000000, 10)+"";
    var password = passwordSend + "#";
    console.log(password);
    window.AppJsBridge.service.deviceService.doAction({

        "sn": getLockSN(),
        "action": "createRemoteAuthuser",
        "deviceClass":"yanggeSmartCivilianDoorLock",
        "parameters": {

            "validTime": mivalidTime,
            "useNumber":  parseInt(useNumber),
            "password": passwordSend,
        },
        "success": function(res) {
            var useTime = Date.parse(new Date()) + (mivalidTime * 60000);
            console.log(useTime);
            var pwdNew = {
                "password": password,
                "useNum": useNumber,
                "time": useTime
            };
            console.log(pwdNew);
            var pwd = [];
            //密码缓存到本地
            if (localStorage.getItem("pwd")) {
                console.log("本地有");
                pwd = JSON.parse(localStorage.getItem("pwd"));
                console.log(pwd);
                pwd.push(pwdNew);
                localStorage.removeItem("pwd");
                localStorage.setItem("pwd", JSON.stringify(pwd));
            } else {
                console.log("本地没有");
                pwd.push(pwdNew);
                localStorage.setItem("pwd", JSON.stringify(pwd));
            }
            //生成密码成功后跳转到密码详情页面
            window.AppJsBridge.service.applicationService.openURL({
                title: getResource()["backup_password"],
                url: "html/pwddetails.html",
                success: function() {},
                error: function() {}
            });
        },
        "error": function(res) {}
    });
}
$(document).ready(function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (sUserAgent.indexOf('android') > -1) {
        //android
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#"+color.colorPrimary.substring(2,8);
        minorColor = "#"+color.colorPrimary2.substring(2,8);
        $("#i1").css("color",primaryColor);
        $("#i1").css("color",primaryColor);
        $(".btn_div").css("background-color",primaryColor);
    } else if (sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('ipad') > -1) {
        //ios
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#"+color.colorPrimary.substring(2,8);
        minorColor = "#"+color.colorPrimary2.substring(2,8);
        $("#i1").css("color",primaryColor);
        $("#i1").css("color",primaryColor);
        $(".btn_div").css("background-color",primaryColor);
    } else {
        //pc
    }
    window.AppJsBridge.service.localeService.getResource({
        "success": function(data) {
            resource = data;
            // window.AppJsBridge.service.applicationService.setTitleBar(getResource()["temporary_password_setting"]);
            $("#li1").attr("oliName",getResource()["30min"]);
            $("#li2").attr("oliName",getResource()["60min"]);
            $("#li3").attr("oliName",getResource()["90min"]) ;
            $("#li4").attr("oliName",getResource()["120min"]);
            initPage();
        },
        "error": function(data) {}
    });
});



$(function() {
    $("#selectLong").on("click", function(event) {
        if( $("#long").css("display")=="block"){
            $("#long").css("display","none");
            return;
        }
        $("#i1").removeClass("fa-caret-down").addClass(
            "fa-caret-up");// 当点隐藏ul弹窗时候，把小图标恢复原状
        $("#long").css("display","block");
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
    $("#long").on("click", "li", function(event) {
        console.log("click", "click");
        var oliName = $(this).attr("oliName");// 定义一个name属性，获取点击的元素属性赋值到当前，方便动态化传值
        var oliId = $(this).attr("oliId");// 定义一个id属性，获取点击的元素属性赋值到当前，方便动态化传值
        console.log("oliName", oliName);
        console.log("oliId", oliId);
        $("#longValue").html(oliName);
        $("#i1").removeClass("fa-caret-up").addClass("fa-caret-down");
    });

    $("#selectNum").on("click", function(event) {
        if( $("#num").css("display")=="block"){
            $("#num").css("display","none");
            return;
        }
        $("#i2").removeClass("fa-caret-down").addClass(
            "fa-caret-up")// 当点隐藏ul弹窗时候，把小图标恢复原状
        $("#num").css("display","block");
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
    $("#selectNum").on("click", "li", function(event) {
        console.log("click", "click");
        var oliName = $(this).attr("oliName");// 定义一个name属性，获取点击的元素属性赋值到当前，方便动态化传值
        var oliId = $(this).attr("oliId");// 定义一个id属性，获取点击的元素属性赋值到当前，方便动态化传值
        console.log("oliName", oliName);
        console.log("oliId", oliId);
        $("#numValue").html(oliName);
        $("#i2").removeClass("fa-caret-up").addClass("fa-caret-down");
    });

    $(document).click(
        function(event) {
            $("#i1").removeClass("fa-caret-up").addClass(
                "fa-caret-down");// 当点隐藏ul弹窗时候，把小图标恢复原状
            $("#i2").removeClass("fa-caret-up").addClass(
                "fa-caret-down")
            $(".selectUl").hide();// 当点击空白处，隐藏ul弹窗
        });

})

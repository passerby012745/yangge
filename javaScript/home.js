var pageTitle = null;
var resource = null;
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


// 加载页面
function loadpage() {
    console.log("进入加载");
    // document.getElementById("page").style.visibility = "hidden";

    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    $("#time").html(hour + ":" + min);

    window.AppJsBridge.service.deviceService.getDevice({
        "sn": getLockSN(),
        "success": function (data) {
            console.log(getLockSN());
            console.log(data);

            if (data.yanggeSmartCivilianDoorLock.logRecord.length > 0) {
                var locktime = new Date(data.yanggeSmartCivilianDoorLock.logRecord[data.yanggeSmartCivilianDoorLock.logRecord.length - 1].time);
                var num = time.getDate() - locktime.getDate();
                var mon = time.getMonth() - locktime.getMonth();
                if (mon == 0) {
                    if (num == 0) {
                        $("#locktime").html(getResource()["today"]);
                    }

                    if (num == 1) {
                        $("#locktime").html(getResource()["yesterday"]);
                    }

                    if (num == 2) {
                        $("#locktime").html(getResource()["vorgestern"]);
                    }

                    if (num > 2) {
                        $("#locktime").html(getResource()["two_days_ago"]);
                    }
                }
            }

            if (data.yanggeSmartCivilianDoorLock.logRecord.length <= 0) {
                $("#locktime").html(getResource()["no_record"]);
            }

            var power = data.batterySensor.batteryLevel;
            console.log(power);
            switch (power) {
                case 0:
                    electric(0);
                    $('#powerMsg').html("0%");
                    ;
                    break;
                case 10:
                    electric(1);
                    $('#powerMsg').html("10%");
                    break;
                case 20:
                    electric(2);
                    $('#powerMsg').html("20%");

                    break;
                case 30:
                    electric(3);
                    $('#powerMsg').html("30%");

                    break;
                case 40:
                    electric(4);
                    $('#powerMsg').html("40%");

                    break;
                case 50:
                    electric(5);
                    $('#powerMsg').html("50%");

                    break;
                case 60:
                    electric(6);
                    $('#powerMsg').html("60%");

                    break;
                case 70:
                    electric(7);
                    $('#powerMsg').html("70%");

                    break;
                case 80:
                    electric(8);
                    $('#powerMsg').html("80%");

                    break;
                case 90:
                    electric(9);
                    $('#powerMsg').html("90%");

                    break;
                case 100:
                    electric(10);
                    $('#powerMsg').html("100%");

                    break;
                default:
                    break;
            }
            if ("online" == data.basic.status) {
               $("#status_desc").css("color",primaryColor);
                $("#status").html(getResource()["online"]);
                $("#status").css("color",primaryColor);
                $(".lock_img_main_div_haveColor").css("background","linear-gradient(to right,"+primaryColor+", white)")
                $(".offLine").css("display", "none");
                if ("lock" == data.doorLock.lockState) {
                    $(".lock_img_main_div_inSide_light").css("background-image", "url(../images/lock_normal.png)");

                }
                if ("unlock" == data.doorLock.lockState) {
                    $(".lock_img_main_div_inSide_light").css("background-image", "url(../images/lock_open.png)");

                }
            } else if ("offline" == data.basic.status) {
                $("#status").css("color","#999999");
                $("#status_desc").css("color","#999999");
                $(".offLine").css("display", "block");
                $("#status").html(getResource()["offline"]);
                $(".lock_img_main_div_haveColor").css("background","linear-gradient(to right,#f3f3f3, #f3f3f3)")


            }
        },
        "error": function (res) {
        }
    });
    //定时刷新
    $(".lock_img_main_div_haveColor").css("animation","none")

    setTimeout(loadpage, 5000);
}

//打开页面 address页面地址
function openPage(address, pageBar) {
    address = address + "?sn=" + getLockSN()+"&primaryColor="+primaryColor;
    window.AppJsBridge.service.applicationService.openURL({
        title: pageBar,
        url: address,
        success: function () {
        },
        error: function () {
        }
    });
}

// 用户管理
function user_control() {
    pageTitle = getResource()["user_management"];
    openPage("html/userList.html", pageTitle);
}

// 临时密码
function temporary_password() {
    pageTitle = getResource()["temporary_password_setting"];
    openPage("html/setPWD.html", pageTitle);
}

// 密码备份
function backup_password() {
    pageTitle = getResource()["backup_password"];
    openPage("html/pwdRecord.html", pageTitle);
}

// 开锁详情
function details_of_the_lock() {
    pageTitle = getResource()["details_of_the_lock"];
    openPage("html/lockRecord.html", pageTitle);
}

function sendCurrentTime() {
    var data = new Date();
    window.AppJsBridge.service.deviceService.doAction({
        "sn": getLockSN(),
        "deviceClass": "yanggeSmartCivilianDoorLock",
        "action": "setClock",
        "parameters": {"currentTime": data.getTime()},
        "success": function (res) {
            console.log("setLock Success");
            setTimeout(queryAllUsedId, 2000);
        },
        "error": function (res) {
        },
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
            setTimeout(queryBattery, 2000);
        },
        "error": function (res) {
        },
    });

}

function queryBattery() {
    window.AppJsBridge.service.deviceService.doAction({
        "sn": getLockSN(),
        "deviceClass": "yanggeSmartCivilianDoorLock",
        "action": "queryBattery",
        "parameters": {},
        "success": function (res) {
            console.log("queryBattery Success");

        },
        "error": function (res) {
        },
    });

}

$(document).ready(function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (sUserAgent.indexOf('android') > -1) {
        //android
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#"+color.colorPrimary.substring(3,9);
        minorColor = "#"+color.colorPrimary2.substring(3,9);
    } else if (sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('ipad') > -1) {
        //ios
        color = JSON.parse(window.szsbay.getColorConfig());
        primaryColor = "#"+color.colorPrimary.substring(3,9);
        minorColor = "#"+color.colorPrimary2.substring(3,9);
    } else {
        //pc
    }

    window.AppJsBridge.service.localeService.getResource({
        "success": function (data) {
            resource = data;
            // window.AppJsBridge.service.applicationService.setTitleBar(getResource()["smart_door_lock"]);
            initPage();
            loadpage();
            setTimeout(sendCurrentTime, 2000);

        },
        "error": function (data) {
        }
    });
});

function electric(j) {
    $("#electric").empty();
    if (j != 0) {
        for (var i = 1; i <= 10; i++) {
            if (i <= j) {
            	 var text = "<div class=\"electric_div\" style='background-color:"+primaryColor+";'></div>";
                $("#electric").append(text);
            } else {
                var text = "<div class=\"electric_div\" style='background-color:red;'></div>";
                $("#electric").append(text);
            }

        }
    }

 

    if (j == 0) {
       
            for (var i = 1; i <= 10; i++) {
                var text = "<div class=\"electric_div\" style='background-color:#f3f3f3;'></div>";
                $("#electric").append(text);
            }
        
    }
}


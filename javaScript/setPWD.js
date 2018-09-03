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

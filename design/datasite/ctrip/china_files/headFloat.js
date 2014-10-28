; window.replace = function () { return '' }; var headFloat = { config: { validMsg: { format: "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801\u3002", success: "\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536\u77ed\u4fe1", fail: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5" }, reg: { phoneFormat: "/^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9][0-9]{8}$/" }, pl: { simple: "\u8bf7\u8f93\u5165\u624b\u673a\u53f7", big5: "\u8acb\u8f38\u5165\u624b\u6a5f\u865f"} }, comm: { checkEnv: function () {
    return "www." + (document.getElementById("siteDomainHeadFloat") ?
document.getElementById("siteDomainHeadFloat").value : "ctrip") + ".com"
}, addFloatEventHandler: function (a, b, c) { (a.attachEvent ? a.attachEvent("on" + b, c) : (a.addEventListener ? a.addEventListener(b, c, !1) : a["on" + b] = c)) }, contains: function (a, b) { return (a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)) }, checkHover: function (a, b) {
    try {
        return ("mouseover" == popUp.getEvent(a).type ? !popUp.contains(b, popUp.getEvent(a).relatedTarget || popUp.getEvent(a).fromElement) && (popUp.getEvent(a).relatedTarget || popUp.getEvent(a).fromElement) !==
b : !popUp.contains(b, popUp.getEvent(a).relatedTarget || popUp.getEvent(a).toElement) && (popUp.getEvent(a).relatedTarget || popUp.getEvent(a).toElement) !== b)
    } catch (c) { } 
}, getEvent: function (a) { return a || window.event } 
}, func: { checkFocus: 0, checkRemove: 0, init: function () { this.renderFloat(); this.bindEvent(); this.hackPl() }, renderFloat: function () {
    var a = document.createElement("div"); a.id = "head_float_box"; a.className = "cui_wireless_box"; a.style.display = "none"; a.innerHTML = "<div class='cui_wireless_inbox'><a id='head_float_close' href='javascript:;' class='cui_wireless_close'>&times;</a><dl class='cui_wireless_type'><dt>1</dt><dd><p class='cui_wireless_title'>\u53d1\u9001\u4e0b\u8f7d\u5730\u5740\u81f3\u624b\u673a</p><div id='head_float_num' class='cui_input_box'><input type='text' class='cui_wireless_input' placeholder='\u8bf7\u8f93\u5165\u624b\u673a\u53f7' pl='\u8bf7\u8f93\u5165\u624b\u673a\u53f7' maxlength='11' /><span class='cui_input_close' style='visibility:hidden'>&times;</span></div><input type='button' id='head_float_sendMsg' class='cui_wireless_btn' value='\u514d\u8d39\u83b7\u53d6'><div id='head_float_qtip' class='cui_wireless_msg' style='display:none'><i class='cui_ico_s'></i>\u77ed\u4fe1\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u7a0d\u540e\u67e5\u770b</div></dd></dl><dl class='cui_wireless_type'><dt>2</dt><dd><p class='cui_wireless_title'>\u624b\u673a\u626b\u63cf\u5feb\u901f\u4e0b\u8f7d</p><i class='cui_wireless_code'></i></dd></dl><a id='head_float_outlink' class='cui_link_app'>\u643a\u7a0b\u65c5\u884c\u624b\u673a\u7248<i></i></a></div>";
    document.getElementById("head_float_level").appendChild(a)
}, hackPl: function () {
    var a = document.getElementById("head_float_num").getElementsByTagName("input")[0]; if (0 < navigator.userAgent.indexOf("MSIE 6.0") || 0 < navigator.userAgent.indexOf("MSIE 7.0") || 0 < navigator.userAgent.indexOf("MSIE 8.0") || 0 < navigator.userAgent.indexOf("MSIE 9.0")) a.value = a.attributes.pl.value, headFloat.comm.addFloatEventHandler(a, "focus", function () {
        if (!a.value || a.value === headFloat.config.pl.simple || a.value === headFloat.config.pl.big5) a.value =
""
    }), headFloat.comm.addFloatEventHandler(a, "blur", function () { a.value || (a.value = a.attributes.pl.value) })
}, bindEvent: function () { 0 > navigator.userAgent.indexOf("Pad") && (this.floatShow(), this.floatHide()); this.floatClick(); this.floatClose(); this.floatOutlinkClick(); this.floatInputEvent(); this.sendMsg() }, floatShow: function () {
    var a = document.getElementById("head_float_level"), b = this; (0 < navigator.userAgent.indexOf("MSIE") || 0 < navigator.userAgent.indexOf("Firefox") || 0 < navigator.userAgent.indexOf("Chrome") ? headFloat.comm.addFloatEventHandler(a,
"mouseenter", function (a) { setTimeout(function () { b.boxShow() }, 150); b.checkRemove = 0 }) : headFloat.comm.addFloatEventHandler(a, "mouseover", function (a) { setTimeout(function () { b.boxShow() }, 150); b.checkRemove = 0 }))
}, floatHide: function () {
    var a = document.getElementById("head_float_level"); document.getElementById("head_float_box"); var b = this; (0 < navigator.userAgent.indexOf("MSIE") || 0 < navigator.userAgent.indexOf("Firefox") || 0 < navigator.userAgent.indexOf("Chrome") ? headFloat.comm.addFloatEventHandler(a, "mouseleave", function (a) {
        b.checkFocus ||
setTimeout(function () { b.boxHide() }, 250); b.checkRemove = 1
    }) : headFloat.comm.addFloatEventHandler(a, "mouseout", function (a) { !document.getElementById("head_float_level").contains(a.toElement) && !b.checkFocus && setTimeout(function () { b.boxHide() }, 250); b.checkRemove = 1 }))
}, floatClick: function () {
    var a = this; (0 < navigator.userAgent.indexOf("Pad") ? headFloat.comm.addFloatEventHandler(document.getElementById("head_float_level").getElementsByTagName("a")[0], "click", function () {
        ("cui_wireless" == document.getElementById("head_float_level").className ?
a.boxShow() : window.open("http://app.ctrip.com", "_blank"))
    }) : headFloat.comm.addFloatEventHandler(document.getElementById("head_float_level").getElementsByTagName("a")[0], "click", function () { window.open("http://app.ctrip.com", "_blank") }))
}, floatClose: function () { var a = document.getElementById("head_float_close"), b = this; headFloat.comm.addFloatEventHandler(a, "click", function () { b.boxHide() }) }, floatOutlinkClick: function () {
    var a = document.getElementById("head_float_outlink"), b = this; headFloat.comm.addFloatEventHandler(a,
"click", function () { window.open("http://app.ctrip.com", "_blank"); b.boxHide() })
}, floatInputEvent: function () {
    var a = document.getElementById("head_float_num").getElementsByTagName("input")[0], b = document.getElementById("head_float_num").getElementsByTagName("span")[0], c = this; headFloat.comm.addFloatEventHandler(a, "focus", function () {
        document.getElementById("head_float_num").getElementsByTagName("span")[0].style.visibility = "visible"; document.getElementById("head_float_num").getElementsByTagName("input")[0].className =
"cui_wireless_input"; c.checkFocus = 1
    }); headFloat.comm.addFloatEventHandler(a, "blur", function (a) { setTimeout(function () { c.checkFocus = 0; c.checkRemove && c.boxHide(); document.getElementById("head_float_num").getElementsByTagName("span")[0].style.visibility = "hidden" }, 150) }); headFloat.comm.addFloatEventHandler(b, "click", function (a) { document.getElementById("head_float_num").getElementsByTagName("input")[0].value = ""; document.getElementById("head_float_qtip").style.display = "none"; c.hackPl() })
}, sendMsg: function () {
    var a =
document.getElementById("head_float_sendMsg"); headFloat.comm.addFloatEventHandler(a, "click", function (b) {
    document.getElementById("head_float_qtip").style.display = "none"; b = document.getElementById("head_float_num").getElementsByTagName("input")[0].value; if (function (a) { return (!a || !a.match(eval(headFloat.config.reg.phoneFormat)) ? 0 : 1) } (b)) {
        var c = document.createElement("script"); c.type = "text/javascript"; c.async = !0; c.src = "http://crm.ws.ctrip.com/Promotion/sms/JsonpSendSMS.ashx?tel=" + b + "&type=c41&callback=headFloat.MsgFB";
        document.getElementsByTagName("head")[0].appendChild(c); a.className = "cui_wireless_btn_disabled"; a.disabled = "true"; var d = 60, e = setInterval(function () { (0 < d ? (a.value = "(" + d + "\u79d2\u540e)\u91cd\u65b0\u83b7\u53d6\u77ed\u4fe1", d--) : clearInterval(e)) }, 1E3); setTimeout(function () { a.value = "\u514d\u8d39\u83b7\u53d6"; a.className = "cui_wireless_btn"; a.disabled = "" }, 61E3)
    } else b = document.getElementById("head_float_qtip"), b.style.display = "block", b.innerHTML = "<i class='cui_ico_w'></i>" + headFloat.config.validMsg.format,
document.getElementById("head_float_num").getElementsByTagName("input")[0].className = "cui_wireless_input cui_input_error"
})
}, boxShow: function () { document.getElementById("head_float_box").style.display = "block"; document.getElementById("head_float_level").className += " cui_wireless_hover" }, boxHide: function () { document.getElementById("head_float_box").style.display = "none"; document.getElementById("head_float_level").className = "cui_wireless" } 
}, MsgFB: function (a) {
    (a.Status ? (document.getElementById("head_float_qtip").innerHTML =
"<i class='cui_ico_s'></i>" + a.Message) : ((document.getElementById("head_float_qtip").innerHTML = "<i class='cui_ico_w'></i>" + a.Message, document.getElementById("head_float_num").getElementsByTagName("input")[0].className = "cui_wireless_input cui_input_error"))); document.getElementById("head_float_qtip").style.display = "block"
} 
}; headFloat.func.init();
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-3748357-1']);
	_gaq.push(['_setDomainName', '.ctrip.com']);
	_gaq.push(['_setAllowHash', false]);
	_gaq.push(['_addOrganic', 'soso', 'w']);
	_gaq.push(['_addOrganic', 'sogou', 'query']);
	_gaq.push(['_addOrganic', 'youdao', 'q']);
	_gaq.push(['_addOrganic', 'so.360.cn', 'q']);//添加360搜索
	_gaq.push(['_addOrganic', 'so.com', 'q']);//添加360搜索另一域名
	_gaq.push(['_trackPageview']);
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    (function() {
	  if ('http:' == document.location.protocol)
	  {
		  var nts = document.createElement('script'); nts.type = 'text/javascript'; nts.async = true;
          nts.src = "http://webresource.c-ctrip.com/rescrmonline/r6/onlineui/common/__nts.js?20140408";
		  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(nts, s);
	  }
       })();

	//通用再营销代码
	(function (d) {
	window.bd_cpro_rtid="PWTzPjD";
	var s = d.createElement("script");s.type = "text/javascript";s.async = true;s.src = location.protocol + "//cpro.baidu.com/cpro/ui/rt.js";
	var s0 = d.getElementsByTagName("script")[0];s0.parentNode.insertBefore(s, s0);
    var footer=document.getElementById("footer");
    if(footer==null)footer=document.getElementById("base_ft");
    if(footer==null)footer=document.getElementsByTagName("body")[0];
    if(footer!=null)footer.innerHTML=footer.innerHTML+"<div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"//googleads.g.doubleclick.net/pagead/viewthroughconversion/1066331136/?value=0&label=cG9hCIyRngMQgNi7_AM&guid=ON&script=0\"/></div>";
	})(document);
	
	function addfavor(url,title) {
		   var ua = navigator.userAgent.toLowerCase();
		   if (ua.indexOf("msie 8") > -1) {
					  window.external.AddToFavoritesBar(url,title,title);//IE8
		   } else {
				 try {
					  window.external.addFavorite(url, title);
				 } catch(e) {
						 try {
								window.sidebar.addPanel(title, url, "");//firefox 
						 } catch(e) {
									 alert("请使用Ctrl+D添加收藏");
						}
				 }
		   }
	}
	
	function request(url, options){
        options = options || {};
        var data = options.data || "",
         async = !(options.async === false),
         method = (options.method || "GET").toUpperCase(),
         success = options.success,
         xhr;
        function getXHR() {
             if (window.ActiveXObject) {
                  try {
                       return new ActiveXObject("Msxml2.XMLHTTP");
                  } catch (e) {
                       try {
                           return new ActiveXObject("Microsoft.XMLHTTP");
                      } catch (e) {}
                 }
            }
            if (window.XMLHttpRequest) {
                 return new XMLHttpRequest();
            }
            }
        function stateChangeHandler() {
        try {
             var stat = xhr.status;
        } catch (ex) {
             return;
        }
        if (xhr.readyState == 4) {
             if ((stat >= 200 && stat < 300)
                  || stat == 304
                  || stat == 1223) {
                      success(xhr);
                 }
                 window.setTimeout( function() {
                      xhr.onreadystatechange = blank;
                      if (async) {
                           xhr = null;
                      }
                 }, 0);
            }
            }
            try {
            xhr = getXHR();
            if (method == 'GET') {
                 if (data) {
                      url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
                      data = null;
                 }
            }
            xhr.open(method, url, async);
            if (async) {
                 xhr.onreadystatechange = stateChangeHandler;
            }
            if (method == 'POST') {
                 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.send(data);
            if (!async) {
                 stateChangeHandler();
            }
            } catch (ex) {}
            return xhr;
    }
	
(function(){
	//globalConfig
	var config = {
        url: {
//            loginAjax: ('https:' == document.location.protocol ? 'https://' : 'http://') + globalConfig.AjaxUrl+'/member/ajax/AjaxGetCookie.ashx',
            loginAjax: 'https://' + globalConfig.AjaxUrl+'/member/ajax/AjaxGetCookie.ashx',
            orderAjax: '',
            vacationAjax: 'Tool/vacationAjax.asp',
            hotelAjax: 'Tool/hotelAjax.asp',
            flightAjax: 'Tool/flightAjax.asp'
        },
		H1:globalConfig.H1==null||globalConfig.H1==undefined?'https':globalConfig.H1,
		H3:globalConfig.H3==null||globalConfig.H3==undefined?'my.ctrip.com':globalConfig.H3,
		AjaxUrl:globalConfig.AjaxUrl==null||globalConfig.AjaxUrl==undefined?'accounts.ctrip.com':globalConfig.AjaxUrl,
		Lang:globalConfig.Lang==null||globalConfig.Lang==undefined?'gb2312':globalConfig.Lang
    };

	var addFloatEventHandler=function(obj,eventName,fun) {
		var fn = fun;
		if(obj.attachEvent){
			obj.attachEvent('on'+eventName,fn);
		}else if(obj.addEventListener){
			obj.addEventListener(eventName,fn,false);
		}else{
			obj["on" + eventName] = fn;
		}
	};
	var addClass=function (id,className){
		var element = document.getElementById(id);
		if(element.className == ""){
			element.className = className;
		}else{
			element.className += " "+className;
		}
	};
	//获取Cbi
	var createScript=function (url, isAsync){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = isAsync;
		s.src = url;
		var h = document.getElementsByTagName('head')[0];
		h.appendChild(s);
	};
    var backUrl;
	try {
		backUrl = escape(decodeURIComponent(location.href)).replace(/\//g,"%2F");
	} catch(e) {
		backUrl = "";
	}
	window.GetUserHTML=function (){	
		var temp=Math.random();
        //international hotel utf8 issue
        var isUncode;
        if(document.getElementById('bsType')) {
            isUncode = document.getElementById('bsType').value == "1" ? 1 : 0;
        }
//		var ajaxUrl1 = ('https:' == document.location.protocol ? 'https://' : 'http://') + config.AjaxUrl+'/member/ajax/AjaxGetCookie.ashx?jsonp=BuildHTML&r='+temp+'&encoding='+isUncode; 
        var ajaxUrl1 = 'https://'+ config.AjaxUrl+'/member/ajax/AjaxGetCookie.ashx?jsonp=BuildHTML&r='+temp+'&encoding='+isUncode; 
		createScript(ajaxUrl1, true);
	};
	window.DoLogin=function ()
	{
		  window.location.href = config.H1+"://"+config.AjaxUrl+"/member/login.aspx?BackUrl="+backUrl + "&responsemethod=get";
	};
	
	window.BuildHTML=function (data)
	{
		var thisURL = document.URL;
		var userhtml = "";
		var strhtml = "";
		var vstrshow  = "";
		var remindhtml = "";
		
		var vconfig={"v2":"未提交订单","v3":"未出行订单","v4":"待点评订单","v14": "我的携程","v15": "我的携程首页","v16": "会员","loginname":"登录","registeredname":"注册"}
		if(config.Lang.toLowerCase()=='big5'){
			vconfig={"v2": "未提交訂單","v3": "未出行訂單","v4": "待點評訂單","v14": "我的攜程","v15": "我的攜程首頁","v16": "會員","loginname": "登錄","registeredname": "註冊"}
		}
		
		if(data==null){
			strhtml += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://"+config.H3+"/home/myinfo.aspx\" class=\"cui_myctrip_status\">" + vconfig.v14 + "</a><b></b>";
			strhtml += "<div class=\"cui_myctrip_lr\">";
			strhtml += "<a rel=\"nofollow\" id=\"c_ph_login\" class=\"cui_links_login\" rel=\"nofollow\" href=\""+config.H1+"://"+config.AjaxUrl+"/member/login.aspx?BackUrl="+backUrl + "&responsemethod=get\">" + vconfig.loginname + "</a>";
			strhtml += "|";
			strhtml += "<a rel=\"nofollow\" id=\"c_ph_register\" href=\""+config.H1+"://"+config.AjaxUrl+"/member/emailregist.aspx\" class=\"cui_links_reg\">" + vconfig.registeredname + "</a>";
			strhtml += "</div>";
						
			vstrshow +="<input type=\"button\" onclick=\"DoLogin()\" id = \"myctripButton\" class=\"basebtns_01\" value=\"" + vconfig.loginname + "\" />";
			vstrshow +="<a rel=\"nofollow\" href=\"http://"+config.H3+"/home/myinfo.aspx\">" + vconfig.v15 + "</a>";
		}else
		if(data.hascookieuser == "F")
		{
			strhtml += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://"+config.H3+"/home/myinfo.aspx\" class=\"cui_myctrip_status\">" + vconfig.v14 + "</a><b></b>";
			strhtml += "<div class=\"cui_myctrip_lr\">";
			strhtml += "<a rel=\"nofollow\" id=\"c_ph_login\" class=\"cui_links_login\" rel=\"nofollow\" href=\""+config.H1+"://"+config.AjaxUrl+"/member/login.aspx?BackUrl="+ backUrl + "&responsemethod=get\">" + vconfig.loginname + "</a>";
			strhtml += "|";
			strhtml += "<a rel=\"nofollow\" id=\"c_ph_register\" href=\""+config.H1+"://"+config.AjaxUrl+"/member/emailregist.aspx\" class=\"cui_links_reg\">" + vconfig.registeredname + "</a>";
			strhtml += "</div>";
						
			vstrshow +="<input type=\"button\" onclick=\"DoLogin()\" id = \"myctripButton\" class=\"basebtns_01\" value=\"" + vconfig.loginname + "\" />";
			vstrshow +="<a rel=\"nofollow\" href=\"http://"+config.H3+"/home/myinfo.aspx\">" + vconfig.v15 + "</a>";
		}
		else
		{
                strhtml += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://"+config.H3+"/home/myinfo.aspx\" class=\"cui_myctrip_status\">" + vconfig.v14 + "</a>";
				if(data.usershortname !="")
				{
					if(data.usershortname != data.username)
					{
						data.usershortname = data.username.substring(0, 7) + "…";
					}
					//样式控制长度
					strhtml += "<div class=\"cui_myctrip_username\" title=\"" + data.username + "\">" + data.username + "</div>";
				}
				else
				{
					if(data.vipgradename == "普通会员" || data.vipgradename == "普通會員")
					{
						data.vipgradename = vconfig.v16;
					}
					strhtml += "<div class=\"cui_myctrip_username\" title=\"" + "尊敬的" + data.vipgradename + "\">" +  "尊敬的" + data.vipgradename + "</div>";
				}
				strhtml += "<b></b>";	
				strhtml += "<a rel=\"nofollow\" id=\"c_ph_logout\" href=\""+config.H1+"://"+config.AjaxUrl+"/member/logout.aspx\" class=\"cui_links_exit\">退出</a>";	
				if(data.noreadmessagecount != "0")
					strhtml += "<a rel=\"nofollow\" href=\"http://"+config.H3+"/Home/message/messagelist.aspx?status=F\" class=\"cui_links_msg\">" + data.noreadmessagecount + "</a>";				

			
			vstrshow +="<a rel=\"nofollow\" href=\"http://"+config.H3+"/home/myinfo.aspx\">" + vconfig.v15 + "</a>";			
			addClass("loginDivLi","cui_myctrip_hover");
		}
		document.getElementById("notLogin").innerHTML = strhtml;
		document.getElementById("div_user").innerHTML = vstrshow;			
	};
	
	var doLangEvent=function (){	
		addFloatEventHandler(document.getElementById('cui_lang_en'),'click',function(e) {
				setLangCookie({"Customer":"HAL=ctrip_en"},"");
				setLangCookie({"_ctm_t":"ctrip" },"off");
		});
		var cui_langlist=document.getElementById("cui_lang_list");
		languageClick(cui_langlist.getElementsByTagName("a"));
		var langbot=document.getElementById("cui_lang_bottom");
		languageClick(langbot.getElementsByTagName("a"));		
	};
	var languageClick=function (langlis){	
		for(var i=0,len=langlis.length;i<len;i++){
			var that = this;
			addFloatEventHandler(langlis[i],'click',function(e) {
				var lang =this.className.replace('cui_lang','ctrip');
				setLangCookie({"Customer":"HAL="+lang},"");
				setLangCookie({"_ctm_t":"ctrip" },"off");
			});
		}
	};
	var setLangCookie=function (keyMap,keyType) {
        var sub_domain = (document.domain || "").replace(/^[\w\W]*\.ctrip(travel)??\.com(.hk)??/,"ctrip$1.com$2");
        var a = [];
        for (var k in keyMap) {
            var s = keyMap[k] === null ? "" : keyMap[k];
            a.push(k + "=" + s);
        }
        var expdate = new Date();
        expdate.setDate(expdate.getDate()+7);
        if(keyType == ""){
            document.cookie = a.join("&") + "; expires=" + expdate.toGMTString() + "; domain="+sub_domain+";path=/;";
        }else{
			document.cookie = a.join("&") + "; domain="+sub_domain+";path=/;";
        }
    };
	
	GetUserHTML(); 
	doLangEvent();	



//登录模块
var ctripLogin = function(){
	var that = this;
	var isLogin = false,
	Event = {
		onmouseenter: function(o, f){
			if (document.all) {
				o.onmouseenter = function(e){
					f();
				};
			} else {
				o.onmouseover = function(e) {
					e.relatedTarget == null ? f() : (!(this === e.relatedTarget || this.compareDocumentPosition(e.relatedTarget) == 20) && f());
				};
			}
		},
		onmouseout: function(o, f){
			if (document.all) {
				o.onmouseleave = f;
			} else {
				o.onmouseout = function(e) {
					e.relatedTarget == null ? f() : (!(this === e.relatedTarget || this.compareDocumentPosition(e.relatedTarget) == 20) && f());
				}
			}
		},
		bindLogin: function(){
			this.onmouseenter(document.getElementById('loginDivLi') , function(){
                document.getElementById('loginDivLi').getElementsByTagName('b')[0].className = "b_h";
                document.getElementById('loginDivLi').getElementsByTagName('b')[1].className = "b_h";
				document.getElementById('loginDiv').style.display = 'block';
			});
			this.onmouseout(document.getElementById('loginDivLi'), function(){
                document.getElementById('loginDivLi').getElementsByTagName('b')[0].className = "";
                document.getElementById('loginDivLi').getElementsByTagName('b')[1].className = "";
				document.getElementById('loginDiv').style.display = 'none';
				document.getElementById('notLoginDiv').style.display = 'none';
			});
		}
	},
	Func = {
		request: function(url){
			request(url, {
				async: true,
				method: 'POST',
				onsuccess: function (response) {
					var isLogin = response.responseText.split('@@')[0];
					var userName = response.responseText.split('@@')[1];
					that.isLogin = (new Function("return ("+isLogin+');'))();
					if(that.isLogin){						
						document.getElementById('yetLogin').style.display = '';
						document.getElementById('notLogin').style.display = 'none';
						document.getElementById('usernameId').innerHTML = userName + '<br/>我的携程';
						Func.requestOrder();
					}
				}
			});
		},
		requestOrder: function(){
			request(config.url.orderAjax,{
				async: true,
				method: 'POST',
				onsuccess: function (response) {
					var res = (new Function("return ("+response.responseText+');'))();
					document.getElementById('notSubmitBtn').innerHTML = res.UnSubmitOrder;
					document.getElementById('notTravelBtn').innerHTML = res.WaitAllReviewCount;
					document.getElementById('notSayBtn').innerHTML = res.NotravelOrder;
				}
			});
		}
	};
	Event.bindLogin();	
	//Func.request(config.url.loginAjax);
}();

})();
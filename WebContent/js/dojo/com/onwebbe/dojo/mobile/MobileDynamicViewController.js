/* 
 * Author:
 * onwebbe - Tai
 * 
 * Created On:
 * 30 Jul 2014
 * 
 * Version:
 * 1.0
 * 
 */
define("com/onwebbe/dojo/mobile/MobileDynamicViewController", [
	"dijit/registry",
	"dojo/_base/declare",
	"dojo/query",
	"dojo/request",
	"dijit/registry",
	"dojox/mobile/parser",
	"dojo/parser",
	"dojox/mobile/_ExecScriptMixin",
	"dojox/mobile/ProgressIndicator",
	"dojo/dom-construct"
], function(registry, declare, query, request, registry, parser, mainParser, ScriptExecutor, ProgressIndicator,domCon){
	/* 
	 * Module:
	 * com.onwebbe.dojo.mobile.MobileDynamicViewController
	 * com/onwebbe/dojo/mobile/MobileDynamicViewController
	 * 
	 * Summary:
	 * Support the dynamic loading of the view from other files through URL (view ID should be different)(same view ID will not load and direct route to the existing view
	 * Support back history
	 * Support user routing map
	 * Support clear activity
	*/
	
	var _theCurrView = null;
	var _newViewID = "";
	var _theHTMLNode = null;
	var _theReplaceHTMLNode = null;
	var _theReplaceParentNode = null;
	var _p = null;
	
	//history support
	var _historyArray = new Array();
	var _historyAllArray = new Array();
	var _cachedViewIDs = new Array();
	var _currentViewIndex = 0;
	var _needLogHistory = true;
	
	
	var overlaytext = '<div style="position:absolute;z-index:999;color:black;top:0px;left:0px;background-color:rgba(80,80,80,0.5);display:none;" id="totalFullScreenOverlay">&nbsp;</div>';
	var overlayele = domCon.toDom(overlaytext);
	_overlay = overlayele;
	dojo.body().appendChild(_overlay);
	//prepare overlay
	var w = window.innerWidth;
	var h = window.innerHeight;
	dojo.query("#totalFullScreenOverlay")[0].style.width=w+"px";
	dojo.query("#totalFullScreenOverlay")[0].style.height=h+"px";
	
	var dynamicView =  declare("com.onwebbe.dojo.mobile.MobileDynamicViewController", null, {
		needRunscript: true,
		needProgress: true,
		_p: null,
		constructor: function(bNeedRunScript, bNeedProgress){
			this.needProgress = bNeedProgress;
			this.needRunscript = bNeedProgress;
			if(this.needProgress){
				_p = ProgressIndicator.getInstance();
			}
			
		},
		setCurrentView: function(cv){
			_theCurrView = cv;
		},
		getCurrentView: function(){
			return _theCurrView;
		},
		switchView: function(sURL, sName, needHistory){
			if(needHistory==false) _needLogHistory = false;
			var that = this;
			showOverlay();
			if(_p){
				_p.start();
			}
			if(_theCurrView==null){
				_theCurrView = registry.byNode(query("div",dojo.body())[0]);
			}
			setTimeout(function(){
				request(sURL).then(
		                function(text){
		                	//create temp node
		                	var importDom = domCon.toDom(text);
		                	//get first run script node as well as the html node
		                	var theScriptNode = query("div",importDom)[0];
		                	var thePureScriptNode = query("script", theScriptNode)[0];
		                	var tempInnerHTML = thePureScriptNode.innerHTML;
		                	//tempInnerHTML = tempInnerHTML+"\n"+"com.onwebbe.dojo.mobile.MobileDynamicViewController._callBackFromPage();";
		                	thePureScriptNode.innerHTML = tempInnerHTML;
		                	var htmlNode = query("div",importDom)[1];
		                	_theHTMLNode = htmlNode;
		                	//need parse the html then ignore the outer div
		            		
		                	
		                	
		                	//get the innerHTML which parsed and remove the out div and append the real node
		                	var innerChild = htmlNode.children[0];
		                	//dojo.body().removeChild(htmlNode);
		                	//dojo.body().appendChild(innerChild);
		                	
		                	
		                	var newAddID = innerChild.id;
		                	_newViewID = newAddID;
		                	if(registry.byId(newAddID)!=null){
		                		dynamicView.switchToViewID(newAddID);
		                		_historyArray.push(newAddID);
		                		hideOverlay();
		                		return;
		                	}
		                	if(that.needRunscript==true){
		                		new ScriptExecutor().execScript(theScriptNode.innerHTML);
		                	}
		                	
		                	
		                	//
		                	
		                },
		                function(error){
		                    alert("error:"+error);
		                }
		            );
			},100);
			
		},
		back : function(){
			showOverlay();
			_currentViewIndex = _currentViewIndex-1;
			var backID = _historyArray[_currentViewIndex];
			_historyArray.pop();
			_theCurrView.performTransition('#'+backID,-1,"slide",function(){com.onwebbe.dojo.mobile.MobileDynamicViewController.hideOverlay();});
			_theCurrView = registry.byId(backID);
			hideOverlay();
		}
	});
	dynamicView._callBackFromPage = function(requireHide){
		
		dojo.body().appendChild(_theHTMLNode);
		var elements = parser.parse(_theHTMLNode);
		
		//get the innerHTML which parsed and remove the out div and append the real node
		
    	var innerChild = _theHTMLNode.children[0];
    	dojo.body().removeChild(_theHTMLNode);
    	dojo.body().appendChild(innerChild);
    	
		//that._currView.performTransition('#'+newAddID,1,"slide",null);
		var prevViewID = _theCurrView.id;
		_historyArray[_currentViewIndex]=prevViewID;
		
		
		dynamicView.switchToViewID(_newViewID);
    	if(_p){
    		_p.stop();
		}
    	if(requireHide){
    		hideOverlay();
    	}
	};
	dynamicView.switchToViewID = function(id){
		_newViewID = id;
		_theCurrView.performTransition('#'+_newViewID,1,"slide",function(){com.onwebbe.dojo.mobile.MobileDynamicViewController.hideOverlay();});
		_theCurrView = registry.byId(_newViewID);
		if(_needLogHistory){
			_historyArray.push(_newViewID);
		}
		_historyAllArray.push(_newViewID);
		_currentViewIndex = _currentViewIndex+1;
		if(_p){
    		_p.stop();
		}
	};
	dynamicView.clearCache = function(id){
		if(typeof id=="undefined"){
			dojo.forEach(_historyArray, function(value, key){
				var tempCacheElement = registry.byId(value);
				if(tempCacheElement!=null){
					tempCacheElement.destroyDescendants();
				}
			});
		}else{
			var tempCacheElement = registry.byId(id);
			if(tempCacheElement!=null){
				tempCacheElement.destroyDescendants();
			}
		}
	};
	dynamicView.replaceContent = function(sURL, parentNode){
		var that = this;
		showOverlay();
		if(_p){
			_p.start();
		}
		_theReplaceParentNode = parentNode;
		var parentDijit = registry.byNode(parentNode);
		parentDijit.destroyDescendants();
		setTimeout(function(){
			request(sURL).then(
	                function(text){
	                	//create temp node
	                	var importDom = domCon.toDom(text);
	                	//get first run script node as well as the html node
	                	var theScriptNode = query("div",importDom)[0];
	                	var thePureScriptNode = query("script", theScriptNode)[0];
	                	var tempInnerHTML = thePureScriptNode.innerHTML;
	                	//tempInnerHTML = tempInnerHTML+"\n"+"com.onwebbe.dojo.mobile.MobileDynamicViewController._callBackFromPage();";
	                	thePureScriptNode.innerHTML = tempInnerHTML;
	                	var htmlNode = query("div",importDom)[1];
	                	//need parse the html then ignore the outer div
	            		
	                	
	                	_theReplaceHTMLNode = htmlNode;
	                	//get the innerHTML which parsed and remove the out div and append the real node
	                	var innerChild = htmlNode.children[0];
	                	//dojo.body().removeChild(htmlNode);
	                	//dojo.body().appendChild(innerChild);
	                	
	                	//need parse the html then ignore the outer div
	                	new ScriptExecutor().execScript(theScriptNode.innerHTML);

	            		
	                },
	                function(error){
	                    alert("error:"+error);
	                }
	            );
		},100);
	};
	dynamicView._callBackReplaceContentFromPage = function(requireHide){
		
		_theReplaceParentNode.appendChild(_theReplaceHTMLNode);
		var elements = parser.parse(_theReplaceHTMLNode);
		
		//get the innerHTML which parsed and remove the out div and append the real node
		
    	var innerChild = _theReplaceHTMLNode.children[0];
    	_theReplaceParentNode.removeChild(_theReplaceHTMLNode);
    	_theReplaceParentNode.appendChild(innerChild);
    	
    	if(_p){
    		_p.stop();
		}
    	hideOverlay();
	};
	showOverlay = function(){
		if(_overlay){
			_overlay.style.position="absolute";
			_overlay.style.left="0px";
			_overlay.style.top="0px";
			_overlay.style.width=w+"px";
			_overlay.style.height=h+"px";
			_overlay.style.display="block";
		}
	};
	hideOverlay = function(){
		if(_overlay){
			_overlay.style.display="none";
		}
	};
	dynamicView.showOverlay = showOverlay;
	dynamicView.hideOverlay = hideOverlay;
	dynamicView.getCurrentView = function(){
		return _theCurrView;
	};
	return dynamicView;
});

define("com/onwebbe/dojo/mobile/travelPlan/TravelDraftInfoPane", [
	"dojo/_base/declare",
	"dojox/mobile/Pane",
	"dojo/json",
	"dojox/mobile/Button",
	"dojox/mobile/parser",
	"dojo/dom-construct",
	"dijit/registry",
	"dojo/dom-geometry",
	"dojo/on"
], function(declare, Pane, JSON, Button, parser, domCon, registry, geometry, on){
	/* Module:
	 * com.onwebbe.dojo.mobile.common.AddDocView
	 * 
	 * Summary:
	*/
	var travelDraftInfoPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelDraftInfoPane", Pane, {
		_theDataObj :  {tid:"t1",name:"Hongkong",img:"",lastModifyDate:"2014-10-02 11:00:00",createDate:"2014-10-03 11:00:00",stage:"plan",planDate:"2014-12-03",color:"yellow"},
		_contentObject : null,
		_height : "300px",
		_deleteElement : null,
		constructor: function(/*Object*/params, /*DomNode?*/node){
			// summary:
			//		Creates a new instance of the class.
			// params:
			//		Contains the parameters.
			// node:
			//		The DOM node. If none is specified, it is automatically created. 
			this.inherited(arguments);
			var paramData = params.data;
			var theDataStr = null;
			if(typeof paramData!="undefined"){
				this._theDataObj = paramData;
			}else{
				theDataStr = node.getAttribute("data");
			}
			if(theDataStr!=null){
				console.log(theDataStr);
				this._theDataObj = JSON.parse(theDataStr, true);
			}
		},
		postCreate: function(){
			var node = this.domNode;
			//node.style.margin="10px";
			if(this.isAddElement()){
				this._contributeAddElement(node);
			}else{
				this._contributeContentDataElement(node);
			}
		},
		startup: function(){
			var geoMain = geometry.getMarginBox(this.domNode);
			console.log("geoMain");
			console.log(geoMain);
			if(this.isAddElement()){
				var addImageElement = dojo.query("img.addImage", this.domNode)[0];
				var geoAdd = geometry.getMarginBox(addImageElement)
				if(geoMain.w>geoMain.h){
					addImageElement.width = geoMain.h-150;
					addImageElement.height = geoMain.h-150;
				}else{
					addImageElement.width = geoMain.w-120;
					addImageElement.height = geoMain.w-120;
				}
			}else{
				var contentImageElement = dojo.query("img.contentImage", this.domNode)[0];
				var geoContent = geometry.getMarginBox(contentImageElement);
				contentImageElement.height = geoMain.h-204;
				/*if(geoContent.w>geoContent.h){
					contentImageElement.width = geoMain.w-200;
				}else{
					contentImageElement.height = geoMain.h-204;
				}*/
			}
		},
		setDataStr : function(datastr){
			if(datastr!=null){
				this._theDataObj = tjson.parse(datastr);
			}
		},
		setDataObj : function(data){
			this._theDataObj = data;
		},
		_contributeAddElement : function(node){
			var contentStr="<div style='margin:30px;cursor:crosshair;text-align:center;background-color:#f3f3f3;border-top-left-radius:20px;border-top-right-radius:20px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;'><table style='height:100%;width:100%;'>"
					+"<tr><td style='cursor:crosshair;align:center;text-align:center;valign:middle;'><img class='addImage' style='background-color:#dbdbdb;padding:8%;border-top-left-radius:20px;border-top-right-radius:20px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;' src='../../images/circle_add_plus.png'></td></td>"
					+"</table></div>";
			var contentDom = domCon.toDom(contentStr);
			contentDom.style.height=this._height;
			this._contentObject = contentDom;
			
			node.appendChild(contentDom);
		},
		_contributeContentDataElement : function(node){
			var that = this;
			var travelInfo = this._theDataObj;
			var contentStr="<div style='margin:30px;border:1px solid #bbbbbb;background-color:#f5f5f5;border-top-left-radius:20px;border-top-right-radius:20px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;'>"
								+"<div style='height:30px;line-height:30px;border:1px solid #dddddd;background-color:#c7c7c7;padding-top:8px;padding-bottom:4px;text-align:center;font-weight:bolder;border-top-left-radius:20px;border-top-right-radius:20px'>"
								+"<div style='float:left;display:none;cursor:pointer;'><img class='deleteElement' style='margin-left:15px;background-color:#f9a4b1;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;' src='../../images/delete-trash-30.png'></div>"
								+"香港"
								+"</div>"
								+"<table style='padding-top:4px;width:100%;'><tr><td style='text-align:center;align:center;valign:middle'>"
								+"<div style='text-align:center;'>"
								+"	<img class='contentImage' width='250px' src=../../contentImages/hk.jpg>"
								+"</div>"
								+"<div style='text-align:center;font-family: sans-serif;font-size:8pt;'>"
								+"	<table align='center'>"
								+"	<tr>"
								+"		<td style='text-align:right;'>修改日期:</td><td style='text-align:left;'>2014-10-02</td>"
								+"	</tr>"
								+"	<tr>"
								+"		<td style='text-align:right;'>创建日期</td><td style='text-align:left;'>2014-10-03</td>"
								+"	</tr>"
								+"	<tr>"
								+"		<td style='text-align:right;'>进度</td><td style='text-align:left;'>plan</td>"
								+"	</tr>"
								+"	<tr>"
								+"		<td style='text-align:right;'>出发日期</td><td style='text-align:left;'>2014-12-03</td>"
								+"	</tr>"
								+"	</table>"
								+"</td></tr></table></div>"
								+"</div>";
			var contentDom = domCon.toDom(contentStr);
			contentDom.style.height=this._height;
			this._contentObject = contentDom;
			
			var deleteElement = dojo.query(".deleteElement",contentDom)[0];
			this._deleteElement = deleteElement;
			
			/*dojo.connect(deleteElement, "onclick", function(){
				//var gridElement = registry.byId(that.domNode.parentNode.id);
				//gridElement.removeChild(that);
				//gridElement.postCreate();
				that.destroyRecursive();
			});*/
			this.own(on(deleteElement, "click", function(){
				that.destroyRecursive();
			}));
			node.appendChild(contentDom);
		},
		isAddElement : function(){
			return this._theDataObj.type=="add";
		},
		enterEditMode : function(isEdit){
			if(!this.isAddElement()&&this._contentObject!=null){
				var tmpelements = dojo.query("div > div",this._contentObject);
				if(tmpelements!=null&&tmpelements.length>0){
					if(isEdit){
						tmpelements[0].style.display="inline-block";
					}else{
						tmpelements[0].style.display="none";
					}
				}
			}
		}
	});
	return travelDraftInfoPane;
});

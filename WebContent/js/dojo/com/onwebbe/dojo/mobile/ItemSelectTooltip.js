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
define("com/onwebbe/dojo/mobile/ItemSelectTooltip", ["dojo/_base/declare",
                                                     "dojox/mobile/Tooltip",
                                                     "dojox/mobile/RoundRectList",
                                                     "dojox/mobile/ListItem",
                                                     "dojox/mobile/Button",
                                                     "dojo/dom-geometry",
                                                     "dojo/Evented",
                                                     "dojo/aspect",
                                                     "dijit/registry"	
], function(declare, Tooltip, RoundRectList, ListItem, Button, geometry, Event, aspect, registry){
	/* 
	 * Module:
	 * com.onwebbe.dojo.mobile.ItemSelectTooltip
	 * com/onwebbe/dojo/mobile/ItemSelectTooltip
	 * 
	 * Event
	 * listItemClicked
	 * 
	 */
	
	var groupUtil =  declare("com.onwebbe.dojo.mobile.ItemSelectTooltip", [Tooltip,Event], {
		theData : null, //[{"id":"CN","label":"中国","labelE":"China","labelP":"ZhongGuo"}]
		aroundElement : null,
		displayEle : "",//"","labelE","labelP" or others
		contentEle : null,
		selectedData : null,
		isViewable : false,
		constructor: function(/*Object*/params, /*DomNode?*/node){
			if(params!=null){
				this.theData = params.data;
				this.displayEle=params.displayEle;
			}
			if(this.displayEle==null){
				this.displayEle = "";
			}
			//this.theData = com.onwebbe.dojo.mobile.travelPlan.TravelDataJSONStore.getTargetType();
			//this.theData = [{"id":"CN","label":"中国","labelE":"China","labelP":"ZhongGuo"},{"id":"AM","label":"美国","labelE":"America","labelP":"MeiGuo"},{"id":"CN1","label":"意大利","labelE":"China","labelP":"ZhongGuo"},{"id":"AM1","label":"美国","labelE":"America","labelP":"MeiGuo"}];
		},
		postCreate: function(){
			//this.on("listItemClicked", listItemClicked);
			var that = this;
			this.domNode.style.align="center";
			this.domNode.style.textAlign="center";
			var roundRectList = new RoundRectList();
			var closeButton = new Button({label:"关闭"});
			closeButton.own(closeButton.on("click",function(){
				that.hide();
			}));
			this.domNode.appendChild(closeButton.domNode);
			this.domNode.appendChild(roundRectList.domNode);
			
			
			this.contentEle = roundRectList;
			
			this.createList();
			
			this.own(aspect.after(this,"hide",function(){
				that.innerHide();
			}));
		},
		updateData : function(data){
			this.theData = data;
		},
		createList : function(){
			var that = this;
			var roundRectList = this.contentEle;
			this.contentEle.destroyDescendants();
			var allItems = new Array();
			var maxWidth = 0;
			if(this.theData!=null){
				for(i=0;i<this.theData.length;i++){
					var tmpData = this.theData[i];
					var theID = tmpData.id;
					var theLabel = tmpData.label;
					if(this.displayEle!=""){
						theLabel = tmpData[this.displayEle];
					}
					registry.remove(theID);
					var childListItem = new ListItem({id:theID, 
						 								//icon:"images/icon.png", 
						 								//rightText:"Off", 
						 								//moveTo:"bar",
														clickable : true,
						 								label:theLabel});
					childListItem.listData = tmpData;
					//console.log(theWidth);
					
					roundRectList.addChild(childListItem);
					allItems.push(childListItem);
					var theWidth = geometry.getContentBox(childListItem.domNode);
					if(theWidth.w>maxWidth){
						maxWidth = theWidth.w;
					}
					that.own(childListItem.on("click",function(){
						that.selectedData = this.listData;
						that.emit("listItemClicked",this.listData);
						setTimeout(function(){
							that.hide();
							that.createList();
						},300);
					}));
				}
				for(i=0;i<allItems.length;i++){
					var theGeo = geometry.getContentBox(childListItem.domNode);
					theGeo.w = maxWidth+30;
					geometry.setContentSize(allItems[i].domNode,theGeo);
				}
			}
		},
		showTip : function(parentElement){
			this.show(parentElement, ['above-centered','after','before']);
			this.isViewable = true;
		},
		innerHide : function(){
			this.isViewable = false;
		},
		destroy : function(){
			this.contentEle.destroyDescendants();
		}
	});
	return groupUtil;
});
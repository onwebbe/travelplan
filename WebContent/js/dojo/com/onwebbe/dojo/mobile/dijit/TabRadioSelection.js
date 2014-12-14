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
define("com/onwebbe/dojo/mobile/dijit/TabRadioSelection", ["dojo/_base/declare",
                                                     "dojox/mobile/RoundRect",
                                                     "dojox/mobile/RoundRectList",
                                                     "dojox/mobile/ListItem",
                                                     "dojox/mobile/Button",
                                                     "dojo/dom-geometry",
                                                     "dojo/Evented",
                                                     "dojo/aspect",
                                                     "dijit/registry",
                                                     "dojo/dom-style"
], function(declare, RoundRect, RoundRectList, ListItem, Button, geometry, Event, aspect, registry, domstyle){
	/* 
	 * Module:
	 * com.onwebbe.dojo.mobile.dijit.TabRadioSelection
	 * com/onwebbe/dojo/mobile/dijit/TabRadioSelection
	 * 
	 * Event
	 * listItemClicked
	 * 
	 */
	
	var groupUtil =  declare("com.onwebbe.dojo.mobile.ItemSelectTooltip", [RoundRect,Event], {
		theData : null,
		_selectedID : "",
		_selectors : new Array(),
		_selectedBoxStyle:{boxShadow:"3px 3px 2px grey inset", backgroundColor:"#d1fbc6"},
		_noneSelectedBoxStyle:{boxShadow:"3px 3px 2px grey", backgroundColor:"white"},
		postCreate: function(){
			this.domNode.style="margin:2px;box-shadow:1px 1px 2px grey;";
		},
		setSelected : function(selected){
			this._selectedID = selected;
		},
		updateData : function(data, defaultSelected){
			var that = this;
			if(typeof tabRadioSelect=="undefined"){
				defaultSelected="";
			}
			this._selectedID = defaultSelected;
			this.theData = data;
			this.destroyDescendants();
			this._selectors = new Array();
			for(i=0;i<data.length;i++){
				var itemRoundRect = new RoundRect({style:"color:black;cursor:pointer;display:inline-block;margin-top:2px;margin-bottom:2px;margin-left:8px;margin-right:5px;"});
				if(typeof data[i].value=="undefined"){
					data[i].value = data[i].id;
				}
				itemRoundRect.data = data[i];
				itemRoundRect.on("click", function(){
					var thisDijit = registry.byNode(this);
					that.selectItem(thisDijit.data.value);
					that.emit("listItemClicked",thisDijit.data);
				});
				itemRoundRect.domNode.innerHTML = itemRoundRect.data.label;
				this.addChild(itemRoundRect);
				that._selectors.push(itemRoundRect);
			}
			this.selectItem(defaultSelected);
		},
		selectItem : function(selected){
			var that = this;
			this._selectedID = selected;
			var selectors = this._selectors;
			for(selectI = 0;selectI<selectors.length;selectI++){
				var selector = selectors[selectI];
				if(selector.data.value==selected){
					domstyle.set(selector.domNode, that._selectedBoxStyle)
					//selector.domNode.style.boxShadow=that._selectedBoxStyle;
				}else{
					domstyle.set(selector.domNode, that._noneSelectedBoxStyle)
					//selector.domNode.style.boxShadow=that._noneSelectedBoxStyle;
				}
			}
		},
		destroy : function(){}
	});
	return groupUtil;
});
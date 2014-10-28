define("com/onwebbe/dojo/mobile/travelPlan/TargetListContentPane", [
	"dojo/_base/declare",
	"dojox/mobile/Pane",
	"dojo/json",
	"dojox/mobile/Button",
	"dojox/mobile/parser",
	"dojo/dom-construct",
	"dijit/registry",
	"dojo/_base/array",
	"dojo/on"
], function(declare, Pane, JSON, Button, parser, domCon, registry, array, on){
	/* Module:
	 * com.onwebbe.dojo.mobile.common.AddDocView
	 * 
	 * Summary:
	*/
	var targetListContentPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TargetListContentPane", Pane, {
		_data : {},
		_dataListGroups : new Array(),
		_dataListGroupNames : new Array(),
		_currentGroupIDCount : 0,
		_currentGroupIDStr : "TargetListContentPane_GroupBy_Item_ID_",
		_currentGroupBy : "",
		constructor: function(/*Object*/params, /*DomNode?*/node){
			// summary:
			//		Creates a new instance of the class.
			// params:
			//		Contains the parameters.
			// node:
			//		The DOM node. If none is specified, it is automatically created. 
			this.inherited(arguments);
			
		},
		postCreate: function(){
			
		},
		_groupBy: function(data, groupbyName){
			var groupData = {};
			array.forEach(data, function(item, idx, arr){
				var groupBy = item[groupbyName];
				if(!groupData[groupBy]){
					var tmpData = new Array();
					tmpData.push(item);
					groupData[groupBy] = tmpData;
				}else{
					groupData[groupBy].push(item);
				}
			});
			return groupData;
		},
		updateDataBy: function(data, groupbyName, displayItemName, groupDisplayElement, groupListElement, onclickElementFun){
			/*var existingtargets = dojo.query("[id^=TargetListContentPane_GroupBy]",this.domNode);
			for(i=0;i<existingtargets.length;i++){
				console.log(existingtargets[i]);
				registry.byNode(existingtargets[i]).destroyRecursive();
			}*/
			if(groupbyName==null||""==groupbyName){
				groupbyName = this._currentGroupBy;
			}else{
				this._currentGroupBy = groupbyName;
			}
			console.log("GroupBy:"+groupbyName);
			var groupByElement = this._groupBy(data, groupbyName);
			var count=0;
			this._currentGroupIDCount = 0;
			if(typeof onclickElementFun != "function"){
				onclickElementFun = function(){};
			}
			
			
			for(groupbyitem in groupByElement){
				
				var groupArrayItems = groupByElement[groupbyitem];
				if(groupArrayItems==null) continue;
				
				
				var groupbyitemtempid = this._generateGroupID();
				var datatext = '<span><a style="padding-right:10px;" data-dojo-type="dojox/mobile/Pane" href="#" onclick="TravelMainAddView.scrollToTarget(\''+groupbyitemtempid+'\');" id="'+groupbyitemtempid+"_Names"+'">'+groupbyitem+'</a>&nbsp;&nbsp;</span>';
				var dataDom = domCon.toDom(datatext);
				parser.parse(dataDom);
				groupDisplayElement.appendChild(dataDom.firstChild);
				
				var dataOuterText = '<ul data-dojo-type="dojox/mobile/RoundRectList" id="'+groupbyitemtempid+'"></ul>';
				var dataOuterObj=domCon.toDom(dataOuterText);
				this._dataListGroups[groupbyitemtempid]=dataOuterObj;
				this._dataListGroupNames[groupbyitemtempid]=dataDom;
				for(i=0;i<groupArrayItems.length;i++){
					var tmpData = groupArrayItems[i];
					var tmpDataText = '<li data-dojo-type="dojox/mobile/ListItem" data-dojo-props=\'moveTo:"#", transition:"slide"\'>'+tmpData[displayItemName]+'</li>';
					var tmpDataObj = domCon.toDom(tmpDataText);
					tmpDataObj.dataobj = tmpData;
					dataOuterObj.appendChild(tmpDataObj);
					this.own(on(tmpDataObj,"click", function(){
						onclickElementFun(this.dataobj);
					}));
				}
				var dataListText = "<div><span data-dojo-type='dojox/mobile/Pane' id='"+groupbyitemtempid+"_Pane"+"'>&nbsp;&nbsp;"+groupbyitem+"</span></div>";
				var dataListDom = domCon.toDom(dataListText);
				dataListDom.appendChild(dataOuterObj);
				parser.parse(dataListDom);
				groupListElement.appendChild(dataListDom);
			}
		},
		_generateGroupID : function(){
			return this._currentGroupIDStr+this._currentGroupIDCount++;
		}
		/*,
		removeGroup : function(groupID){
			var element = this._dataListGroups[groupID];
			registry.byId(groupID).destroyRecursive();
			delete(this._dataListGroups[groupID]);
		}*/,
		removeAllGroups : function(){
			for(group in this._dataListGroups){
				var groupIDPane = group+"_Pane";
				var groupIDNames = group+"_Names";
				var groupID = group;
				registry.byId(groupIDPane).destroyRecursive();
				registry.byId(groupID).destroyRecursive();
				registry.byId(groupIDNames).destroyRecursive();
				delete(this._dataListGroups[groupID]);
				delete(this._dataListGroupNames[groupID]);
			}
			this._dataListGroups = new Array();
			this._dataListGroupNames = new Array();
			
			
			this._currentGroupIDCount = 0;
		},
		addGroup : function(groupListElement, groupLabel){
			var groupbyitemtempid = this._generateGroupID();
			var datatext = '<a href="#" onclick="TravelMainAddView.scrollToTarget(\''+groupbyitemtempid+'\');">'+groupbyitem+'</a>&nbsp;&nbsp;';
			var dataDom = domCon.toDom(datatext);
			groupDisplayElement.appendChild(dataDom);
			
			var dataOuterText = '<ul data-dojo-type="dojox/mobile/RoundRectList" id="'+groupbyitemtempid+'"></ul>';
			var dataOuterObj=domCon.toDom(dataOuterText);
			this._dataListGroups[dataOuterObj.id]=dataOuterObj;
			
			var dataListText = "<div><span>&nbsp;&nbsp;"+groupbyitem+"</span></div>";
			var dataListDom = domCon.toDom(dataListText);
			dataListDom.appendChild(dataOuterObj);
			parser.parse(dataListDom);
			groupListElement.appendChild(dataListDom);
		},
		addGroupItem : function(groupID, itemData, displayItemName, onclickElementFun){
			var dataOuterObj = this._dataListGroups[groupID];
			if(dataOuterObj==null) return;
			if(typeof onclickElementFun != "function"){
				onclickElementFun = function(){};
			}
			var tmpData = itemData;
			var tmpDataText = '<li data-dojo-type="dojox/mobile/ListItem" data-dojo-props=\'moveTo:"#", transition:"slide"\'>'+tmpData[displayItemName]+'</li>';
			var tmpDataObj = domCon.toDom(tmpDataText);
			tmpDataObj.dataobj = tmpData;
			dataOuterObj.appendChild(tmpDataObj);
			this.own(on(tmpDataObj,"click", function(){
				onclickElementFun(this.dataobj);
			}));
		}
	});
	return targetListContentPane;
});

define("com/onwebbe/dojo/mobile/travelPlan/TravelPackageItemListPane", 
	[
	 	"dojo/_base/declare",
 		"dijit/registry",
 		"dojo/dom-geometry",
 		"dojo/window",
 		"dojox/mobile/RoundRect",
 		"dojo/dom-construct",
 		"com/onwebbe/dojo/mobile/GroupDataUtil",
 		"dojox/mobile/ContentPane",
 		"com/onwebbe/dojo/mobile/ItemSelectTooltip",
 		"dojox/mobile/parser",
 		"dojox/mobile/RoundRectList",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/ScrollablePane",
 		"dojox/mobile/RoundRect",
 		"dojox/mobile/Accordion",
 		"dojox/mobile/Button",
 		"dojox/mobile/ScrollablePane",
 		"dojox/mobile/ListItem"
 		], 
 	function(declare, registry, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, ItemSelectTooltip, parser){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemListPane
	 * com/onwebbe/dojo/mobile/travelPlan/TravelPackageItemListPane
	 * 
	 * Summary:
	*/
	var getGroupLabel = function(groupData, searchid, labelName){
		if(typeof labelName=="undefined"||labelName==null||labelName==""){
			labelName = "label";
		}
		var foundDataLabel = null;
		for(i=0;i<groupData.length;i++){
			var data = groupData[i];
			if(data.id==searchid){
				foundDataLabel = data[labelName];
				break;
			}
		}
		return foundDataLabel;
	}
	var travelPackageItemListPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemListPane", [RoundRect], {
		_theData : null,
		_groupData : null,
		_listScrollPane : null,
		_tooltip : null,
		postCreate: function(){
			this.inherited(arguments);
			var that = this;
			this.destroyDescendants();
			//this.domNode.className="mainPagePackageInfoPackageItemPane";
			//add for title
			var titleDIVEle = domCon.create("div", titleDIVEle);
			titleDIVEle.innerHTML="打包列表";
			this.domNode.appendChild(titleDIVEle);
			
			//add for function buttons
			var functionP = domCon.create("div", {style:"margin-top:5px;"});
			var cateSearchDijit = new dojox.mobile.Button({label:"分类查询", style:"text-align:center;display:inline-block;width:200px;"});
			functionP.appendChild(cateSearchDijit.domNode);
			var listSearchDijit = new dojox.mobile.Button({label:"编辑", style:"text-align:center;display:inline-block;;float:right;"});
			functionP.appendChild(listSearchDijit.domNode);
			
			this.domNode.appendChild(functionP);
			
			
			var listOuterScrollPane = new dojox.mobile.ScrollablePane({style:"margin-top:5px;"});
			this.domNode.appendChild(listOuterScrollPane.domNode);
			this._listScrollPane = listOuterScrollPane;
			
			
			//set size of the screen element
			var totalWindowSize = win.getBox();
			var headerEle = dojo.query("div[data-dojo-type='dojox/mobile/Heading']",dojo.query("#mainFunctionView")[0])[0];
			var headerHeight = domgeo.getContentBox(headerEle);
			var actualHeight = totalWindowSize.h - headerHeight.h - 82+20;
			var eachPaneWidth = (totalWindowSize.w-24*2-14*2-20*3)/3;
			var mainPagePackageInfoPackageItemPane = this.domNode;
			//mainPagePackageInfoPackageItemPane.style.width = eachPaneWidth + 73*2-20+"px";
			var packageListScrollPane = listOuterScrollPane.domNode;
			var packageListBox = domgeo.getContentBox(packageListScrollPane);
			packageListBox.h=actualHeight-4-34;
			packageListBox.w=mainPagePackageInfoPackageItemPane.style.width;
			domgeo.setContentSize(packageListScrollPane, packageListBox); 
			
			
			//prepare Tooltip

			var tooltip = new ItemSelectTooltip();
			tooltip.parentRootElement = cateSearchDijit;
			tooltip.on("listItemClicked",function(itemData){
				//console.log(itemData);
				var itemDataGroupID = itemData.id;
				var groupSelectEle = dojo.query("."+itemDataGroupID, that._listScrollPane.domNode)[0];
				if(groupSelectEle==null){
					
				}else{
					var topY = groupSelectEle.offsetTop;
        	     	topY = topY;
					that._listScrollPane.slideTo({"y":-topY},0.5);
					//console.log(groupSelectEle);
					//that._listScrollPane.scrollTo(groupSelectEle);
				}
				
			});
			this.addChild(tooltip);
			this._tooltip = tooltip;
			cateSearchDijit.on("click", function(){
				tooltip.showTip(cateSearchDijit.domNode);
			});
			
		},
		createItem : function(itemData){
			var cateItemLabel = itemData.label;
			var itemID = "TravelPackageItemListPaneItemList_"+itemData.id;
			var existItemDijit = registry.byId(itemID);
			if(existItemDijit!=null){
				existItemDijit.destroyRecursive();
			}
			var listItemText = '<div><div id='+itemID+' data-dojo-type="dojox/mobile/ListItem" style="" data-dojo-props="deleteIcon:\'../../images/delete-trash-30.png\', rightText:\'<div class=mainPagePackageListNotReady></div>\', rightIcon:\'../../images/notes-30.png\'">'+cateItemLabel+'</div></div>';
			var listItemEle = domCon.toDom(listItemText);
			var categoryItemListItem = parser.parse(listItemEle)[0];
			var categoryItemListItemEle = dojo.query(".mblListItemDeleteIcon", categoryItemListItem.domNode)[0];
			categoryItemListItemEle.itemData = itemData;
			categoryItemListItemEle.style.backgroundColor="#f9a4b1";
			categoryItemListItemEle.style.display="none";
			/*var categoryItemListItem = new dojox.mobile.ListItem({label:cateItemLabel, icon:'../../images/delete-trash-30.png', rightText:'<div class=mainPagePackageListNotReady></div>', rightIcon:'../../images/notes-30.png'});
			categoryItemListItem.set("icon", '../../images/delete-trash-30.png');
			categoryItemListItem.set("deleteIcon", '../../images/delete-trash-30.png');*/
			return categoryItemListItem;
		},
		updateData: function(theData, groupData){
			var that = this;
			this._theData = theData;
			this._groupData = groupData;
			var listP = this._listScrollPane;
			var listPEle = dojo.query("div:eq(0)",this._listScrollPane.domNode)[0];
			listP.destroyDescendants();
			var groupData = new GroupDataUtil();
			groupData.setFunction("category");
			groupData.addItems(this._theData);
			var groups = groupData.getGroups();
			console.log(groups);
			for(var groupCountIndex=0;groupCountIndex<groups.length;groupCountIndex++){
				var groupID = groups[groupCountIndex];
				console.log(groupCountIndex+":"+groupID);
				var groupLabel = getGroupLabel(this._groupData, groupID);
				//insert category title
				var groupTitleEle = domCon.create("div");
				groupTitleEle.innerHTML=groupLabel;
				groupTitleEle.className=groupID;
				listPEle.appendChild(groupTitleEle);
				//insert category items
				var categoryItems = groupData.getGroupItems(groupID);
				var categoryItemsRoundedList = new dojox.mobile.RoundRectList({style:"margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:5px;"});
				for(var groupItemIndex=0;groupItemIndex<categoryItems.length;groupItemIndex++){
					var categoryItem = categoryItems[groupItemIndex];
					var categoryItemListItem = this.createItem(categoryItem);
					categoryItemsRoundedList.addChild(categoryItemListItem);
				}
				listPEle.appendChild(categoryItemsRoundedList.domNode);
			}
			
			//prepare tooltipdata
			var tooltip = this._tooltip;
			tooltip.updateData(this._groupData);
			tooltip.createList();
		},
		destory : function(){
			var listP = this._listScrollPane;
			listP.destroyDescendants();
		}
	});
	return travelPackageItemListPane;
});

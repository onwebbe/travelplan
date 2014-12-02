define("com/onwebbe/dojo/mobile/travelPlan/TravelPackageItemListPane", 
	[
	 	"dojo/_base/declare",
	 	"dojo/Evented",
 		"dijit/registry",
 		"dojo/dom-geometry",
 		"dojo/window",
 		"dojox/mobile/RoundRect",
 		"dojo/dom-construct",
 		"com/onwebbe/dojo/mobile/GroupDataUtil",
 		"dojox/mobile/ContentPane",
 		"com/onwebbe/dojo/mobile/ItemSelectTooltip",
 		"dojox/mobile/parser",
 		"dojox/mobile/CheckBox",
 		"dojo/on",
 		"dojox/mobile/RoundRectList",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/ScrollablePane",
 		"dojox/mobile/RoundRect",
 		"dojox/mobile/Accordion",
 		"dojox/mobile/Button",
 		"dojox/mobile/ScrollablePane",
 		"dojox/mobile/ListItem"
 		], 
 	function(declare, Evented, registry, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, ItemSelectTooltip, parser, CheckBox, on){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemListPane
	 * com/onwebbe/dojo/mobile/travelPlan/TravelPackageItemListPane
	 * noteMarkClicked
	 * 
	 * Summary:
	*/
	var getGroupData = function(groupData, searchid, labelName){
		if(typeof labelName=="undefined"||labelName==null||labelName==""){
			labelName = "label";
		}
		var foundDataLabel = null;
		for(i=0;i<groupData.length;i++){
			var data = groupData[i];
			if(data.id==searchid){
				foundDataLabel = data;
				break;
			}
		}
		return foundDataLabel;
	}
	var travelPackageItemListPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemListPane", [RoundRect, Evented], {
		_theData : null,
		_groupData : null,
		_listScrollPane : null,
		_tooltip : null,
		_itemIndex : 0,
		_dataModuleData: null,
		getItemIndex : function(){
			return this._itemIndex++;
		},
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
			var listEditDijit = new dojox.mobile.Button({label:"编辑", style:"text-align:center;display:inline-block;;float:right;"});
			functionP.appendChild(listEditDijit.domNode);
			
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
			this.own(tooltip.on("listItemClicked",function(itemData){
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
				
			}));
			this.addChild(tooltip);
			this._tooltip = tooltip;
			this.own(cateSearchDijit.on("click", function(){
				tooltip.showTip(cateSearchDijit.domNode);
			}));
			listEditDijit.isDelStatus = false;
			this.own(listEditDijit.on("click", function(){
				if(this.isDelStatus==false){
					var delIcons = dojo.query(".mblListItemDeleteIcon", that.domNode);
					for(delIconIndex = 0;delIconIndex<delIcons.length;delIconIndex++){
						var delIcon = delIcons[delIconIndex];
						delIcon.style.display="block";
					}
				}
				if(this.isDelStatus==true){
					var delIcons = dojo.query(".mblListItemDeleteIcon", that.domNode);
					for(delIconIndex = 0;delIconIndex<delIcons.length;delIconIndex++){
						var delIcon = delIcons[delIconIndex];
						delIcon.style.display="none";
					}
				}
				this.isDelStatus = !this.isDelStatus;
			}));
		},
		createItem : function(itemData){
			var that = this;
			var cateItemLabel = itemData.label;
			var itemIndex = this.getItemIndex();
			var itemID = "TravelPackageItemListPaneItemList_"+itemData.id+"_"+itemIndex;
			var itemCategoryID = itemData.backupCategory;
			var existItemDijit = registry.byId(itemID);
			if(existItemDijit!=null){
				existItemDijit.destroyRecursive();
			}
			var listItemText = '<div><div id="'+itemID+'" category="'+itemCategoryID+'" data-dojo-type="dojox/mobile/ListItem" style="" data-dojo-props="deleteIcon:\'../../images/delete-trash-30.png\', rightText:\'<div style=margin-right:15px; class=mainPagePackageListNotReady></div>\', rightIcon:\'../../images/notes-30.png\'">'+cateItemLabel+'</div></div>';
			var listItemEle = domCon.toDom(listItemText);
			var categoryItemListItem = parser.parse(listItemEle)[0];
			categoryItemListItem.category = itemCategoryID;
			var categoryItemListItemEle = dojo.query(".mblListItemDeleteIcon", categoryItemListItem.domNode)[0];
			categoryItemListItemEle.itemData = itemData;
			categoryItemListItemEle.style.backgroundColor="#f9a4b1";
			categoryItemListItemEle.style.display="none";
			/*var categoryItemListItem = new dojox.mobile.ListItem({label:cateItemLabel, icon:'../../images/delete-trash-30.png', rightText:'<div class=mainPagePackageListNotReady></div>', rightIcon:'../../images/notes-30.png'});
			categoryItemListItem.set("icon", '../../images/delete-trash-30.png');
			categoryItemListItem.set("deleteIcon", '../../images/delete-trash-30.png');*/
			var checkBoxItemID = "CheckBox_TravelPackageItemListPaneItemList_"+itemData.id+"_"+itemIndex;
			var checkBox = new dojox.mobile.CheckBox({id:checkBoxItemID, style:""});
			this.own(checkBox.on("click", function(){
				var checkboxValue = this.get("value"); //on or false
				if("on"==checkboxValue){
					categoryItemListItem.set("style", "background-color:#beffa3;");
				}else{
					categoryItemListItem.set("style", "background-color:#ffffff;")
				}
			}));
			var mainPagePackageListNotReadyEle = dojo.query(".mainPagePackageListNotReady", categoryItemListItem.domNode)[0];
			mainPagePackageListNotReadyEle.appendChild(checkBox.domNode);
			mainPagePackageListNotReadyEle.appendChild(domCon.create("label",{"for":checkBoxItemID, innerHTML:"已备好"}))
			
			
			var delIcon = dojo.query(".mblListItemDeleteIcon", categoryItemListItem.domNode)[0];
			delIcon.style.borderRadius="5px";
			delIcon.style.cursor="pointer";
			delIcon.parentItemDijit = categoryItemListItem;
			this.own(on(delIcon, "click", function(){
				//console.log(this.parentItemDijit.domNode);
				this.parentItemDijit.destroyRecursive();
			}));
			
			
			//prepare edit note
			var noteIcon = dojo.query(".mblListItemRightIcon", categoryItemListItem.domNode)[0];
			noteIcon.style.cursor="pointer";
			this.own(on(noteIcon, "click", function(){
				that.emit("noteMarkClicked", itemData);
			}));
			return categoryItemListItem;
		},
		updateData: function(theData, groupData){
			var that = this;
			
			
			//prepare Data
			var packageListItemCategorys = dojo.clone(groupData);
			for(i=0;i<packageListItemCategorys.length;i++){
				var itemCategory = packageListItemCategorys[i];
				var backupID = itemCategory.id;
				itemCategory.id="PACKAGE-ITEM-"+backupID;
				itemCategory.backupID = backupID;
			}
			var selectedPackageItems = dojo.clone(theData);
			for(i=0;i<selectedPackageItems.length;i++){
				var item = selectedPackageItems[i];
				var backupCategory = item.category;
				item.category="PACKAGE-ITEM-"+item.category;
				item.backupCategory = backupCategory;
			}
			
			this._theData = selectedPackageItems;
			this._groupData = packageListItemCategorys;
			var listP = this._listScrollPane;
			var listPEle = dojo.query("div:eq(0)",this._listScrollPane.domNode)[0];
			listP.destroyDescendants();
			var groupData = new GroupDataUtil();
			groupData.setFunction("category");
			groupData.setItems(this._theData);
			var groups = groupData.getGroups();
			//console.log(groups);
			for(var groupCountIndex=0;groupCountIndex<groups.length;groupCountIndex++){
				var groupID = groups[groupCountIndex];
				//console.log(groupCountIndex+":"+groupID);
				var groupObj = getGroupData(this._groupData, groupID);
				var groupLabel = groupObj.label;
				var groupBackupID = groupObj.backupID;
				//insert category title
				var groupTitleEle = domCon.create("div");
				groupTitleEle.innerHTML=groupLabel;
				groupTitleEle.className=groupID;
				listPEle.appendChild(groupTitleEle);
				//insert category items
				var categoryItems = groupData.getGroupItems(groupID);
				console.log(groupID);
				var categoryItemsRoundedList = new dojox.mobile.RoundRectList({id:"mainPageTravelPackage_packageList_"+groupID, style:"margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:5px;"});
				categoryItemsRoundedList.set("backupID", groupBackupID);
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
		},
		addListItem : function(itemData){
			var that = this;
			var listItem = this.createItem(itemData);
			var theCategory = listItem.get("category");
			var groupElements = dojo.query("ul", this.domNode);
			var itemDataCategory = itemData.backupCategory;
			for(var i=0;i<groupElements.length;i++){
				var groupElement = groupElements[i];
				var groupDijit = registry.byNode(groupElement);
				var groupElementCategory = groupDijit.get("backupID");
				if(groupElementCategory==itemDataCategory){
					groupDijit.addChild(listItem);
					break;
				}
			}
			
			var topY = listItem.domNode.offsetTop;
	     	topY = topY;
			that._listScrollPane.slideTo({"y":-topY},0.5);
		},
		updateDataAllFromDataModule: function(allData){
			var that = this;
			this._dataModuleData = allData;
			setTimeout(function(){
				var itemCategorys = allData.getPackageItemCategory();
				var selectedPackageItems = dataModule.getPackageItemList();
				that.updateData(selectedPackageItems, itemCategorys);
			},100);
		}
	});
	return travelPackageItemListPane;
});

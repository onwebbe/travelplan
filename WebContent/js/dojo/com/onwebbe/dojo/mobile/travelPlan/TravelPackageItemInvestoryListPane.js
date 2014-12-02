define("com/onwebbe/dojo/mobile/travelPlan/TravelPackageItemInvestoryListPane", 
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
 		"dojox/mobile/SimpleDialog",
 		"dojox/mobile/RoundRectList",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/ScrollablePane",
 		"dojox/mobile/RoundRect",
 		"dojox/mobile/Accordion",
 		"dojox/mobile/Button",
 		"dojox/mobile/ScrollablePane",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/TextArea",
 		"dojox/mobile/RadioButton"
 		], 
 	function(declare, Evented, registry, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, ItemSelectTooltip, parser, CheckBox, on, SimpleDialog){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemInvestoryListPane
	 * com/onwebbe/dojo/mobile/travelPlan/TravelPackageItemInvestoryListPane
	 * 
	 * Event:
	 * itemAddClicked
	 * questionMarkClicked
	 * 
	 * Summary:
	*/
	var getGroupLabel = function(groupData, searchid, labelName){
		if(typeof labelName=="undefinpackageListItemInvestoryCategorysed"||labelName==null||labelName==""){
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
	var travelPackageItemListPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemListPane", [RoundRect,Evented], {
		_theData : null,
		_groupData : null,
		_listScrollPane : null,
		_tooltip : null,
		_addNewItemDialog : null,
		_noteDialog : null,
		_dataModuleData : null,
		postCreate: function(){
			this.inherited(arguments);
			var that = this;
			this.destroyDescendants();
			//this.domNode.className="mainPagePackageInfoPackageItemPane";
			//add for title
			var titleDIVEle = domCon.create("div", titleDIVEle);
			titleDIVEle.innerHTML="打包仓库";
			this.domNode.appendChild(titleDIVEle);
			
			//add for function buttons
			var functionP = domCon.create("div", {style:"margin-top:5px;"});
			var cateSearchDijit = new dojox.mobile.Button({label:"分类查询", style:"text-align:center;display:inline-block;width:150px;"});
			functionP.appendChild(cateSearchDijit.domNode);
			
			var addNewItemInInvestory = new dojox.mobile.Button({label:"添加新项", style:"float:right;"});
			functionP.appendChild(addNewItemInInvestory.domNode);
			addNewItemInInvestory.on("click", function(){
				that._addNewItemDialog.show();
			});
			
			
			this.domNode.appendChild(functionP);
			
			
			var listOuterScrollPane = new dojox.mobile.ScrollablePane({style:"margin-top:5px;"});
			this.domNode.appendChild(listOuterScrollPane.domNode);
			this._listScrollPane = listOuterScrollPane;
			
			
			//set size of the screen element
			var totalWindowSize = win.getBox();
			var headerEle = dojo.query("div[data-dojo-type='dojox/mobile/Heading']",dojo.query("#mainFunctionView")[0])[0];
			var headerHeight = domgeo.getContentBox(headerEle);
			var actualHeight = totalWindowSize.h - headerHeight.h - 82+21;
			
			
			var theHeight =actualHeight-4-36;
			
			var mainPagePackageInfoPackageItemPane = this.domNode;
			//mainPagePackageInfoPackageItemPane.style.width = eachPaneWidth + 73*2-20+"px";
			var packageListScrollPane = listOuterScrollPane.domNode;
			var packageListBox = domgeo.getContentBox(packageListScrollPane);
			packageListBox.h=theHeight;
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
			this.prepareAddItemDialog();
		},
		createItem : function(itemData){
			var that = this;
			var cateItemLabel = itemData.label;
			var itemID = "TravelPackageItemInvestoryListPaneItemList_"+itemData.id;
			var existItemDijit = registry.byId(itemID);
			if(existItemDijit!=null){
				existItemDijit.destroyRecursive();
			}
			var listItemText = '<div><div id='+itemID+' data-dojo-type="dojox/mobile/ListItem" style="" data-dojo-props="deleteIcon:\'../../images/add.png\', rightText:\'<div style=margin-right:15px; class=mainPagePackageListNotReady></div>\', rightIcon:\'../../images/questions-30.png\'">'+cateItemLabel+'</div></div>';
			var listItemEle = domCon.toDom(listItemText);
			var categoryItemListItem = parser.parse(listItemEle)[0];
			categoryItemListItem.itemData = itemData;
			var categoryItemListItemEle = dojo.query(".mblListItemDeleteIcon", categoryItemListItem.domNode)[0];
			categoryItemListItemEle.itemData = itemData;
			/*categoryItemListItemEle.style.backgroundColor="#f9a4b1";
			categoryItemListItemEle.style.display="none";
			var categoryItemListItem = new dojox.mobile.ListItem({label:cateItemLabel, icon:'../../images/delete-trash-30.png', rightText:'<div class=mainPagePackageListNotReady></div>', rightIcon:'../../images/notes-30.png'});
			categoryItemListItem.set("icon", '../../images/delete-trash-30.png');
			categoryItemListItem.set("deleteIcon", '../../images/delete-trash-30.png');*/
			
			
			var delIcon = dojo.query(".mblListItemDeleteIcon", categoryItemListItem.domNode)[0];
			delIcon.style.borderRadius="5px";
			delIcon.style.cursor="pointer";
			delIcon.parentItemDijit = categoryItemListItem;
			this.own(on(delIcon, "click", function(){
				that.emit("itemAddClicked",categoryItemListItem);
			}));
			
			var noteIcon = dojo.query(".mblListItemRightIcon", categoryItemListItem.domNode)[0];
			noteIcon.style.cursor="pointer";
			
			var questionIconEle = dojo.query(".mblListItemRightIcon", categoryItemListItem.domNode)[0];
			questionIconEle.itemData = itemData;
			on(questionIconEle, "click", function(){
				that.emit("questionMarkClicked", itemData);
			});
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
			var groupInvestoryData = new GroupDataUtil();
			groupInvestoryData.setFunction("category");
			groupInvestoryData.setItems(this._theData);
			var groups = groupInvestoryData.getGroups();
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
				var categoryItems = groupInvestoryData.getGroupItems(groupID);
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
			//prepare selection for the diaplog
			var dialogRadioText = "";
			var gds = this._groupData;
			for(var i=0;i<gds.length;i++){
				var gdItem = gds[i];
				dialogRadioText = dialogRadioText + "<input type='radio' value='"+gdItem.id+"' name='addItemCategorySelector' data-dojo-type='dojox/mobile/RadioButton' style='display:inline-block;'/><label style='position:relative;top:8px;padding-left:8px;'>"+gdItem.label+"</label><br/>";
			}
			var dialogCategorySelectorEle = dojo.query("td.dialogCategorySelector", this._addNewItemDialog.domNode)[0];
			dialogCategorySelectorEle.innerHTML = dialogRadioText;
			parser.parse(dialogCategorySelectorEle);
		},
		prepareAddItemDialog : function(){
			var simpleDialog = new SimpleDialog({closeButton:true});
			this.domNode.appendChild(simpleDialog.domNode);
			var theElementHTML = "<div><div data-dojo-type='dojox/mobile/ContentPane'><table>"+
			"	<tr>"+
			"		<td colspan='2' class='dlgTitle' style='width:100%;text-align:center;border-bottom:1px solid grey;font-size:20pt;'><label>新建打包物品</label></td>"+
			"	</tr>"+
			"	<tr>"+
			"		<td width='50px'><label>名字</label></td>"+
			"		<td><input data-dojo-type='dojox/mobile/TextBox'/></td>"+
			"	</tr>"+
			"	<tr>"+
			"		<td><label><label>分类</label></label></td>"+
			"		<td class='dialogCategorySelector' style='text-align:left;'>"+
			"			<label>aaaaaa</label><div data-dojo-type='dojox/mobile/RadioButton' style='display:inline-block;'></div>"+
			"			<label>bbbbbb</label><div data-dojo-type='dojox/mobile/RadioButton' style='display:inline-block;'></div>"+
			"			<label>cccccc</label><div data-dojo-type='dojox/mobile/RadioButton' style='display:inline-block;'></div>"+
			"		</td>"+
			"	</tr>"+
			"	<tr>"+
			"		<td><label>简介</label></td>"+
			"		<td><textarea data-dojo-type='dojox/mobile/TextArea'>123123123123</textarea></td>"+
			"	</tr>"+
			"	<tr>"+
			"		<td colspan='2'>"+
			"			<div class='addItemConfirmButton' data-dojo-type='dojox/mobile/Button' style='background-color:#beffa3;margin-left:25px;text-align:center;'>确定</div>"+
			"		</td>"+
			"	</tr>"+
			"</table><div><div>";
			var theElementHTMLEle = domCon.toDom(theElementHTML);
			
			var container = dojo.query(".mblSimpleDialogContainer", simpleDialog.domNode)[0];
			container.appendChild(theElementHTMLEle);
			var contentElement = parser.parse(theElementHTMLEle)[0];
			
			var addButtonEle = dojo.query(".addItemConfirmButton", simpleDialog.domNode)[0];
			var addButtonDijit = registry.byNode(addButtonEle);
			addButtonDijit.on("click", function(){
				simpleDialog.hide();
			});
			
			this._addNewItemDialog = simpleDialog;
		},
		destory : function(){
			var listP = this._listScrollPane;
			listP.destroyDescendants();
		},
		updateDataAllFromDataModule: function(allData){
			var that = this;
			this._dataModuleData = allData;
			setTimeout(function(){
				var itemCategorysInvestory = allData.getPackageItemCategory();
				var packageInvestoryItems = allData.getPackageItemList();
				that.updateData(packageInvestoryItems,itemCategorysInvestory);
			},100);
		}
	});
	return travelPackageItemListPane;
});

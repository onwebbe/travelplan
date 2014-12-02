define("com/onwebbe/dojo/mobile/travelPlan/TravelPackageInfoTargetInfosPane", 
	[
	 	"dojo/_base/declare",
	 	"dojo/_base/array",
	 	"dojox/mobile/GridLayout",
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
 	function(declare, array, GridLayout, Evented, registry, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, ItemSelectTooltip, parser, CheckBox, on, SimpleDialog){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.TravelPackageInfoTargetInfosPane
	 * com/onwebbe/dojo/mobile/travelPlan/TravelPackageInfoTargetInfosPane
	 * 
	 * Event:
	 * itemAddClicked
	 * questionMarkClicked
	 * 
	 * Summary:
	*/

	var travelPackageInfoTargetInfosPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelPackageInfoTargetInfosPane", [RoundRect,Evented], {
		_theData : null,
		_targetListScrollPane : null,
		_targetTypeListScrollPane : null,
		_targetSpotListScrollPane : null,
		_isDisplaySpot : false,
		_isDisplayType : true,
		
		_dataModuleData : null,
		initParams : function(){
			var params = this.params;
			if(true==params.isDisplaySpot){
				this._isDisplaySpot = true;
			}
			if(true==params.isDisplayType){
				this._isDisplayType = true;
			}else if(params.isDisplayType==null){
				this._isDisplayType = true;
			}else{
				this._isDisplayType = false;
			}
		},
		postCreate: function(){
			this.inherited(arguments);
			this.initParams();
			var that = this;
			this.destroyDescendants();
			var titleDIVEle = domCon.create("div", titleDIVEle);
			titleDIVEle.innerHTML="目标列表";
			this.domNode.appendChild(titleDIVEle);
			
			var listOuterScrollPane = new dojox.mobile.ScrollablePane({style:"margin-top:5px;"});
			this.domNode.appendChild(listOuterScrollPane.domNode);
			this._targetListScrollPane = listOuterScrollPane;
			
			
			if(this._isDisplayType==true){
				var targetTypeDIVEle = domCon.create("div", targetTypeDIVEle);
				targetTypeDIVEle.innerHTML="目标类型列表";
				this.domNode.appendChild(targetTypeDIVEle);
				var listTypeOuterScrollPane = new dojox.mobile.ScrollablePane({style:"margin-top:5px;"});
				this.domNode.appendChild(listTypeOuterScrollPane.domNode);
				this._targetTypeListScrollPane = listTypeOuterScrollPane;
			}
			
			
			
			if(this._isDisplaySpot==true){
				var targetSpotDIVEle = domCon.create("div", targetSpotDIVEle);
				targetSpotDIVEle.innerHTML="景点列表";
				this.domNode.appendChild(targetSpotDIVEle);
				var listSpotOuterScrollPane = new dojox.mobile.ScrollablePane({style:"margin-top:5px;"});
				this.domNode.appendChild(listSpotOuterScrollPane.domNode);
				this._targetSpotListScrollPane = listSpotOuterScrollPane;
			}
			
			
			
			//set size of the screen element
			var mainPagePackageInfoPackageItemPane = this.domNode;
			var totalWindowSize = win.getBox();
			var headerEle = dojo.query("div[data-dojo-type='dojox/mobile/Heading']",com.onwebbe.dojo.mobile.MobileDynamicViewController.getCurrentView().domNode)[0];
			var headerHeight = domgeo.getContentBox(headerEle);
			var actualHeight = totalWindowSize.h - headerHeight.h - 82+20;
			var targetListHeight = Math.round(actualHeight*0.6);
			
			if(this._isDisplayType==true && this._isDisplaySpot==true){
				targetListHeight = Math.round(actualHeight*0.3);
			}else if(this._isDisplayType==true||this._isDisplaySpot==true){
				targetListHeight = Math.round(actualHeight*0.6);
			}else{
				targetListHeight = actualHeight;
			}
			
			var targetListScrollPane = listOuterScrollPane.domNode;
			var targetListBox = domgeo.getContentBox(targetListScrollPane);
			targetListBox.h = targetListHeight;
			targetListBox.w = mainPagePackageInfoPackageItemPane.style.width;
			domgeo.setContentSize(targetListScrollPane, targetListBox);
			
			
			if(this._isDisplayType==true){
				var targetTypeListHeight = actualHeight-targetListHeight-30;
				if(this._isDisplaySpot==true){
					targetTypeListHeight = (actualHeight-targetListHeight)/2-30;
				}
				var targetTypeListScrollPane = listTypeOuterScrollPane.domNode;
				var targetTypeListBox = domgeo.getContentBox(targetTypeListScrollPane);
				targetTypeListBox.h = targetTypeListHeight;
				targetTypeListBox.w = mainPagePackageInfoPackageItemPane.style.width;
				domgeo.setContentSize(targetTypeListScrollPane, targetTypeListBox);
			}
			
			if(this._isDisplaySpot==true){
				var targetSpotListHeight = actualHeight-targetListHeight-30;
				if(this._isDisplayType==true){
					targetSpotListHeight = (actualHeight-targetListHeight)/2-30;
				}
				var targetSpotListScrollPane = listSpotOuterScrollPane.domNode;
				var targetSpotListBox = domgeo.getContentBox(targetSpotListScrollPane);
				targetSpotListBox.h = targetTypeListHeight;
				targetSpotListBox.w = mainPagePackageInfoPackageItemPane.style.width;
				domgeo.setContentSize(targetSpotListScrollPane, targetSpotListBox);
			}
			
			
			
			/*var mainPagePackageInfoPackageItemPane = this.domNode;
			var packageListScrollPane = listOuterScrollPane.domNode;
			var packageListBox = domgeo.getContentBox(packageListScrollPane);
			packageListBox.h=actualHeight-4-34;
			packageListBox.w=mainPagePackageInfoPackageItemPane.style.width;
			domgeo.setContentSize(packageListScrollPane, packageListBox); */
		},
		createItem : function(itemData){},
		updateData: function(theData, targetTypeCate){
			var that = this;
			this._theData = theData;
			
			this._targetListScrollPane.destroyDescendants();
			if(this._targetTypeListScrollPane){
				this._targetTypeListScrollPane.destroyDescendants();
			}
			if(this._targetSpotListScrollPane){
				this._targetSpotListScrollPane.destroyDescendants();
			}
			
			var targetListGroup = new dojox.mobile.RoundRectList({style:"margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:5px;"});
			var listPEle = dojo.query("div:eq(0)",this._targetListScrollPane.domNode)[0];
			listPEle.appendChild(targetListGroup.domNode);
			
			
				

			var allTargetTypeFullArr = new Array();
			for(i=0;i<theData.length;i++){
				var tmpData = theData[i];
				var nameLabel = tmpData.targetNameC;
				var targetTypes = tmpData.targetTypes;
				var targetTypesArr = targetTypes.split(",");
				for(j=0;j<targetTypesArr.length;j++){
					var tmpItem = targetTypesArr[j];
					allTargetTypeFullArr.push(tmpItem);
				}
				var targetListItem = dojox.mobile.ListItem({label:nameLabel});
				targetListGroup.addChild(targetListItem);
			}
			
			var allTargetTypeFullArrNew = [];
			dojo.forEach(allTargetTypeFullArr, function(item, i) {
			 if(dojo.indexOf(allTargetTypeFullArrNew, item)  == -1) {
				 allTargetTypeFullArrNew.push(item);
			 }
			});
				
			if(this._isDisplayType==true){
				var targetTypeListGroup = new ContentPane({style:"margin-left:10px;margin-right:10px;margin-top:5px;margin-bottom:5px;"});
				var listTypePEle = dojo.query("div:eq(0)",this._targetTypeListScrollPane.domNode)[0];
				listTypePEle.appendChild(targetTypeListGroup.domNode);
				var gridContentBox = domgeo.getContentBox(targetTypeListGroup.domNode);
				var contentEleHeight = 24;
				var contentEleWidth = gridContentBox.w/2-30;
				console.log(gridContentBox);
				dojo.forEach(allTargetTypeFullArrNew, function(item, i){
					var resultobjs = array.filter(targetTypeCate, function(tmpitem){ return tmpitem.id==item; });
					var resultobj;
					if(resultobjs.length>0){
						resultobj = resultobjs[0];
						var resultObjLabel = resultobj.label;
						var targetTypeItem = RoundRect({innerHTML:resultObjLabel, style:"display:inline-block;margin-left:3px;margin-right:3px;margin-top:8px;margin-bottom:8px;"});
						var targetTypeItemBox = domgeo.getContentBox(targetTypeItem.domNode);
						targetTypeItemBox.w = contentEleWidth;
						targetTypeItemBox.h = contentEleHeight;
						domgeo.setContentSize(targetTypeItem.domNode, targetTypeItemBox);
						
						targetTypeListGroup.addChild(targetTypeItem);
					}
				})
			}
			if(this._isDisplaySpot==true){
				
			}
		},
		destory : function(){},
		updateDataAllFromDataModule : function(allData){
			var that = this;
			this._dataModuleData = allData;
			setTimeout(function(){
				var selectTarget = allData.getSelectedTarget();
				that.updateData(selectTarget, allData.getTargetType());
			},100);
			
		}
	});
	return travelPackageInfoTargetInfosPane;
});

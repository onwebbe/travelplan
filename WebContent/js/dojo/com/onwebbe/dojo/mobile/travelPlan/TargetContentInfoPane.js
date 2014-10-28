define("com/onwebbe/dojo/mobile/travelPlan/TargetContentInfoPane", [
	"dojo/_base/declare",
	"dojox/mobile/ContentPane",
	"dojo/json",
	"dojox/mobile/Button",
	"dojox/mobile/parser",
	"dojo/dom-construct",
	"dijit/registry",
	"dojo/_base/array",
	"dojo/on",
	"dojo/dom-geometry",
	"com/onwebbe/dojo/mobile/ItemSelectTooltip",
	"dojox/mobile/RoundRect",
	"dojox/mobile/ContentPane",
	"dojox/mobile/Slider"
], function(declare, Pane, JSON, Button, parser, domCon, registry, array, on, domgeo, ItemSelectTooltip){
	/* Module:
	 * com.onwebbe.dojo.mobile.common.AddDocView
	 * 
	 * Summary:
	*/
	var getNotIncludedTarget = function(targetTypesAll, targetTypesList){
		var tooltipData = new Array();
		if(typeof targetTypesList=="string"){
			targetTypesList = [targetTypesList];
		}
		array.forEach(targetTypesAll, function(item, idx, arr){
			var isFound = array.some(targetTypesList, function(itemtooltip){
				return item.id==itemtooltip;
			});
			if(!isFound){
				tooltipData.push(item);
			}
		});
		return tooltipData;
	}
	var targetContentInfoPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TargetContentInfoPane", Pane, {
		_paneSummaryElement: null,
		_pane1Element : null,
		_pane2Element : null,
		_pane3Element: null,
		_data: null,
		_selectedData : new Array(),
		_deleteElement : null,
		_mode : "",
		_tooltip : null,
		_targetTypeInnerElement : null,
		_targetTypeOuterElement : null,
		_currentTargetTypeName : null,
		constructor: function(/*Object*/params, /*DomNode?*/node){
			this._paneSummaryElement = domCon.toDom("<div style=''></div>");
			this._pane1Element = domCon.toDom("<div></div>");
			this._pane2Element = domCon.toDom("<div></div>");
			this._pane3Element = domCon.toDom("<div></div>");
			node.appendChild(this._paneSummaryElement);
			node.appendChild(this._pane1Element);
			node.appendChild(this._pane2Element);
			node.appendChild(this._pane3Element);
		},
		postCreate: function(){
			var that = this;
			var tooltip = new ItemSelectTooltip();
			tooltip.on("listItemClicked",function(itemData){
				//prepare data for popoup tooltip
	    		var tooltipData = getNotIncludedTarget(tooltip.theData, itemData.id);
	    		tooltip.updateData(tooltipData);
				console.log(that._data);
				that._updateTargetType(itemData.id, "targetTypes", "add");
				that._addTargetType(itemData);
			});
			this._tooltip = tooltip;
			this.addChild(tooltip);
			//tooltip.createList();
		},
		updateData : function(inputdata, targetTypesAll, targetTypeName, mode, nameDisplayElement){
			this._currentTargetTypeName = targetTypeName;
			console.log("entering update date");
			console.log(inputdata);
			var that = this;
			//copy the data for each element
			if("add"==mode){
				var data = {};
				dojo.mixin(data, inputdata);
				this._data = data;
			}else{
				this._data = inputdata;
			}
			
			this._mode = mode;
			
    		
			//clean up existing content
			this._pane1Element.innerHTML="";
			this._pane2Element.innerHTML="";
			this._pane3Element.innerHTML="";
			
			if(this._data!=null){
				//prepare data target Types
				var targetTypesStr = this._data[targetTypeName];
				var targetTypesList = targetTypesStr.split(",");
				console.log("getting target type string");
				console.log(targetTypesStr);
				console.log("getting target type list");
				console.log(targetTypesList);
	    		var targetTypeArr = new Array();
	    		for(i=0;i<targetTypesList.length;i++){
	    			var targetTypesListItem = targetTypesList[i];
	    			targetTypesListItem = dojo.trim(targetTypesListItem);
	    			var targetTypesListFilterred = array.filter(targetTypesAll, function(item){return item.id==targetTypesListItem;});
	    			console.log(targetTypesListFilterred);
	    			var targetTypesListFilterredOne = targetTypesListFilterred[0];
	    			if(targetTypesListFilterredOne!=null){
	    				targetTypeArr.push(targetTypesListFilterredOne);
	    			}
	    		}
	    		targetTypes = targetTypeArr;
	    		
	    		//prepare data for popoup tooltip
	    		var tooltipData = getNotIncludedTarget(targetTypesAll, targetTypesList);
	    		this._tooltip.updateData(tooltipData);
	    		this._tooltip.createList();
				//create pane 3 content
				var outerElementText = "<div></div>";
				var outerElement = domCon.toDom(outerElementText);
				this._targetTypeOuterElement = outerElement
				
				var outerScrollableText = "<div data-dojo-type='dojox/mobile/ScrollablePane' class='outerScrollable'></div>";
				var outerScrollableEle = domCon.toDom(outerScrollableText);
				//add description
				var desriptionText = "<div data-dojo-type='dojox/mobile/RoundRect'></div>";
				var descriptionEle = domCon.toDom(desriptionText);
				var introduction = that._data.introduction;
				if(introduction==""){
					introduction="对不起,还没有介绍";
				}
				descriptionEle.innerHTML=introduction;
				outerScrollableEle.appendChild(descriptionEle);
				
				var innerElementText = "<div data-dojo-type='dojox/mobile/GridLayout' data-dojo-props='cols:2'></div>";
				var innerElement = domCon.toDom(innerElementText);
				this._targetTypeInnerElement = innerElement;
				outerScrollableEle.appendChild(innerElement);
				
				outerElement.appendChild(outerScrollableEle);
				//prepare pane3 add element
				var targetTypeAddElementText = "<div data-dojo-type='dojox/mobile/ContentPane'>"
												+"<div data-dojo-type='dojox/mobile/RoundRect' style='text-align:center;cursor:crosshair;'>"
												+"<img style='text-align:center;vertical-align:middle;' src='../../images/add.png'/>"
												+"</div>"
											+"</div>";
				var targetTypeAddElementEle = domCon.toDom(targetTypeAddElementText);
				innerElement.appendChild(targetTypeAddElementEle);
				this.own(on(targetTypeAddElementEle ,"click", function(evt){
					if(that._tooltip.isViewable){
						that._tooltip.hide();
					}else{
						that._tooltip.showTip(this);
					}
					
				}));
				
				//prepare pane3 target type elements
				console.log("Target Types to update");
				console.log(targetTypes);
				for(i=0;i<targetTypes.length;i++){
					var tmpTargetTypes = targetTypes[i];
					var targetTypeElementText = "<div data-dojo-type='dojox/mobile/ContentPane'>"
													+"<div class='deleteElement' style='margin-right:10px;margin-top:8px;float:right;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;cursor:pointer;valign:middle;vertical-align:middle;background-color:#f9a4b1;'><img style='vertical-align:middle;' src='../../images/delete-trash-30.png'></div>"
													+"<div data-dojo-type='dojox/mobile/RoundRect'>"
													+tmpTargetTypes.label
													+"<br/>"
													+tmpTargetTypes.TargetTypeDescription
													+"asdfasdfasdfasdfasdfasdfasdf"
													+"</div>"
												+"</div>";
					var targetTypeElement = domCon.toDom(targetTypeElementText);
					targetTypeElement.data = tmpTargetTypes;
					var targetTypeDeleteEle = dojo.query("div.deleteElement",targetTypeElement)[0];
					targetTypeDeleteEle.targetElement = targetTypeElement;
					targetTypeDeleteEle.data = tmpTargetTypes;
					targetTypeDeleteEle.gridElement = innerElement;
					this.own(on(targetTypeDeleteEle,"click",function(){
						//delete(this.data);
						registry.byId(this.targetElement.id).destroyRecursive();
						this.gridElement;
						var idToDelete = this.data.id;
						that._updateTargetType(idToDelete, targetTypeName, "delete");
						that._tooltip.theData.push(this.data);
						that._tooltip.createList();
					}));
					
					innerElement.appendChild(targetTypeElement);
				}
				parser.parse(outerElement);
				
				this._pane3Element.appendChild(outerElement);
				
				
				//create pane1 content (title)
				var titleText = "<div><div style='border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;text-align:center;background-color:#89e789'>"
								+"<div class='deleteElement' style='display:none;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;float:left;cursor:pointer;valign:middle;vertical-align:middle;background-color:#f9a4b1;'><img style='vertical-align:middle;' src='../../images/delete-trash-30.png'></div>"
								+that._data[nameDisplayElement]
								+"<div class='saveTickElement' style='border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;background-color:#89e789;float:right;cursor:pointer;vertical-align:middle;'><img style='vertical-align:middle;' src='../../images/tick-30.png'></div>"
								+"</div><div>";
				var titleObj = domCon.toDom(titleText);
				var deleteItem = dojo.query("div.deleteElement", titleObj)[0];
				this._deleteElement = deleteItem;
				if(this._mode!="add"){
					deleteItem.style.display="inline-block";
				}
				on(deleteItem, "click", function(){
					var theID = that._data.id;
					var idToBeDelete = 0;
					for(i=0;i<that._selectedData.length;i++){
						if(that._selectedData[i].id==theID){
							break;
						}
					}
					that._selectedData.splice(i,1);
					that.updateData(null, targetTypesAll, targetTypeName, mode, nameDisplayElement);
				});
				
				var tickItem = dojo.query("div.saveTickElement", titleObj)[0];
				tickItem.data = this._data;
				on(tickItem, "click", function(){
					var tmpData = this.data;
					that._updateSummaryPane(tmpData, "add", nameDisplayElement, targetTypesAll, targetTypeName);
				});
				
				
				
				//pane1 style
				this._pane1Element.style.height="70px";
				this._pane1Element.style.lineHeight="40px";
				this._pane1Element.style.marginTop="5px";
				this._pane1Element.appendChild(titleObj);
				
				//advice length Pane
				var titleObjWidth = titleObj.clientWidth;
				var adviceLengthPText = "<div style='margin-bottom:5px;'><span style='display:inline-block;position:relative;top:-14px;'>待几天</span><input data-dojo-type='dojox/mobile/Slider' data-dojo-props='intermediateChanges:true' max='30' style='width:"+(titleObjWidth-150)+"px;display:inline-block;'/><span style='display:inline-block;position:relative;top:-14px;left:20px;' name='advicedLengthText'></span></div>";
				var adviceLengthPEle = domCon.toDom(adviceLengthPText);
				var sliderDijit = parser.parse(adviceLengthPEle)[0];
				sliderDijit.set("value",that._data.adviceLength);
				dojo.query("[name='advicedLengthText']",adviceLengthPEle)[0].innerHTML=that._data.adviceLength;
				sliderDijit.own(sliderDijit.on("change", function(newValue){
					dojo.query("[name='advicedLengthText']",adviceLengthPEle)[0].innerHTML=newValue;
					that._data.adviceLength = newValue;
				}));
				titleObj.appendChild(adviceLengthPEle);
				
			}else{
				that._updateSummaryPane(null, "", nameDisplayElement, targetTypesAll, targetTypeName);
			}
			
			
			
			
			this._resizeInnerScrollPane();
			
		},
		_resizeInnerScrollPane: function(){
			var outerScrollableElement = dojo.query(".outerScrollable",this.domNode)[0];
			var outerScrollableDijit = registry.byNode(outerScrollableElement);
			outerScrollableDijit.resize();
			var theScrollablePHeight = parseInt(outerScrollableDijit.domNode.style.height);
			outerScrollableDijit.domNode.style.height=(theScrollablePHeight-10)+"px";
		},
		_updateTargetType : function(idToBeDelete, targetTypeName, flag){
			if(flag==null||flag=="delete"){
				var allTypeIDStr = this._data[targetTypeName];
				var allTypeIDs = allTypeIDStr.split(",");
				var sortedTypeIDs = new Array();
				for(i=0;i<allTypeIDs.length;i++){
					var tmpType = allTypeIDs[i];
					tmpType = dojo.trim(tmpType);
					if(idToBeDelete!=tmpType){
						sortedTypeIDs.push(tmpType);
					}
				}
				var finalSortedType = sortedTypeIDs.toString();
				this._data[targetTypeName] = finalSortedType;
			}else{
				var names = this._data[targetTypeName];
				if(names==""){
					this._data[targetTypeName] = idToBeDelete;
				}else{
					this._data[targetTypeName] = this._data[targetTypeName]+","+idToBeDelete;
				}
			}
			
		},
		_addTargetType : function(targetTypeObj){
			var that = this;
			var innerElement = this._targetTypeInnerElement;
			var tmpTargetTypes = targetTypeObj;
			var outerDummyElement = document.createElement("div");
			var targetTypeElementText = "<div data-dojo-type='dojox/mobile/ContentPane'>"
											+"<div class='deleteElement' style='margin-right:10px;margin-top:8px;float:right;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;cursor:pointer;valign:middle;vertical-align:middle;background-color:#f9a4b1;'><img style='vertical-align:middle;' src='../../images/delete-trash-30.png'></div>"
											+"<div data-dojo-type='dojox/mobile/RoundRect'>"
											+tmpTargetTypes.label
											+"<br/>"
											+tmpTargetTypes.TargetTypeDescription
											+"asdfasdfasdfasdfasdfasdfasdf"
											+"</div>"
										+"</div>";
			var targetTypeElement = domCon.toDom(targetTypeElementText);
			targetTypeElement.data = tmpTargetTypes;
			var targetTypeDeleteEle = dojo.query("div.deleteElement",targetTypeElement)[0];
			targetTypeDeleteEle.targetElement = targetTypeElement;
			targetTypeDeleteEle.data = tmpTargetTypes;
			targetTypeDeleteEle.gridElement = innerElement;
			this.own(on(targetTypeDeleteEle,"click",function(){
				//delete(this.data);
				registry.byId(this.targetElement.id).destroyRecursive();
				this.gridElement;
				var idToDelete = this.data.id;
				that._updateTargetType(idToDelete, that._currentTargetTypeName, "delete");
				that._tooltip.theData.push(this.data);
				that._tooltip.createList();
			}));
			outerDummyElement.appendChild(targetTypeElement);
			var innerDijit = parser.parse(outerDummyElement)[0];
			console.log(innerDijit);
			var gridDijit = registry.byNode(innerElement);
			gridDijit.addChild(innerDijit);
		},
		_updateSummaryPane : function(data, mode, displayPropertyName, targetTypes, targetTypeName){
			var that = this;
			var selectedData = this._selectedData;
			
			if(data!=null){
				var dataID = data.id;
				var isFound = false;
				for(i=0;i<selectedData.length;i++){
					var tmpSelectedData = selectedData[i];
					if(tmpSelectedData.id==dataID){
						console.log("_updateSummaryPane:found id:"+dataID);
						console.log(selectedData[i]);
						console.log(data);
						selectedData[i] = data;
						isFound = true;
						break;
					}
				}
				if(!isFound){
					console.log("_updateSummaryPane:not found id:"+dataID);
					console.log(data);
					this._selectedData.push(data);
				}
				
			}
			
			this._paneSummaryElement.innerHTML="";
			
			
			console.log("_updateSummaryPane updating header summary text");
			console.log(that._selectedData);
			for(i=0;i<that._selectedData.length;i++){
				var tmpData = that._selectedData[i];
				var displayCName = tmpData[displayPropertyName];
				var tmpSummaryText = "<span style='margin-right:5px;margin-bottom:5px;'>"
									+"<a href='#'>"	
									+displayCName
									+"</a>"
									+"</span>";
				var tmpSummaryEle = domCon.toDom(tmpSummaryText);
				
				var nameLinkEle = dojo.query("a",tmpSummaryEle)[0];
				nameLinkEle.data = tmpData;
				this.own(on(nameLinkEle, "click", function(){
					console.log("_updateSummaryPane")
					console.log(this.data);
					that.updateData(this.data, targetTypes, targetTypeName, "edit", displayPropertyName);
				}));
				that._paneSummaryElement.appendChild(tmpSummaryEle);
			}
			this._resizeInnerScrollPane();
		}
	});
	return targetContentInfoPane;
});

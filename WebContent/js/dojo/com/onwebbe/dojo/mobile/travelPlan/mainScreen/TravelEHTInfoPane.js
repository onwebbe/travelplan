define("com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelEHTInfoPane", 
	[
	 	"dojo/_base/declare",
	 	"dojo/dom-style",
	 	"dojo/Evented",
 		"dijit/registry",
 		"dojo/aspect",
 		"dojo/dom-geometry",
 		"dojo/window",
 		"dojox/mobile/RoundRect",
 		"dojo/dom-construct",
 		"com/onwebbe/dojo/mobile/GroupDataUtil",
 		"dojox/mobile/ContentPane",
 		"com/onwebbe/dojo/mobile/ItemSelectTooltip",
 		"dojox/mobile/parser",
 		"dojox/mobile/CheckBox",
 		"dojox/mobile/TextBox",
 		"dojo/on",
 		"dojox/mobile/SimpleDialog",
 		"dojox/mobile/ScrollablePane",
 		"com/onwebbe/dojo/mobile/MobileDynamicViewController",
 		"dojox/mobile/TextArea",
 		"dojox/mobile/SpinWheelDatePicker",
 		"dojox/mobile/Tooltip",
 		"dojox/mobile/Button",
 		"dojox/mobile/Switch",
 		"dojox/mobile/Slider",
 		"dojox/mobile/RoundRectList",
 		"dojox/mobile/ListItem",
 		"com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelTrafficInfoDialog",
 		"com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelTrafficInfoItem",
 		"dojox/mobile/Accordion",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/RadioButton"
 		], 
 	function(declare, DomStyle, Evented, registry, aspect, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, ItemSelectTooltip, parser, CheckBox, TextBox, on, SimpleDialog, ScrollablePane, ViewController, TextArea, SpinWheelDatePicker, Tooltip, Button, Switch, Slider, RoundRectList, ListItem, TravelTrafficInfoDialog, TravelTrafficInfoItem){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.mainScreen.TravelEHTInfoPane
	 * com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelEHTInfoPane
	 * 
	 * 
	 * Summary:
	*/
	var travelEHTInfoPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelEHTInfoPane", [RoundRect,Evented], {
		_parentNode : "travelPlanMainPageMainContentPane",
		_dataModuleData : null,
		
		_trafficList : null,
		_eatList : null,
		_housingList : null,
		_playList : null,
		_mainScrollPane : null,
		_searchButton : null,
		
		_searchTypeDialog : null,
		
		_travelTrafficInfoDialog : null,
		postCreate: function(){
			var that = this;
			if(this._parentNode!=null){
				if(typeof this._parentNode=="string"){
					this._parentNodeEle = dojo.query("#"+this._parentNode)[0];
				}else{
					this._parentNodeEle = this._parentNode;
				}
			}else{
				return;
			}
			
			
			var titleText = "<table style='width:100%;'>"+
							"<tr>"+
							"	<td style='text-align:left;'>"+
							"	吃-住-行-玩"+
							"	</td>"+
							"	<td style='text-align:right' class='categoryButton'>"+
							"	</td>"+
							"</tr>"+
							"</table>";
			var titleDIV = domCon.toDom(titleText);
			var titleSearchButton = new Button({style:"float:right;width:60px;", label:"分类"});
			this._searchButton = titleSearchButton;
			dojo.query(".categoryButton",titleDIV)[0].appendChild(titleSearchButton.domNode);
			this.domNode.appendChild(titleDIV);
			
			
			
			var outViewEle = ViewController.getCurrentView();
			var outerScrollPane = new ScrollablePane();
			this._mainScrollPane = outerScrollPane;
			
			this.domNode.appendChild(outerScrollPane.domNode);
			
			var mainElement = this._parentNodeEle;
			var leftEle = outerScrollPane.domNode;
			var mainElementBox = domgeo.getContentBox(mainElement);
			var mainElementWidth = mainElementBox.w;
			var leftEleWidth = mainElementWidth/3-28;
			var totalWindowSize = win.getBox();
			var headerEle = dojo.query("div[data-dojo-type='dojox/mobile/Heading']",outViewEle.domNode)[0];
			var headerHeight = domgeo.getContentBox(headerEle);
			var actualHeight = totalWindowSize.h - headerHeight.h - 82+40-30;
			var leftEleBox = domgeo.getContentBox(leftEle);
			leftEleBox.w = "";
			leftEleBox.h = actualHeight;
			domgeo.setContentSize(leftEle, leftEleBox);
			
			
			var trafficP = new RoundRect({style:"margin:5px;"});
			var trafficList = new RoundRectList({style:"margin:5px;"});
			var trafficHeader = domCon.create("div",{innerHTML:"行",className:"traffic", style:"height:30px;"});
			trafficHeader.appendChild(domCon.create("img",{src:"../../images/edit-30.png", style:"margin-left:20px;float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			var trafficAddEle = domCon.create("img",{src:"../../images/add.png", style:"float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"});
			trafficHeader.appendChild(trafficAddEle);
			on(trafficAddEle, "click", function(){
				that._travelTrafficInfoDialog.show();
			});
			trafficP.domNode.appendChild(trafficHeader);
			trafficP.addChild(trafficList);
			var eatP = new RoundRect({style:"margin:5px;"});
			var eatList = new RoundRectList({style:"margin:5px;"});
			var eatHeader = domCon.create("div",{innerHTML:"吃",className:"eat", style:"height:30px;"});
			eatHeader.appendChild(domCon.create("img",{src:"../../images/edit-30.png", style:"margin-left:20px;float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			eatHeader.appendChild(domCon.create("img",{src:"../../images/add.png", style:"float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			eatP.domNode.appendChild(eatHeader);
			eatP.addChild(eatList);
			var housingP = new RoundRect({style:"margin:5px;"});
			var housingList = new RoundRectList({style:"margin:5px;"});
			var housingHeader = domCon.create("div",{innerHTML:"住",className:"housing", style:"height:30px;"});
			housingHeader.appendChild(domCon.create("img",{src:"../../images/edit-30.png", style:"margin-left:20px;float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			housingHeader.appendChild(domCon.create("img",{src:"../../images/add.png", style:"float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			housingP.domNode.appendChild(housingHeader);
			housingP.addChild(housingList);
			var playP = new RoundRect({style:"margin:5px;"});
			var playList = new RoundRectList({style:"margin:5px;"});
			var playHeader = domCon.create("div",{innerHTML:"玩",className:"play", style:"height:30px;"});
			playHeader.appendChild(domCon.create("img",{src:"../../images/edit-30.png", style:"margin-left:20px;float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			playHeader.appendChild(domCon.create("img",{src:"../../images/add.png", style:"float:right;position:relative;top:-4px;border-radius: 5px 5px 5px 5px; cursor: pointer;"}));
			playP.domNode.appendChild(playHeader);
			playP.addChild(playList);
			
			
			this._trafficList = trafficList;
			this._eatList = eatList;
			this._housingList = housingList;
			this._playList = playList;
			
			outerScrollPane.containerNode.appendChild(trafficP.domNode);
			outerScrollPane.containerNode.appendChild(eatP.domNode);
			outerScrollPane.containerNode.appendChild(housingP.domNode);
			outerScrollPane.containerNode.appendChild(playP.domNode);
			
			
			this.prepareOtherDialogs();
		},
		updateDataAllFromDataModule: function(allData){
			this._dataModuleData = allData;
			this.prepareSearchDialog(this, this._searchButton.domNode);
			this._travelTrafficInfoDialog.updateDataAllFromDataModule(allData);
			
			this.prepareDataForTraffic();
		},
		prepareDataForTraffic : function(){
			var that = this;
			this._trafficList.destroyDescendants();
			//TravelTrafficInfoItem
			var traffics = this._dataModuleData.getCurrentTravelPlan().TravelPlanTraffic;
			for(trafficsi = 0;trafficsi<traffics.length;trafficsi++){
				var trafficData = traffics[trafficsi];
				var trafficListItem = new TravelTrafficInfoItem();
				this._trafficList.addChild(trafficListItem);
				trafficListItem.updateDataAllFromDataModule(this._dataModuleData);
				trafficListItem.updateData(trafficData);
			}
		},
		prepareSearchDialog : function(mainDijit, parentEle){
			var that = this;
			if(this._searchTypeDialog==null){
				var tooltip = new ItemSelectTooltip();
				mainDijit.addChild(tooltip);
				tooltip.parentRootElement = parentEle;
				var theTypeData = this._dataModuleData.getCodedValue("EHT");
				tooltip.updateData(theTypeData);
				tooltip.createList();
				on(parentEle, "click", function(){
					tooltip.showTip(parentEle);
				});
				tooltip.on("listItemClicked",function(itemData){
					var classValue = itemData.value;
					var scrollToEle = dojo.query("."+classValue, mainDijit.domNode)[0];
					if(scrollToEle==null){
						
					}else{
						var topY = scrollToEle.offsetTop;
	        	     	topY = topY;
						that._mainScrollPane.slideTo({"y":-topY+15},0.5);
						//console.log(groupSelectEle);
						//that._listScrollPane.scrollTo(groupSelectEle);
					}
				});
				tooltip.on("blur", function(){
					tooltip.hide();
				});
				this._searchTypeDialog = tooltip;
			}
			
			return this._searchTypeDialog;
		},
		prepareOtherDialogs : function(){
			this._travelTrafficInfoDialog = new TravelTrafficInfoDialog({closeButton:true});
			this.domNode.appendChild(this._travelTrafficInfoDialog.domNode);
		},
		destory : function(){}
	});
	return travelEHTInfoPane;
});

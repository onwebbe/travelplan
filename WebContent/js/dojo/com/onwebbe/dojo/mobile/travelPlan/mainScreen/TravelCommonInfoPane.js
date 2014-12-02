define("com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelCommonInfoPane", 
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
 		"dojox/mobile/Accordion",
 		"dojox/mobile/Button",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/RadioButton"
 		], 
 	function(declare, DomStyle, Evented, registry, aspect, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, ItemSelectTooltip, parser, CheckBox, TextBox, on, SimpleDialog, ScrollablePane, ViewController, TextArea, SpinWheelDatePicker, Tooltip, Button, Switch, Slider, RoundRectList, ListItem){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.mainScreen.TravelCommonInfoPane
	 * com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelCommonInfoPane
	 * 
	 * 
	 * Summary:
	*/
	var travelCommonInfoPane =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelPackageItemListPane", [RoundRect,Evented], {
		_travelNameP : null,
		_travelIntroP : null,
		_travelDateP : null,
		_travelMatesP : null,
		_travelStageP : null,
		_containerNode : null,
		_parentNode : "travelPlanMainPageMainContentPane",
		_parentNodeEle : null,
		_matesData : new Array(),
		
		
		_travelDateStartDialogDijit : null,
		_travelDateEndDialogDijit : null,
		_travelTypeDialogDijit : null,
		_travelMateDialogDijit : null,
		_travelStepDialogDijit : null,
		_travelMateListDialogDijit : null,
		
		_dataModuleData : null,
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
			
			var outViewEle = ViewController.getCurrentView();
			
			var outerScrollPane = new ScrollablePane();
			
			
			var travelNameP = new RoundRect({style:"margin-left: 5px; margin-right: 5px; margin-bottom: 5px; height: 25px;"});
			var travelIntroP = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;height:70px;"});
			var travelDateP = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:center;"});
			var travelMatesP = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:left;"});
			var travelStageP = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:left;"});
			this._travelNameP = travelNameP;
			this._travelIntroP = travelIntroP;
			this._travelDateP = travelDateP;
			this._travelMatesP = travelMatesP;
			this._travelStageP = travelStageP;
			
			this.domNode.appendChild(outerScrollPane.domNode);
			
			var leftEle = this.domNode;
			var leftEle1 = outerScrollPane.domNode;
			outerScrollPane.containerNode.appendChild(travelNameP.domNode);
			outerScrollPane.containerNode.appendChild(travelIntroP.domNode);
			outerScrollPane.containerNode.appendChild(travelDateP.domNode);
			outerScrollPane.containerNode.appendChild(travelMatesP.domNode);
			outerScrollPane.containerNode.appendChild(travelStageP.domNode);
			
			
			//setup the travelNameP
			var mainElement = this._parentNodeEle;
			var leftEle = dojo.query(".mainContentLeftPane", mainElement)[0];
			var leftEle1 = outerScrollPane.domNode;
			var mainElementBox = domgeo.getContentBox(mainElement);
			var mainElementWidth = mainElementBox.w;
			var leftEleWidth = mainElementWidth/3-28-50;
			var totalWindowSize = win.getBox();
			var headerEle = dojo.query("div[data-dojo-type='dojox/mobile/Heading']",outViewEle.domNode)[0];
			var headerHeight = domgeo.getContentBox(headerEle);
			var actualHeight = totalWindowSize.h - headerHeight.h - 82+40;
			
			var leftEleBox = domgeo.getContentBox(leftEle);
			leftEleBox.w = leftEleWidth;
			leftEleBox.h = actualHeight;
			domgeo.setContentSize(leftEle, leftEleBox);
			domgeo.setContentSize(leftEle1, leftEleBox);
			
			//prepare travelNameP
			var nameInputBoxElement = new TextBox({placeHolder:"旅行计划名称", name:"travelPlanMainPageMainContentNameTextBox"});
			travelNameP.addChild(nameInputBoxElement);
			nameInputBoxElement.domNode.style.width = leftEleWidth-32-75+"px";
			var spliteEle = domCon.create("span");
			spliteEle.innerHTML=":";
			spliteEle.style.width="10px";
			spliteEle.style.textAlign="center";
			spliteEle.style.display="inline-block";
			travelNameP.domNode.appendChild(spliteEle);
			//setup travelName panel dijit
			travelNameP.nameElement = nameInputBoxElement;
			var travelTypeElement = new TextBox({readonly:"readonly", placeHolder:"类型", name:"travelPlanMainPageMainContentTypeTextBox"});
			travelNameP.addChild(travelTypeElement);
			//setup travelName panel dijit
			travelNameP.typeElement = travelTypeElement;
			travelTypeElement.domNode.style.width = 40+"px";
			//setBorders
			var computedInputBoxStyle = DomStyle.getComputedStyle(nameInputBoxElement.domNode);
			nameInputBoxElement.domNode.style.border="0px";
			travelTypeElement.domNode.style.border="0px";
			this._travelTypeDialogDijit = this.prepareTypeTooltips(travelNameP, travelTypeElement.domNode);

			
			//setup travel intro P
			var introTextAreaElement = new TextArea({placeHolder:'旅行计划介绍', name:'travelPlanMainPageMainContentIntroTextArea', style:"resize:none"});
			introTextAreaElement.domNode.style.width = leftEleWidth-32+"px";
			introTextAreaElement.domNode.style.height = 57+"px";
			//set borders
			var computedTextAreaStyle = DomStyle.getComputedStyle(introTextAreaElement.domNode);
			introTextAreaElement.domNode.style.border="0px";
			
			travelIntroP.addChild(introTextAreaElement);
			//setup travelIntro Panel Dijit
			travelIntroP.introElement = introTextAreaElement;
			
			//prepare for date selection Panel
			var travelTimeRangeElemnet = travelDateP;
			travelTimeRangeElemnet.domNode.style.height = 75+"px";
			var dateSelectionText = 
			'					<table align="left">'+
			'						<tr valign="middle">'+
			'							<td valign="middle">'+
			'								<div name="travelFromDateSelector"><img src="../../images/calendar-icon-30.png"/>&nbsp;</div>'+
			'							</td>'+
			'							<td valign="middle">'+
			'								<input name="travelFromDate" readonly style="border:0px;width:90px;height:30px;font-size:12pt;" value="">'+
			'							</td>'+
			'							<td rowspan="2" valign="middle" align="right">'+
			'								<div name="travelFromToDateGap" style="font-size:11pt;text-align:right;float:right;padding-left:10px;">共  - 天</div>'+
			'							</td>'+
			'						</tr>'+
			'						<tr valign="middle">'+
			'							<td valign="middle">'+
			'								<div name="travelToDateSelector"><img src="../../images/calendar-icon-30.png"/>&nbsp;</div>'+
			'							</td>'+
			'							<td valign="middle">'+
			'								<input name="travelToDate" readonly style="border:0px;width:90px;height:30px;font-size:12pt;" value="">'+
			'							</td>'+
			'						</tr>'+
			'					</table>';
			var dateSelectionEle = domCon.toDom(dateSelectionText);
			travelTimeRangeElemnet.domNode.appendChild(dateSelectionEle);
			var travelFromToDateGapEle = dojo.query("[name='travelFromToDateGap']", travelTimeRangeElemnet.domNode)[0];
			this._travelDateStartDialogDijit = this.prepareDateSelectionTooltips(travelTimeRangeElemnet, dojo.query("[name='travelFromDate']",travelTimeRangeElemnet.domNode)[0], dojo.query("[name='travelFromDateSelector']",travelTimeRangeElemnet.domNode)[0], travelTimeRangeElemnet.domNode);
			this._travelDateEndDialogDijit = this.prepareDateSelectionTooltips(travelTimeRangeElemnet, dojo.query("[name='travelToDate']",travelTimeRangeElemnet.domNode)[0], dojo.query("[name='travelToDateSelector']", travelTimeRangeElemnet.domNode)[0], travelTimeRangeElemnet.domNode);
			
			//setup date panel element
			travelDateP.fromDateElement = dojo.query("[name='travelFromDate']",travelTimeRangeElemnet.domNode)[0];
			travelDateP.toDateElement =  dojo.query("[name='travelToDate']",travelTimeRangeElemnet.domNode)[0];
			
			
			//prepare Mate P
			var matePanelText = 
				'					<table style="width:100%;">'+
				'						<tr style="width:100%;">'+
				'							<td rowspan="4" style="width:40px">'+
				'								<img class="travelMateAddButton" alt="" src="../../images/add.png" style="border-radius: 5px 5px 5px 5px; cursor: pointer;">'+
				'							</td>'+
				'							<td class="travelMateKid">幼儿: 0 名'+
				'							</td>'+
				'							<td rowspan="4" style="width:40px">'+
				'								<img class="travelMateEditButton" alt="" src="../../images/Edit-30.png" style="border-radius: 5px 5px 5px 5px; cursor: pointer;">'+
				'							</td>'+
				'						</tr>'+
				'						<tr>'+
				'							<td class="travelMateChildren">儿童: 0 名'+
				'							</td>'+
				'						</tr>'+
				'						<tr>'+
				'							<td class="travelMateAdult">成人: 0 名'+
				'							</td>'+
				'						</tr>'+
				'						<tr>'+
				'							<td class="travelMateAged">老人: 0 名'+
				'							</td>'+
				'						</tr>'+
				'					</table>';
			var matePanelEle = domCon.toDom(matePanelText);
			travelMatesP.domNode.appendChild(matePanelEle);
			var addMateButton = dojo.query(".travelMateAddButton", travelMatesP.domNode)[0];
			this._addMateButton = addMateButton;
			on(addMateButton, "click", function(){
				that._travelMateDialogDijit.clearData();
				that._travelMateDialogDijit.show();
			});
			var editMateButton = dojo.query(".travelMateEditButton", travelMatesP.domNode)[0];
			on(editMateButton, "click", function(){
				that._travelMateListDialogDijit.show();
			});
			/*addMateButton.displayMateCate = function(){
				if(typeof addMateButton.matesData=="object"){
					var kid = 0;
					var children=0;
					var adult=0;
					var aged=0;
					var matesData = addMateButton.matesData;
					for(mateIndex = 0;mateIndex<matesData.length;mateIndex++){
						var mate = matesData[mateIndex];
						if(mate.age<3){
							kid = kid+1;
						}
						if(mate.age>=3&&mate.age<12){
							children = children+1;
						}
						if(mate.age>=12&&mate.age<70){
							adult = adult+1;
						}
						if(mate.age>=70){
							aged = aged+1;
						}
					}
					dojo.query(".travelMateKid", travelMatesP.domNode)[0].innerHTML="幼儿: "+kid+" 名";
					dojo.query(".travelMateChildren", travelMatesP.domNode)[0].innerHTML="儿童: "+children+" 名";
					dojo.query(".travelMateAdult", travelMatesP.domNode)[0].innerHTML="成人: "+adult+" 名";
					dojo.query(".travelMateAged", travelMatesP.domNode)[0].innerHTML="老人: "+aged+" 名";
					that._saveMates(matesData);
				}
			}*/
			
			this._travelMateDialogDijit = this.prepareMateDialog(travelMatesP, function(dataobj){
				if(typeof that._matesData=="object"){
					var mates = that._matesData;
					mates.push(dataobj);
				}else{
					var mates = that._matesData;
					mates.push(dataobj);
				}
				that.displayMateCate(travelMatesP);
			});
			this._travelMateListDialogDijit = this.prepareEditMateDialog(travelMatesP, addMateButton);
			
			
			//Prepare Stage panel
			var stage1 = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:center;display:inline-block;"});
			stage1.domNode.appendChild(domCon.create("div",{innerHTML:"1:计划"}));
			travelStageP.addChild(stage1);
			var stage2 = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:center;display:inline-block;"});
			stage2.domNode.appendChild(domCon.create("div",{innerHTML:"2:准备"}));
			travelStageP.addChild(stage2);
			var stage3 = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:center;display:inline-block;"});
			stage3.domNode.appendChild(domCon.create("div",{innerHTML:"3:细节"}));
			travelStageP.addChild(stage3);
			var stage4 = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:center;display:inline-block;"});
			stage4.domNode.appendChild(domCon.create("div",{innerHTML:"4:打包"}));
			travelStageP.addChild(stage4);
			var stage5 = new RoundRect({style:"margin-left:5px;margin-right:5px;margin-bottom:5px;text-align:center;display:inline-block;"});
			stage5.domNode.appendChild(domCon.create("div",{innerHTML:"5:旅行"}));
			travelStageP.addChild(stage5);
			
			//prepare global
			nameInputBoxElement.on("click", function(){
				DomStyle.set(nameInputBoxElement.domNode,computedInputBoxStyle);
				nameInputBoxElement.domNode.style.width = leftEleWidth-32-75+"px";
			});
			introTextAreaElement.on("click", function(){
				DomStyle.set(introTextAreaElement.domNode,computedTextAreaStyle);
				introTextAreaElement.domNode.style.width = leftEleWidth-32+"px";
				introTextAreaElement.domNode.style.height = 57+"px";
			});
			nameInputBoxElement.on("blur", function(){
				that._saveName(nameInputBoxElement.get("value"));
			});
			introTextAreaElement.on("blur", function(){
				that._saveIntro(introTextAreaElement.get("value"));
			});
			
			on(mainElement, "click", function(event){
				if(event.target!=nameInputBoxElement.domNode){
					nameInputBoxElement.domNode.style.border="0px";
				}
				if(event.target!=introTextAreaElement.domNode){
					introTextAreaElement.domNode.style.border="0px";
					
				}
			});
		},
		calculateDate : function(parentNode){
			var that = this;
			var travelTimeRangeElemnet = parentNode;
			var fromDateStr = dojo.query("[name='travelFromDate']",travelTimeRangeElemnet.domNode)[0].value;
			var toDateStr = dojo.query("[name='travelToDate']",travelTimeRangeElemnet.domNode)[0].value;
			that._saveStartDate(fromDateStr);
			that._saveEndDate(toDateStr);
			if(fromDateStr==""||toDateStr==""){
				this.innerHTML="共  - 天";
				return;
			}
			var fromDateObj = that.getDateObject(fromDateStr);
			var toDateObj = that.getDateObject(toDateStr);
			var gap = (toDateObj.getTime()-fromDateObj.getTime())/86400000;
			
			var travelFromToDateGapEle = dojo.query("[name='travelFromToDateGap']", travelTimeRangeElemnet.domNode)[0];
			travelFromToDateGapEle.innerHTML="共 "+gap+" 天";
		},
		displayMateCate : function(travelMatesP){
			var that = this;
			if(typeof this._matesData=="object"){
				var kid = 0;
				var children=0;
				var adult=0;
				var aged=0;
				var matesData = this._matesData;
				for(mateIndex = 0;mateIndex<matesData.length;mateIndex++){
					var mate = matesData[mateIndex];
					if(mate.age<3){
						kid = kid+1;
					}
					if(mate.age>=3&&mate.age<12){
						children = children+1;
					}
					if(mate.age>=12&&mate.age<70){
						adult = adult+1;
					}
					if(mate.age>=70){
						aged = aged+1;
					}
				}
				dojo.query(".travelMateKid", travelMatesP.domNode)[0].innerHTML="幼儿: "+kid+" 名";
				dojo.query(".travelMateChildren", travelMatesP.domNode)[0].innerHTML="儿童: "+children+" 名";
				dojo.query(".travelMateAdult", travelMatesP.domNode)[0].innerHTML="成人: "+adult+" 名";
				dojo.query(".travelMateAged", travelMatesP.domNode)[0].innerHTML="老人: "+aged+" 名";
				that._saveMates(matesData);
			}
		},
		_saveName : function(name){
			if(this._dataModuleData!=null){
				this._dataModuleData.getCurrentTravelPlan().TravelInfo.travelName=name;
			}
		},
		_saveType : function(type){
			if(this._dataModuleData!=null){
				this._dataModuleData.getCurrentTravelPlan().TravelInfo.travelType=type;
			}
		},
		_saveIntro : function(intro){
			if(this._dataModuleData!=null){
				this._dataModuleData.getCurrentTravelPlan().TravelInfo.travelIntro=intro;
			}
		},
		_saveStartDate : function(startDate){
			if(this._dataModuleData!=null){
				this._dataModuleData.getCurrentTravelPlan().TravelInfo.fromDate=startDate;
			}
		},
		_saveEndDate : function(endDate){
			if(this._dataModuleData!=null){
				this._dataModuleData.getCurrentTravelPlan().TravelInfo.toDate=endDate;
			}
		},
		_saveMates: function(mates){
			if(this._dataModuleData!=null){
				this._dataModuleData.getCurrentTravelPlan().TravelInfo.accompany=mates;
			}
		},
		prepareDateSelectionTooltips: function(mainDijit, parentEle, parentEleSelector, travelTimeRangeElemnet){
			var that = this;
			var tooltip = new Tooltip();
			var typeTipText = "<div><span style='float:left' class='okb'></span><span style='float:right' class='cancelb'></span></div><br/><br/><div class='dateSelectorWeel'></div>";
			var typeTipEle = domCon.toDom(typeTipText);
			tooltip.domNode.appendChild(typeTipEle);
			var dateWeel = new SpinWheelDatePicker();
			dojo.query(".dateSelectorWeel", tooltip.domNode)[0].appendChild(dateWeel.domNode);
			var OKButton = new Button({label:"确定"});
			dojo.query(".okb", tooltip.domNode)[0].appendChild(OKButton.domNode);
			var CancelButton = new Button({label:"取消"});
			dojo.query(".cancelb", tooltip.domNode)[0].appendChild(CancelButton.domNode);
			mainDijit.addChild(tooltip);
			
			
			dateWeel.startup();
			OKButton.startup();
			CancelButton.startup();
			tooltip.startup();
			OKButton.on("click", function(){
				var dateStr = dateWeel.get("value");
				parentEle.value = dateStr;
				that.calculateDate(travelTimeRangeElemnet);
				tooltip.hide();
				tooltip.isViewable = false;
			});
			CancelButton.on("click", function(){
				tooltip.hide();
				tooltip.isViewable = false;
			});
			on(parentEleSelector, "click", function(){
				tooltip.show(parentEleSelector);
				tooltip.isViewable = true;
			});
			tooltip.on("blur", function(){
				tooltip.hide();
			});
			return tooltip;
		},
		prepareTypeTooltips: function(mainDijit, parentEle){
			var that = this;
			var tooltip = new ItemSelectTooltip();
			mainDijit.addChild(tooltip);
			tooltip.parentRootElement = parentEle;
			var theTypeData = dataModule.getTravelPlanType();
			tooltip.updateData(theTypeData);
			tooltip.createList();
			on(parentEle, "click", function(){
				tooltip.showTip(parentEle);
			});
			tooltip.on("listItemClicked",function(itemData){
				parentEle.value=itemData.label;
				parentEle.selectedTypeID = itemData.id;
				that._saveType(itemData.id);
			});
			tooltip.on("blur", function(){
				tooltip.hide();
			});
			return tooltip;
		},
		prepareMateDialog : function(mainDijit, callback){
			var contentElementText = "<div style='text-align:center;font-size:13pt;'>添加成员<hr/><table>"+
 			"<tr>"+
 			"<td class='addMateNamelabel'>"+
 			"</td>"+
 			"<td class='addMateName'>"+
 			"</td>"+
 			"</tr>"+
 			"<tr>"+
 			"<td class='addMateGenderlabel'>"+
 			"</td>"+
 			"<td class='addMateGender'>"+
 			"</td>"+
 			"</tr>"+
 			"<tr>"+
 			"<td class='addMateAgelabel'>"+
 			"</td>"+
 			"<td class='addMateAge'>"+
 			"</td>"+
 			"</tr>"+
 			"<tr>"+
 			"<td class='addMateCommentslabel'>"+
 			"</td>"+
 			"<td class='addMateComments'>"+
 			"</td>"+
 			"</tr>"+
 			"<tr>"+
 			"<td>"+
 			"</td>"+
 			"<td style='text-align;center;'>"+
 			"<span class='OKButton'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
 			"<span class='CancelButton'></span>"+
 			"</td>"+
 			"</tr>"+
 			"</table></div>";
	 		var contentElementEle = domCon.toDom(contentElementText);
	 		dojo.query(".addMateNamelabel", contentElementEle)[0].innerHTML="姓名";
	 		dojo.query(".addMateGenderlabel", contentElementEle)[0].innerHTML="性别";
	 		dojo.query(".addMateAgelabel", contentElementEle)[0].innerHTML="年龄";
	 		dojo.query(".addMateCommentslabel", contentElementEle)[0].innerHTML="备注";
	 		
	 		var mateNameTextBox = new TextBox();
	 		dojo.query(".addMateName", contentElementEle)[0].appendChild(mateNameTextBox.domNode);
	 		var mateGenderSwitch = new Switch({leftLabel:"男",rightLabel:"女"});
	 		dojo.query(".addMateGender", contentElementEle)[0].appendChild(mateGenderSwitch.domNode);
	 		var mateAgeSlider = new Slider({min:0,max:100,style:"width:180px;",intermediateChanges:true});
	 		var mateAgeDiv = domCon.create("div");
	 		mateAgeDiv.innerHTML="0 岁";
	 		mateAgeSlider.on("change", function(){
	 			mateAgeDiv.innerHTML=mateAgeSlider.get("value")+" 岁";
	 		});
	 		dojo.query(".addMateAge", contentElementEle)[0].appendChild(mateAgeDiv);
	 		dojo.query(".addMateAge", contentElementEle)[0].appendChild(mateAgeSlider.domNode);
	 		var mateCommentsTextArea = new TextArea();
	 		dojo.query(".addMateComments", contentElementEle)[0].appendChild(mateCommentsTextArea.domNode);
	 		
	 		var okButtonButton = new Button({label:"确定"});
	 		dojo.query(".OKButton", contentElementEle)[0].appendChild(okButtonButton.domNode);
	 		var cancelButtonButton = new Button({label:"关闭"});
	 		dojo.query(".CancelButton", contentElementEle)[0].appendChild(cancelButtonButton.domNode);
	 		
	 		var addMateDialog = new SimpleDialog({closeButton:true});
	 		
	 		mainDijit.addChild(addMateDialog);
	 		addMateDialog.containerNode.appendChild(contentElementEle);
	 		addMateDialog.startup();
	 		
	 		okButtonButton.on("click", function(){
	 			if(typeof callback=="function"){
	 				var dataobject = {};
		 			dataobject.name=mateNameTextBox.get("value");
		 			var gender = mateGenderSwitch.get("value");
		 			if(gender=="on"){
		 				gender="male";
		 			}else{
		 				gender="female"
		 			}
		 			dataobject.gender = gender;
		 			dataobject.age=mateAgeSlider.get("value");
		 			dataobject.comment=mateCommentsTextArea.get("value");
	 				callback(dataobject);
	 			}
	 			addMateDialog.hide();
	 		});
	 		cancelButtonButton.on("click", function(){
	 			addMateDialog.hide();
	 		});
	 		addMateDialog.clearData = function(){
	 			mateNameTextBox.set("value","");
	 			mateGenderSwitch.set("value", "on");
	 			mateAgeSlider.set("value",0);
	 			mateCommentsTextArea.set("value","");
	 		};
	 		return addMateDialog;
		},
		prepareEditMateDialog : function(mainDijit, dataDijit){
			var that = this;
			var data = this._matesData;
			var editMateDialogText = "<div style='text-align:center;font-size:13pt;'>成员列表<hr/><div>"+
					"<table style='width:100%;height:100%;'>"+
					"<tr>"+
					"	<td class='mateList' colspan='2'>"+
					"	</td>"+
					"</tr>"+
					"<tr style='height:35px;'>"+
					"	<td class='okButton'>"+
					"	</td>"+
					"	<td class='cancelButton'>"+
					"	</td>"+
					"</tr>"+
					"</table>";
			var contentElementEle = domCon.toDom(editMateDialogText);
			
	 		
	 		
	 		
	 		var editMateListDialog = new SimpleDialog({closeButton:true,top:"150px"});
	 		
	 		mainDijit.addChild(editMateListDialog);
	 		editMateListDialog.containerNode.appendChild(contentElementEle);
	 		editMateListDialog.startup();
	 		
	 		aspect.before(editMateListDialog, "show", function(){
	 			editMateListDialog.destroyDescendants();
	 		});
	 		
	 		aspect.after(editMateListDialog, "show", function(){
	 			data = that._matesData;
	 			
	 			var okButtonButton = new Button({label:"确定"});
		 		dojo.query(".okButton", contentElementEle)[0].appendChild(okButtonButton.domNode);
		 		var cancelButtonButton = new Button({label:"关闭"});
		 		dojo.query(".cancelButton", contentElementEle)[0].appendChild(cancelButtonButton.domNode);
		 		
		 		
		 		var mateList = new RoundRectList();
		 		
		 		
		 		var winHeight = win.getBox().h;
		 		var outViewEle = ViewController.getCurrentView();
		 		var headerEle = dojo.query("div[data-dojo-type='dojox/mobile/Heading']",outViewEle.domNode)[0];
				var headerHeight = domgeo.getContentBox(headerEle);
		 		var dialogHeight = winHeight-headerHeight.h-350;
		 		
		 		var scrollP = new ScrollablePane();
		 		scrollP.containerNode.appendChild(mateList.domNode);
		 		dojo.query(".mateList", contentElementEle)[0].appendChild(scrollP.domNode);
		 		scrollP.startup();
		 		okButtonButton.on("click", function(){
		 			editMateListDialog.hide();
		 		});
		 		cancelButtonButton.on("click", function(){
		 			editMateListDialog.hide();
		 		});
	 			
	 			if(that._dataModuleData!=null){
	 				
	 				var genderCVT = that._dataModuleData.getCodedValue("gender");
		 			for(mateIndex=0;mateIndex<data.length;mateIndex=mateIndex+1){
			 			var mateData = data[mateIndex];
			 			var genderStr = "";
			 			for(genderCVTI = 0;genderCVTI<genderCVT.length;genderCVTI++){
			 				var genderObj = genderCVT[genderCVTI];
			 				if(genderObj.value==mateData.gender){
			 					genderStr = genderObj.label;
			 				}
			 			}
			 			var displayText = mateData.name+" "+genderStr+" "+mateData.age+"岁";
			 			var matt = new ListItem({label:displayText,deleteIcon:"../../images/delete-trash-30.png"});
			 			matt.theDataIndex = mateIndex;
			 			matt.startup();
			 			var deleteItem = dojo.query(".mblListItemDeleteIcon", matt.domNode)[0];
			 			deleteItem.parentDijit = matt;
			 			deleteItem.style.cursor="pointer";
			 			deleteItem.style.backgroundColor="#f9a4b1";
			 			deleteItem.style.borderRadius="5px";
			 			//dojo.attr(deleteItem, "margin-left:15px;background-color:#f9a4b1;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;");
			 			on(deleteItem, "click", function(){
			 				mateList.removeChild(this.parentDijit);
			 				data.splice(this.parentDijit.theDataIndex,1);
			 				that.displayMateCate(mainDijit);
			 			});
			 			mateList.addChild(matt);
			 		}
		 			
		 			var scrollPEleBox = domgeo.getContentBox(scrollP.domNode);
			 		scrollPEleBox.h=dialogHeight;
			 		domgeo.setContentSize(scrollP.domNode, scrollPEleBox);
			 		editMateListDialog.startup();
				}
	 		});
	 		
	 		
	 		
	 		
	 		return editMateListDialog;
		},
		prepareStepFunctionDialog : function(){
			var roundRect = new RoundRectList();
			
		},
		getDateObject: function (dateStr){
			var dateStrs = dateStr.split("-");
			var year = dateStrs[0];
			var month = dateStrs[1];
			var day = dateStrs[2];
			var returnDate = new Date(year,month-1,day);
			return returnDate;
		},
		updateDataAllFromDataModule: function(allData){
			this._dataModuleData = allData;
			var travelPlan = allData.getCurrentTravelPlan();
			var name = travelPlan.TravelInfo.travelName;
			var intro = travelPlan.TravelInfo.travelIntro;
			var type = travelPlan.TravelInfo.travelType;
			var fromDate = travelPlan.TravelInfo.fromDate;
			var toDate = travelPlan.TravelInfo.toDate;
			var mates = travelPlan.TravelInfo.accompany;
			this._travelNameP.nameElement.set("value",name);
			var typeStr = "";
			var typeCodedValue = allData.getTravelPlanType();
			for(typeCVTI = 0;typeCVTI<typeCodedValue.length;typeCVTI++){
				var typeCodeObj = typeCodedValue[typeCVTI];
				if(typeCodeObj.id==type){
					typeStr = typeCodeObj.label;
					break;
				}
			}
			this._travelNameP.typeElement.set("value",typeStr);
			this._travelIntroP.introElement.set("value",intro);
			this._travelDateP.fromDateElement.value=fromDate;
			this._travelDateP.toDateElement.value=toDate;
			this._matesData = mates;
			this.calculateDate(this._travelDateP);
			this.displayMateCate(this._travelMatesP);
		},
		createItem : function(itemData){},
		updateData: function(theData, groupData){},
		prepareAddItemDialog : function(){},
		destory : function(){}
	});
	return travelCommonInfoPane;
});

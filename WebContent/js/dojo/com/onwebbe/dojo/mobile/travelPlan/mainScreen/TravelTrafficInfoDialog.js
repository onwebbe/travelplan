define("com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelTrafficInfoDialog", 
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
 		"com/onwebbe/dojo/mobile/dijit/TabRadioSelection",
 		"dojox/mobile/parser",
 		"dojox/mobile/CheckBox",
 		"dojox/mobile/TextBox",
 		"dojo/on",
 		"dojox/mobile/SimpleDialog",
 		"dojox/mobile/ScrollablePane",
 		"com/onwebbe/dojo/mobile/MobileDynamicViewController",
 		"dojox/mobile/TextArea",
 		"dojox/mobile/SpinWheelDatePicker",
 		"dojox/mobile/SpinWheelTimePicker",
 		"dojox/mobile/Tooltip",
 		"dojox/mobile/Button",
 		"dojox/mobile/Switch",
 		"dojox/mobile/Slider",
 		"dojox/mobile/RoundRectList",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/Accordion",
 		"dojox/mobile/ListItem",
 		"dojox/mobile/RadioButton"
 		], 
 	function(declare, DomStyle, Evented, registry, aspect, domgeo, win, RoundRect, domCon, GroupDataUtil, ContentPane, TabRadioSelection, parser, CheckBox, TextBox, on, SimpleDialog, ScrollablePane, ViewController, TextArea, SpinWheelDatePicker, SpinWheelTimePicker, Tooltip, Button, Switch, Slider, RoundRectList, ListItem){
	/* Module:
	 * com.onwebbe.dojo.mobile.travelPlan.mainScreen.TravelTrafficInfoDialog
	 * com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelTrafficInfoDialog
	 * 
	 * Event
	 * itemConfirmed
	 * 
	 * Summary:
	*/
	var travelInfoDialog =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelTrafficInfoDialog", [SimpleDialog,Evented], {
		_editable : true,
		_dataModuleData : null,
		
		_tabRadioSelectTrafficType : null,
		_tabRadioSelectTrafficBookingType : null,
		_tabRadioSelectTrafficBookingStatus : null,
		_totalAmount : null,
		_paiedAmount : null,
		_trafficFrom : null,
		_trafficTo : null,
		_dtTooltip : null,
		initParams : function(){
			if(true==params.editable){
				this._editable = true;
			}else{
				this._editable = false;
			}
			
		},
		postCreate: function(){
			//this.initParams();
			this.domNode.style.width="500px";
			var that = this;
			var dialogConentText = '<table style="text-align:center;width:100%;">'+
			'<tr>'+
			'	<td colspan="4">'+
			'		编辑/添加旅行交通'+
			'	<hr/>'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td width="80px">'+
			'		类型:'+
			'	</td>'+
			'	<td class="trafficType" colspan="3">'+     //火车/汽车/轮船/飞机/自驾/出租
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		订单类型:'+
			'	</td>'+
			'	<td class="bookingType" colspan="3">'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		订单状态:'+
			'	</td>'+
			'	<td class="bookingStatus" colspan="3">'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		价格:'+
			'	</td>'+
			'	<td class="totalAmount">'+
			'	</td>'+
			'	<td style="width:63px;">'+
			'		已支付:'+
			'	</td>'+
			'	<td class="paidAmount" style="width:150px;">'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		出发:'+
			'	</td>'+
			'	<td class="trafficFrom">'+
			'	</td>'+
			'	<td class="trafficFromClockItem" style="text-align:center;">'+
			'		<img src="../../images/calendar-time-icon-30.png" style="background-color:white;border-radius:5px;curser;"/>'+
			'	</td>'+
			'	<td class="trafficFromClock" valign="middle">'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		到达:'+
			'	</td>'+
			'	<td class="trafficTo">'+
			'	</td>'+
			'	<td class="trafficToClockItem" style="text-align:center;">'+
			'		<img src="../../images/calendar-time-icon-30.png" style="background-color:white;border-radius:5px;cursor:pointer;"/>'+
			'	</td>'+
			'	<td class="trafficToClock" valign="middle">'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td colspan="4" class="buttons" style="text-align:center;">'+
			'	<hr/>'+
			'	</td>'+
			'</tr>'+
			'</table>';
			var dialogConentEle = domCon.toDom(dialogConentText);
			var tabRadioSelectTrafficType = new TabRadioSelection();
			this._tabRadioSelectTrafficType= tabRadioSelectTrafficType;
			dojo.query(".trafficType", dialogConentEle)[0].appendChild(tabRadioSelectTrafficType.domNode);
			
			var tabRadioSelectTrafficBookingType = new TabRadioSelection();
			this._tabRadioSelectTrafficBookingType= tabRadioSelectTrafficBookingType;
			dojo.query(".bookingType", dialogConentEle)[0].appendChild(tabRadioSelectTrafficBookingType.domNode);
			
			var tabRadioSelectTrafficBookingStatus = new TabRadioSelection();
			this._tabRadioSelectTrafficBookingStatus= tabRadioSelectTrafficBookingStatus;
			dojo.query(".bookingStatus", dialogConentEle)[0].appendChild(tabRadioSelectTrafficBookingStatus.domNode);

			var totalAmount = new TextBox({style:"width:60px;"});
			this._totalAmount= totalAmount;
			dojo.query(".totalAmount", dialogConentEle)[0].appendChild(totalAmount.domNode);
			
			var paidAmount = new TextBox({style:"width:60px;"});
			this._paidAmount= paidAmount;
			dojo.query(".paidAmount", dialogConentEle)[0].appendChild(paidAmount.domNode);
			
			var trafficFrom = new TextBox({style:"width:100px;"});
			this._trafficFrom= trafficFrom;
			dojo.query(".trafficFrom", dialogConentEle)[0].appendChild(trafficFrom.domNode);
			
			var trafficTo = new TextBox({style:"width:100px;"});
			this._trafficTo= trafficTo;
			dojo.query(".trafficTo", dialogConentEle)[0].appendChild(trafficTo.domNode);
			
			dojo.query(".trafficFromClockItem", dialogConentEle)[0].textElement = dojo.query(".trafficFromClock", dialogConentEle)[0];
			dojo.query(".trafficToClockItem", dialogConentEle)[0].textElement = dojo.query(".trafficToClock", dialogConentEle)[0];
			
			this.own(on(dojo.query(".trafficFromClockItem", dialogConentEle)[0], "click", function(){
				that._dtTooltip.sourceElement = this;
				that._dtTooltip.show(this);
			}));
			this.own(on(dojo.query(".trafficToClockItem", dialogConentEle)[0], "click", function(){
				that._dtTooltip.sourceElement = this;
				that._dtTooltip.show(this);
			}));
			
			var confirmationButton = new Button({label:"确定"});
			var cancelButton = new Button({label:"关闭"});
			this.own(confirmationButton.on("click", function(){
				that.emit("itemConfirmed",dataobj);
				that.hide();
			}));
			this.own(cancelButton.on("click", function(){
				that.hide();
			}));
			dojo.query(".buttons", dialogConentEle)[0].appendChild(confirmationButton.domNode);
			dojo.query(".buttons", dialogConentEle)[0].appendChild(domCon.create("span",{innerHTML:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}));
			dojo.query(".buttons", dialogConentEle)[0].appendChild(cancelButton.domNode);
			
			this.domNode.appendChild(dialogConentEle);
			
			this.prepareTooltipForDateTime();
		},
		updateDataAllFromDataModule : function(allData){
			this._dataModuleData = allData;
			
			var trafficTypes = this._dataModuleData.getCodedValue("TrafficType");
			this._tabRadioSelectTrafficType.updateData(trafficTypes);
			var bookingTypes = this._dataModuleData.getCodedValue("BookingType");
			this._tabRadioSelectTrafficBookingType.updateData(bookingTypes);
			var bookingStatus = this._dataModuleData.getCodedValue("BookingStatus");
			this._tabRadioSelectTrafficBookingStatus.updateData(bookingStatus);
		},
		onclickDateTimeTooltip : function(values){
			var that = this;
			var dateAndTime = values[0][0]+"-"+parseInt(values[0][1])+"-"+values[0][2]+" "+values[1][0]+":"+values[1][1];
			that._dtTooltip.sourceElement.textElement.innerHTML=dateAndTime;
		},
		prepareTooltipForDateTime : function(){
			var that = this;
			var dtTooltip = new Tooltip();
			this.domNode.appendChild(dtTooltip.domNode);
			this._dtTooltip = dtTooltip;
			var dateWheel = SpinWheelDatePicker({style:"display:inline-block;"});
			var timeWheel = SpinWheelTimePicker({style:"display:inline-block;"});
			dtTooltip.containerNode.style.textTextAlign="center";
			var closeButton = new Button({label:"关闭", style:"display:block;float:right;margin-right:60px;"});
			closeButton.own(closeButton.on("click",function(){
				dtTooltip.hide();
			}));
			var confirmButton = new Button({label:"确定", style:"display:block;float:left;margin-left:60px;"});
			confirmButton.own(confirmButton.on("click",function(){
				var datevalues = dateWheel.get("values");
				var timevalues = timeWheel.get("values");
				
				var dtvalues = new Array();
				dtvalues.splice(dtvalues.length,1,datevalues);
				dtvalues.splice(dtvalues.length,1,timevalues);
				that.onclickDateTimeTooltip(dtvalues);
				dtTooltip.hide();
			}));
			
			
			var functionDiv = domCon.create("div",{style:"width:100%;text-align:center;"})
			functionDiv.appendChild(confirmButton.domNode);
			functionDiv.appendChild(closeButton.domNode);
			
			
			dtTooltip.containerNode.appendChild(dateWheel.domNode);
			dtTooltip.containerNode.appendChild(timeWheel.domNode);
			dtTooltip.containerNode.appendChild(functionDiv);
			dtTooltip.isstartedup = false;
			aspect.before(dtTooltip, "show", function(){
				if(dtTooltip.isstartedup==false){
					dateWheel.startup();
					timeWheel.startup();
					dtTooltip.isstartedup = true;
				}
			});
		},
		destory : function(){}
	});
	return travelInfoDialog;
});

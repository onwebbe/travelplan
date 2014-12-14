define("com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelTrafficInfoItem", 
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
	 * com.onwebbe.dojo.mobile.travelPlan.mainScreen.TravelTrafficInfoItem
	 * com/onwebbe/dojo/mobile/travelPlan/mainScreen/TravelTrafficInfoItem
	 * 
	 * 
	 * Summary:
	*/
	var travelTrafficInfoItem =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelTrafficInfoItem", [ListItem,Evented], {
		_editable : true,
		_dataModuleData : null,

		postCreate: function(){
			var contentText = '<table style="width:100%;">'+
			'<tr>'+
			'	<td rowspan="2">'+
			'		<div class="trafficIcon" alt="trafficIcon"></div>'+
			'	</td>'+
			'	<td>'+
			'		<div class="fromDT">from time</div>'+
			'	</td>'+
			'	<td>'+
			'		<div class="fromLocation">from location</div>'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		<div class="toDT">to time</div>'+
			'	</td>'+
			'	<td>'+
			'		<div class="toLocation">to location</div>'+
			'	</td>'+
			'</tr>'+
			'<tr>'+
			'	<td>'+
			'		<div class="bookingType">booking Type</div>'+
			'	</td>'+
			'	<td colspan="2">'+
			'		<div class="payInfo">paid</div>'+
			'	</td>'+
			'</tr>'+
			'</table>';
			this.domNode.style.height="143px";
			var contentEle = domCon.toDom(contentText);
			dojo.query(".mblListItemLabel", this.containerNode)[0].appendChild(contentEle);
		},
		updateDataAllFromDataModule : function(allData){
			this._dataModuleData = allData;
			var data = allData.getCurrentTravelPlan();
			
		},
		updateData : function(data){
			var imgSRC = "";
			var imgALT = "";
			var fromDT = "";
			var toDT = "";
			var fromLocation = "";
			var toLocation = "";
			var bookingStatus = "";
			var bookingType = "";
			var bookingTypeIMGSRC = "";
			var bookingTypeIMGALT = "";
			var type = "";
			type = data.type;
			fromDT = data.fromDT;
			toDT = data.toDT;
			fromLocation = data.fromLocation;
			toLocation = data.toLocation;
			bookingStatus = data.bookingStatus;
			bookingType = data.bookingType;
			var trafficTypeCVTs = this._dataModuleData.getCodedValue("TrafficType");
			var bookingTypeCVTs = this._dataModuleData.getCodedValue("BookingType");
			
			
			for(ti=0;ti<trafficTypeCVTs.length;ti++){
				var trafficTypeCVT = trafficTypeCVTs[ti];
				if(trafficTypeCVT.value==type){
					imgSRC = trafficTypeCVT.img;
					imgALT = trafficTypeCVT.label;
				}
			}
			if(imgALT==""){
				imgALT=type;
			}
			
			for(bi=0;bi<bookingTypeCVTs.length;bi++){
				var bookingTypeCVT = bookingTypeCVTs[bi];
				if(bookingTypeCVT.value==bookingType){
					bookingTypeIMGSRC = bookingTypeCVT.img;
					bookingTypeIMGALT = bookingTypeCVT.label;
				}
			}
			if(bookingTypeIMGALT==""){
				bookingTypeIMGALT=bookingType;
			}
			
			
			
		
			//{id:"01", type:"flight", bookingType:"internet", bookingStatus:"new", totalPrice:"1000", paid:"300", fromLocation:"上海", toLocation:"深证", fromDT:"2014-01-01 11:00", toDT:"2014-01-01 13:00"}
			dojo.query(".trafficIcon",this.containerNode)[0].innerHTML="";
			dojo.query(".trafficIcon",this.containerNode)[0].appendChild(domCon.create("img", {src:imgSRC, alt:imgALT}));
			
			dojo.query(".fromDT",this.containerNode)[0].innerHTML="";
			dojo.query(".fromDT",this.containerNode)[0].appendChild(domCon.create("span", {innerHTML:fromDT}));
			
			dojo.query(".toDT",this.containerNode)[0].innerHTML="";
			dojo.query(".toDT",this.containerNode)[0].appendChild(domCon.create("span", {innerHTML:toDT}));
			
			dojo.query(".fromLocation",this.containerNode)[0].innerHTML="";
			dojo.query(".fromLocation",this.containerNode)[0].appendChild(domCon.create("span", {innerHTML:fromLocation}));
			
			dojo.query(".toLocation",this.containerNode)[0].innerHTML="";
			dojo.query(".toLocation",this.containerNode)[0].appendChild(domCon.create("span", {innerHTML:toLocation}));
			
			dojo.query(".bookingType",this.containerNode)[0].innerHTML="";
			dojo.query(".bookingType",this.containerNode)[0].appendChild(domCon.create("img", {src:bookingTypeIMGSRC, alt:bookingTypeIMGALT}));
			
		},
		destory : function(){}
	});
	return travelTrafficInfoItem;
});

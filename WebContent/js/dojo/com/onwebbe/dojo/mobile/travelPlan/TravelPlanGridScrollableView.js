define("com/onwebbe/dojo/mobile/travelPlan/TravelPlanGridScrollableView", [
	"dijit/registry",
	"dojo/_base/declare",
	"dojox/mobile/ScrollableView",
	"com/onwebbe/dojo/mobile/travelPlan/TravelDraftInfoPane"
], function(registry, declare, ScrollableView, TravelDraftInfoPane){
	/* Module:
	 * com.onwebbe.dojo.mobile.common.AddDocView
	 * 
	 * Summary:
	*/
	var scrollableView =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelPlanGridScrollableView", ScrollableView, {
		addDocument: function(data){
			var travelInfoPane = new TravelDraftInfoPane({"data":data});
			//travelInfoPane.startup();
			var thisNode = this.domNode;
			var gridPanel = dojo.query("[data-dojo-type='dojox/mobile/GridLayout']",thisNode)[0];
			var gridPanelWidget = null;
			if(gridPanel!=null){
				gridPanelWidget = registry.byId(gridPanel.id);
			}
			gridPanelWidget.addChild(travelInfoPane);
			gridPanelWidget.startup();
		},
		deleteDocument: function(documentID){
			
		}
	});
		
	return scrollableView;
});

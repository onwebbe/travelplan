/* 
 * Author:
 * onwebbe - Tai
 * 
 * Created On:
 * 30 Jul 2014
 * 
 * Version:
 * 1.0
 * 
 */
define("com/onwebbe/dojo/mobile/GroupDataUtil", ["dojo/_base/declare"
], function(declare){
	/* 
	 * Module:
	 * com.onwebbe.dojo.mobile.GroupDataUtil
	 * com/onwebbe/dojo/mobile/GroupDataUtil
	 * 
	 */
	
	var groupUtil =  declare("com.onwebbe.dojo.mobile.GroupDataUtil", null, {
		_groups: {},
		_groupFunction: null,
		constractor: function(data,fn){
			this._groupFunction = fn;
			this.initialData(data);
		},
		setFunction: function(fn){
			this._groupFunction = fn;
		},
		getGroups: function(){
			var groupInfo = new Array();
			for(i in this._groups){
				groupInfo.push(i);
			}
			return groupInfo;
		},
		getGroupItems: function(group){
			return this._groups[group];
		},
		addItem: function(item){
			if(typeof this._groupFunction=="function"){
				var groupData = this._groupFunction(item);
				if(!this._groups[groupData]){
					var tmpData = new Array();
					tmpData.push(item);
					this._groups[groupData] = tmpData;
				}else{
					this._groups[groupData].push(item);
				}
			}else{
				var groupData = item[this._groupFunction];
				if(!this._groups[groupData]){
					var tmpData = new Array();
					tmpData.push(item);
					this._groups[groupData] = tmpData;
				}else{
					this._groups[groupData].push(item);
				}
			}
		},
		addItems: function(items){
			this.initialData(items);
		},
		setGroupRule: function(fn){
			this._groupFunction = fn;
		},
		initialData: function(data){
			for(i=0;i<data.length;i++){
				var tmpData = data[i];
				this.addItem(tmpData);
			}
		},
		getAllDataByGroup: function(){
			return this._groups;
		},
		clearAllData: function(){
			this._groups={};
		}
	});
	
	
	return groupUtil;
});

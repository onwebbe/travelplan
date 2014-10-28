define("com/onwebbe/dojo/mobile/travelPlan/TravelDataJSONStore", [
	"dojo/_base/declare",
	"dojo/json",
	"dojo/_base/array",
	"dojo/request",
], function(declare, JSON, array, request){
	/* Module:
	 * com.onwebbe.dojo.mobile.common.AddDocView
	 * 
	 * Summary:
	*/
	
	var TravelTarget = {};
	var TargetType = {};
	var SelectedTarget = {};
	var PackageItemCategory = {};
	var PackageItemList = {};
	var travelDataJSONStore =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelDataJSONStore", null, {
		
	});
	travelDataJSONStore.getSelectedTarget = function(){
		return SelectedTarget;
	};
	travelDataJSONStore.setSelectedTarget = function(selected){
		return SelectedTarget = selected;
	};
	travelDataJSONStore.initData = function(){
	};
	travelDataJSONStore.retriveData = function(){
		TravelTarget = [{id:"1",searchName:"",targetName:"Hongkong",targetNameE:"Hongkong",targetNameC:"香港",targetNameP:"XiangGang",targetTypes:"1,2,3",continent:"亚洲",province:"",country:"",adviceLength:3},
		                {id:"2",searchName:"",targetName:"Singapore",targetNameE:"Singapore",targetNameC:"新加坡",targetNameP:"XinJiaPo",targetTypes:"1,2",continent:"亚洲",province:"",country:"",adviceLength:5},
		                {id:"3",searchName:"",targetName:"America",targetNameE:"America",targetNameC:"美国",targetNameP:"MeiGuo",targetTypes:"1,2,3,4",continent:"北美州",province:"",country:"",adviceLength:10}];
		TargetType = [{id:"island",label:"岛屿",TargetTypeDescription:""},
		              {id:"city",label:"城市",TargetTypeDescription:""},
		              {id:"mountain",label:"山区",TargetTypeDescription:""},
		              {id:"ship",label:"邮轮",TargetTypeDescription:""},
		              {id:"beach",label:"沙滩",TargetTypeDescription:""}];
		SelectedTarget = {};
		
		PackageItemCategory = [{"id":"WASHING-OTHER","label":"洗漱及其他","labelE":"Washing-Other","labelP":"XiShuJiQiTa"},
		                       {"id":"CLOTH","label":"衣物","labelE":"Cloth","labelP":"YiWu"},
		                       {"id":"DOCUMENT","label":"文档","labelE":"Document","labelP":"WenDang"},
		                       {"id":"ELECTRONIC","label":"电子设备","labelE":"Electronic","labelP":"DianZiSheBei"},
		                       {"id":"MEDICINE","label":"药品","labelE":"Medicine","labelP":"YaoPin"},
		                       {"id":"FOOD","label":"食品","labelE":"Food","labelP":"ShiPin"},
		                       {"id":"PHOTOGRAPHIC","label":"相机","labelE":"Photographic","labelP":"XiangJi"}];
		PackageItemList = [{"id":"1","label":"身份证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"2","label":"护照","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"3","label":"银行卡、现金","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"4","label":"机票或打印信息","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"5","label":"边防证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"6","label":"地图、攻略、电话清单","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"7","label":"学生证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"8","label":"记者证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"9","label":"导游证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"10","label":"军人证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"11","label":"残疾证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"12","label":"笔","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"13","label":"笔记本","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"14","label":"驾照","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"15","label":"备用照片","labelE":"","labelP":"","category":"DOCUMENT"},
		                   {"id":"16","label":"签证","labelE":"","labelP":"","category":"DOCUMENT"},
		                   
		                   
		                   {"id":"17","label":"帽子","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"18","label":"太阳镜","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"19","label":"户外鞋","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"20","label":"换洗衣物袜子","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"21","label":"拖鞋","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"22","label":"背包、防雨罩","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"23","label":"腰包或小包","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"24","label":"冲锋衣裤","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"25","label":"羽绒服","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"26","label":"睡袋","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"27","label":"颈枕、眼罩","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"28","label":"全指手套","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"29","label":"露指手套","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"30","label":"头灯","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"31","label":"围脖","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"32","label":"登山杖","labelE":"","labelP":"","category":"CLOTH"},
		                   {"id":"33","label":"耳塞、充气枕","labelE":"","labelP":"","category":"CLOTH"},
		                   
		                   {"id":"34","label":"牙刷、牙膏","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"35","label":"梳子","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"36","label":"毛巾","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"37","label":"肥皂","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"38","label":"小装洗面奶","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"39","label":"小包洗发水","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"40","label":"防晒霜","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"41","label":"护肤润唇、湿纸巾","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"42","label":"指甲钳、小剪刀","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"43","label":"剃须刀（男）","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"44","label":"美容用品（女）","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"45","label":"生理用品（女）","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"46","label":"防蚊虫药水","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"47","label":"水壶","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"48","label":"瑞士军刀","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"49","label":"计生用品（夫妻档）","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"50","label":"绳子","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"51","label":"面巾纸","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"52","label":"扑克","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"53","label":"塑料袋","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"54","label":"求生哨","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"55","label":"小锁","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"56","label":"手表","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"57","label":"指南针","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"58","label":"GPS、海拔仪","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"59","label":"饭盒","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"60","label":"沙滩鞋","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"61","label":"小型望远镜","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"62","label":"拖线板","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   {"id":"63","label":"打火机/火柴","labelE":"","labelP":"","category":"WASHING-OTHER"},
		                   
		                   {"id":"64","label":"感冒药","labelE":"","labelP":"","category":"MEDICINE"},
		                   {"id":"65","label":"外伤药`","labelE":"","labelP":"","category":"MEDICINE"},
		                   {"id":"66","label":"高原反应药","labelE":"","labelP":"","category":"MEDICINE"},
		                   {"id":"67","label":"胃药","labelE":"","labelP":"","category":"MEDICINE"},
		                   {"id":"68","label":"金霉素眼药膏、眼药水","labelE":"","labelP":"","category":"MEDICINE"},
		                   {"id":"69","label":"泡腾片、西洋参","labelE":"","labelP":"","category":"MEDICINE"},
		                   {"id":"70","label":"维生素","labelE":"","labelP":"","category":"MEDICINE"},
		                   
		                   {"id":"71","label":"巧克力、牛肉干、奶糖","labelE":"","labelP":"","category":"FOOD"},
		                   {"id":"72","label":"压缩饼干","labelE":"","labelP":"","category":"FOOD"},
		                   {"id":"73","label":"口香糖","labelE":"","labelP":"","category":"FOOD"},
		                   {"id":"74","label":"红牛、矿泉水","labelE":"","labelP":"","category":"FOOD"},
		                   {"id":"75","label":"方便面、火腿肠、水果","labelE":"","labelP":"","category":"FOOD"},
		                   
		                   {"id":"76","label":"手机","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"77","label":"充电器","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"78","label":"充电线","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"79","label":"USB集线器","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"80","label":"对讲机","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"81","label":"随身听","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"82","label":"无源音响","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   {"id":"83","label":"吹风机","labelE":"","labelP":"","category":"ELECTRONIC"},
		                   
		                   {"id":"84","label":"相机、镜头","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"85","label":"三脚架，快门线","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"86","label":"相机包","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"87","label":"SD卡","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"88","label":"备用电池","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"89","label":"气吹、擦镜纸","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"90","label":"滤镜、黑卡","labelE":"","labelP":"","category":"PHOTOGRAPHIC"},
		                   {"id":"91","label":"DV","labelE":"","labelP":"","category":"PHOTOGRAPHIC"}];
		travelDataJSONStore.readChinaTarget();
	};
	travelDataJSONStore.getPackageItemList = function(){
		return PackageItemList;
	}
	travelDataJSONStore.getPackageItemCategory = function(){
		return PackageItemCategory;
	}
	travelDataJSONStore.readChinaTarget = function(){
		travelDataJSONStore._readJSONFile("chinaTravelTarget.json","TravelTarget");
	};
	travelDataJSONStore.readInternationalTarget = function(){
		travelDataJSONStore._readJSONFile("internationalTravelTarget.json","TravelTarget");
	};
	travelDataJSONStore.readInternationalTargetByContinent = function(continent){
		travelDataJSONStore._readJSONFile("internationalTravelTarget"+continent+".json","TravelTarget");
		//console.log(TravelTarget);
		/*TravelTarget = array.filter(TravelTarget, function(item){
			var itemContinent = item.continentE;
			return itemContinent==continent;
		});*/
	};
	travelDataJSONStore._readJSONFile = function(sURL, variable){
		request(sURL,{sync:true, timeout:1000}).then(
                function(text){
                	eval(variable+" = dojo.fromJson(text);");
                	//variable = dojo.fromJson(text);
                	//variable = json;
                },
                function(error){
                    alert("error:"+error);
                }
            );
	};
	travelDataJSONStore.getTravelTarget = function(){
		return TravelTarget;
	};
	travelDataJSONStore.getTargetType = function(){
		return TargetType;
	};
	travelDataJSONStore.addSelectedTarget = function(target){
		var targetID = target.id;
		SelectedTarget[targetID]=target;
	};
	travelDataJSONStore.setSelectedTarget = function(target){
		SelectedTarget=target;
	};
	travelDataJSONStore.getTargetTypeByID = function(id){
		var returnItem = array.filter(TargetType, function(item){
			return item.id==id;
		});
		if(returnItem.length>0){
			return returnItem[0];
		}else{
			return null;
		}
	};
	return travelDataJSONStore;
});

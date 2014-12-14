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
	var PackageItemCategory = {};
	var PackageItemList = {};
	var CurrentTravelPlan = {
			SelectedTarget : {},
			TravelInfo : {
				travelName : "",
				travelIntro : "",
				travelType : "", //度假 旅游 徒步 户外 背包 亲子 宠物
				fromDate : "",
				toDate : "",
				accompany : [
					{name:"test1",gender:"male",age:"1",type:"",comments:"aaaa"},
					{name:"test2",gender:"female",age:"28",type:"",comments:"bbbb"},
					{name:"test3",gender:"male",age:"80",type:"",comments:"cccc"}
				],
			},
			TravelPlanPackage : {},
			TravelPlanNotes : {},
			TravelPlanContacts : {},
			TravelPlanChecklist : {},
			TravelPlanAgent : {},
			TravelPlanReferWebURLs : {},
			TravelPlanStage : "",
			TravelPlanEat : [],
			TravelPlanTraffic : [{id:"01", type:"flight", bookingType:"internet", bookingStatus:"new", totalPrice:"1000", paid:"300", fromLocation:"上海", toLocation:"深证", fromDT:"2014-01-01 11:00", toDT:"2014-01-01 13:00"},
			                 {id:"02", type:"ship", bookingType:"internet", bookingStatus:"new", totalPrice:"80", paid:"80", fromLocation:"深证", toLocation:"香港", fromDT:"2014-01-01 14:00", toDT:"2014-01-01 15:00"}],
			TravelPlanHousing : []
	}
	var travelDataJSONStore =  declare("com.onwebbe.dojo.mobile.travelPlan.TravelDataJSONStore", null, {
		
	});
	travelDataJSONStore.getCurrentTravelPlan = function(){
		return CurrentTravelPlan;
	};
	
	travelDataJSONStore.getSelectedTarget = function(){
		return CurrentTravelPlan.SelectedTarget;
	};
	travelDataJSONStore.setSelectedTarget = function(selected){
		CurrentTravelPlan.SelectedTarget = selected;
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

		TravelPlanType = [{id:"Holiday",label:"度假"},{id:"Travel",label:"旅游"},{id:"WithChildren",label:"亲子"},{id:"Family",label:"全家"},{id:"Pet",label:"宠物"},{id:"Walking",label:"徒步"},{id:"Outdoor",label:"户外"},{id:"Bagage",label:"背包"}];

		PackageItemCategory = [{"id":"WASHING-OTHER","label":"洗漱及其他","labelE":"Washing-Other","labelP":"XiShuJiQiTa"},
		                       {"id":"CLOTH","label":"衣物","labelE":"Cloth","labelP":"YiWu"},
		                       {"id":"DOCUMENT","label":"文档","labelE":"Document","labelP":"WenDang"},
		                       {"id":"ELECTRONIC","label":"电子设备","labelE":"Electronic","labelP":"DianZiSheBei"},
		                       {"id":"MEDICINE","label":"药品","labelE":"Medicine","labelP":"YaoPin"},
		                       {"id":"FOOD","label":"食品","labelE":"Food","labelP":"ShiPin"},
		                       {"id":"PHOTOGRAPHIC","label":"相机","labelE":"Photographic","labelP":"XiangJi"}];
		/*
		 * Support Type
		 * COMMON - can for all travel
		 * INTERNATIONAL - for international travel only
		 * MANONLY
		 * WOMANONLY
		 * 
		 * Severity
		 * 1-5
		 * 1 - low
		 * 5 - high
		 * 
		 * comments
		 * will be write by user.
		 */
		PackageItemList = [{"id":"1","severity":"1","label":"身份证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"2","severity":"1","label":"护照","labelE":"","labelP":"","category":"DOCUMENT","description":"","description":"","supportType":"INTERNATIONAL"},
		                   {"id":"3","severity":"1","label":"银行卡、现金","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"4","severity":"1","label":"机票或打印信息","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"5","severity":"1","label":"边防证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":""},
		                   {"id":"6","severity":"1","label":"地图、攻略、电话清单","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"7","severity":"1","label":"学生证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"8","severity":"1","label":"记者证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"9","severity":"1","label":"导游证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"10","severity":"1","label":"军人证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"11","severity":"1","label":"残疾证","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"12","severity":"1","label":"笔","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"13","severity":"1","label":"笔记本","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"14","severity":"1","label":"驾照","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"15","severity":"1","label":"备用照片","labelE":"","labelP":"","category":"DOCUMENT","description":"","supportType":"COMMON"},
		                   {"id":"16","severity":"1","label":"签证","labelE":"","labelP":"","category":"DOCUMENT","description":"","description":"","supportType":"INTERNATIONAL"},
		                   
		                   
		                   {"id":"17","severity":"1","label":"帽子","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"18","severity":"1","label":"太阳镜","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"19","severity":"1","label":"户外鞋","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"20","severity":"1","label":"换洗衣物袜子","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"21","severity":"1","label":"拖鞋","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"22","severity":"1","label":"背包、防雨罩","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"23","severity":"1","label":"腰包或小包","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"24","severity":"1","label":"冲锋衣裤","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"25","severity":"1","label":"羽绒服","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"26","severity":"1","label":"睡袋","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":""},
		                   {"id":"27","severity":"1","label":"颈枕、眼罩","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"28","severity":"1","label":"全指手套","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"29","severity":"1","label":"露指手套","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"30","severity":"1","label":"头灯","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":""},
		                   {"id":"31","severity":"1","label":"围脖","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   {"id":"32","severity":"1","label":"登山杖","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":""},
		                   {"id":"33","severity":"1","label":"耳塞、充气枕","labelE":"","labelP":"","category":"CLOTH","description":"","supportType":"COMMON"},
		                   
		                   {"id":"34","severity":"1","label":"牙刷、牙膏","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"35","severity":"1","label":"梳子","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"36","severity":"1","label":"毛巾","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"37","severity":"1","label":"肥皂","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"38","severity":"1","label":"小装洗面奶","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"39","severity":"1","label":"小包洗发水","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"40","severity":"1","label":"防晒霜","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"41","severity":"1","label":"护肤润唇、湿纸巾","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"42","severity":"1","label":"指甲钳、小剪刀","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"43","severity":"1","label":"剃须刀（男）","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"MANONLY"},
		                   {"id":"44","severity":"1","label":"美容用品（女）","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"WOMANONLY"},
		                   {"id":"45","severity":"1","label":"生理用品（女）","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"WOMANONLY"},
		                   {"id":"46","severity":"1","label":"防蚊虫药水","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"47","severity":"1","label":"水壶","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"48","severity":"1","label":"瑞士军刀","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"49","severity":"1","label":"计生用品（夫妻档）","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"50","severity":"1","label":"绳子","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"51","severity":"1","label":"面巾纸","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"52","severity":"1","label":"扑克","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"53","severity":"1","label":"塑料袋","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"54","severity":"1","label":"求生哨","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"55","severity":"1","label":"小锁","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"56","severity":"1","label":"手表","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"57","severity":"1","label":"指南针","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"58","severity":"1","label":"GPS、海拔仪","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"59","severity":"1","label":"饭盒","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"60","severity":"1","label":"沙滩鞋","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":""},
		                   {"id":"61","severity":"1","label":"小型望远镜","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"62","severity":"1","label":"拖线板","labelE":"","labelP":"","category":"WASHING-OTHER","description":"","supportType":"COMMON"},
		                   {"id":"63","severity":"1","label":"打火机/火柴","labelE":"","labelP":"","category":"WASHING-OTHER","description":"如果坐飞机/火车注意是否允许携带","supportType":"COMMON"},
		                   
		                   {"id":"64","severity":"1","label":"感冒药","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":"COMMON"},
		                   {"id":"65","severity":"1","label":"外伤药`","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":"COMMON"},
		                   {"id":"66","severity":"1","label":"高原反应药","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":""},
		                   {"id":"67","severity":"1","label":"胃药","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":"COMMON"},
		                   {"id":"68","severity":"1","label":"金霉素眼药膏、眼药水","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":"COMMON"},
		                   {"id":"69","severity":"1","label":"泡腾片、西洋参","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":"COMMON"},
		                   {"id":"70","severity":"1","label":"维生素","labelE":"","labelP":"","category":"MEDICINE","description":"","supportType":"COMMON"},
		                   
		                   {"id":"71","severity":"1","label":"巧克力、牛肉干、奶糖","labelE":"","labelP":"","category":"FOOD","description":"","supportType":"COMMON"},
		                   {"id":"72","severity":"1","label":"压缩饼干","labelE":"","labelP":"","category":"FOOD","description":"","supportType":"COMMON"},
		                   {"id":"73","severity":"1","label":"口香糖","labelE":"","labelP":"","category":"FOOD","description":"注意有些国家不允许携带口香糖, 比如新加坡","supportType":"COMMON"},
		                   {"id":"74","severity":"1","label":"红牛、矿泉水","labelE":"","labelP":"","category":"FOOD","description":"有些交通工具不允许携带比如飞机","supportType":"COMMON"},
		                   {"id":"75","severity":"1","label":"方便面、火腿肠、水果","labelE":"","labelP":"","category":"FOOD","description":"出国游不能携带肉类,有些国家不允许水果,请注意","supportType":"COMMON"},
		                   
		                   {"id":"76","severity":"1","label":"手机","labelE":"","labelP":"","category":"ELECTRONIC","description":"请注意制式","supportType":"COMMON"},
		                   {"id":"77","severity":"1","label":"充电器","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"78","severity":"1","label":"充电线","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"79","severity":"1","label":"USB集线器","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"80","severity":"1","label":"对讲机","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"81","severity":"1","label":"随身听","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"82","severity":"1","label":"无源音响","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"83","severity":"1","label":"吹风机","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"COMMON"},
		                   {"id":"831","severity":"1","label":"转换头/变压器","labelE":"","labelP":"","category":"ELECTRONIC","description":"","supportType":"INTERNATIONAL"},
		                   
		                   {"id":"84","severity":"1","label":"相机、镜头","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"},
		                   {"id":"85","severity":"1","label":"三脚架，快门线","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"},
		                   {"id":"86","severity":"1","label":"相机包","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"},
		                   {"id":"87","severity":"1","label":"SD卡","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"},
		                   {"id":"88","severity":"1","label":"备用电池","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"随身带,且注意可以携带电池的安培数","supportType":"COMMON"},
		                   {"id":"89","severity":"1","label":"气吹、擦镜纸","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"},
		                   {"id":"90","severity":"1","label":"滤镜、黑卡","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"},
		                   {"id":"91","severity":"1","label":"DV","labelE":"","labelP":"","category":"PHOTOGRAPHIC","description":"","supportType":"COMMON"}];
		//火车/汽车/轮船/飞机/自驾/出租
		TravelPlanCodedValue = {"gender":[{value:"male", label:"男"},{value:"female",label:"女"}],
								"EHT":[{value:"eat", label:"吃"},{value:"traffic",label:"行"},{value:"housing",label:"住"},{value:"play",label:"玩"}],
								"TrafficType":[{value:"train",label:"火车"},{value:"bus",label:"汽车"},{value:"ship",label:"轮船"},{value:"plane",label:"飞机"},{value:"driving",label:"自驾"},{value:"taxi",label:"出租"}],
								"BookingType":[{value:"internet",label:"网络",img:""},{value:"agentshop",label:"实体",img:""}],
								"BookingStatus":[{value:"new",label:"创建"},{value:"payed",label:"付款"},{value:"confirmed",label:"确认"}],
								"TrafficType":[{value:"ship",label:"轮船",img:"../../images/ship-30.png"},{value:"flight",label:"飞机",img:"../../images/flight-30.png"}]};
		travelDataJSONStore.readChinaTarget();
		travelDataJSONStore.getTestTargetData();
	};
	travelDataJSONStore.getCodedValue = function(code){
		return TravelPlanCodedValue[code];
	},
	travelDataJSONStore.getPackageItemList = function(types){
		if(typeof types=="undefined"){
			return PackageItemList;
		}else{
			var filteredItemList = new Array();
			for(i=0;i<PackageItemList.length;i++){
				var itemPackageItemList = PackageItemList[i];
				var supportType = itemPackageItemList.supportType;
				if(typeof supportType=="undefined"||supportType==null||supportType==""){
					supportType="COMMON";
				}
				if(supportType=="COMMON"){
					filteredItemList.push(dojo.clone(itemPackageItemList));
				}else{
					for(j=0;i<types.length;j++){
						var tmpType = types[j];
						if(supportType==tmpType){
							filteredItemList.push(dojo.clone(itemPackageItemList));
						}
					}
				}
				
			}
		}
	}
	travelDataJSONStore.getPackageItemCategory = function(){
		return PackageItemCategory;
	}
	travelDataJSONStore.getTravelPlanType = function(){
		return TravelPlanType;
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
		CurrentTravelPlan.SelectedTarget[targetID]=target;
	};
	travelDataJSONStore.setSelectedTarget = function(target){
		CurrentTravelPlan.SelectedTarget=target;
	};
	travelDataJSONStore.getSelectedTarget = function(){
		return CurrentTravelPlan.SelectedTarget;
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
	travelDataJSONStore.getTestTargetData = function(id){
		travelDataJSONStore._readJSONFile("testdata.json","CurrentTravelPlan");
	};
	return travelDataJSONStore;
});

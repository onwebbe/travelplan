define("com/onwebbe/dojo/mobile/SiderPane", [
	"dojo/_base/declare",
	"dojox/mobile/Pane",
	"dojo/json",
	"dojox/mobile/Button",
	"dojox/mobile/parser",
	"dojo/dom-construct",
	"dijit/registry",
	"dojo/on",
	"dojo/fx",
	"dojo/dom",
	"dojo/touch"
], function(declare, Pane, JSON, Button, parser, domCon, registry, on, fx, dom, touch){
	/* Module:
	 * com.onwebbe.dojo.mobile.common.AddDocView
	 * 
	 * Summary:
	*/
	var travelDraftInfoPane =  declare("com.onwebbe.dojo.mobile.SiderPane", Pane, {
		_paneWidth : 0,
		_paneHeight : 0,
		_requireSplitBar : false,
		_paneElement : null,
		_slideShow : true,
		_splitBarElement : null,
		_displayPane: null,
		_img1: null,
		_img2: null,
		_img3: null,
		_headerHeight: 44,
		_viewHeight: 0,
		_viewWidth: 0,
		_splitBarWidth: 20,
		_that: this,
		_currentx: 0,
		constructor: function(/*Object*/params, /*DomNode?*/node){
			// summary:
			//		Creates a new instance of the class.
			// params:
			//		Contains the parameters.
			// node:
			//		The DOM node. If none is specified, it is automatically created. 
			this.inherited(arguments);
			var that = this;
			this._viewHeight = document.documentElement.clientHeight;
			this._viewWidth = document.documentElement.clientWidth;
			
			
			
			if(params.requireSplitBar){
				this._requireSplitBar = params.requireSplitBar;
				if(params.requireSplitBar=="true"){
					that._requireSplitBar = true;
				}else{
					that._requireSplitBar = false;
				}
			}
			if(params.slideShow){
				this._slideShow = params.slideShow;
			}
			if(params.height){
				this._paneHeight = params.height;
			}else{
				this._paneHeight = this._viewHeight - this._headerHeight;
			}
			if(params.width){
				this._paneWidth = params.width;
			}else{
				this._paneWidth = (this._viewWidth * 0.3);
			}
		},
		postCreate: function(){
			var that = this;
			var domNode = this.domNode;
		    // Run any parent postCreate processes - can be done at any point
		    this.inherited(arguments);
		    var splitBarText='<div id="scrollbarsplitter" style="position:absolute;">'
		    				+'<img style="position:relative;vertical-align:middle;" src="../../images/left-arrow-min.png" width="15px" class="arrowImg1">'
		    				+'<img style="position:relative;vertical-align:middle;" src="../../images/left-arrow-min.png" width="15px" class="arrowImg2">'
		    				+'<img style="position:relative;vertical-align:middle;" src="../../images/left-arrow-min.png" width="15px" class="arrowImg3">'
		    				+'</div>';
		    var splitBarDom = domCon.toDom(splitBarText);
		    this._splitBarElement = splitBarDom;
		    if(that._requireSplitBar==false){
		    	this._splitBarElement.style.display="none";
		    }else{
		    	this._splitBarElement.style.display="block";
		    }
		    this._img1 = dojo.query(".arrowImg1",splitBarDom)[0];
		    this._img2 = dojo.query(".arrowImg2",splitBarDom)[0];
		    this._img3 = dojo.query(".arrowImg3",splitBarDom)[0];
		    this._img1.style.top=10+"px";
		    this._img2.style.top=(this._paneHeight)/2+"px";
		    this._img3.style.top=(this._paneHeight-this._headerHeight)-50+"px";
		    domNode.appendChild(splitBarDom);
		    
		    
		    
		},
		startup: function(){
			var domNode = this.domNode;
			var that = this;
		    // Run any parent postCreate processes - can be done at any point
		    this.inherited(arguments);
		    var innerDisplayPane = registry.findWidgets(domNode)[0];
		    this._displayPane = innerDisplayPane.domNode;
		    
		    //this._displayPane.style.position="absolute";
		    this._displayPane.style.top=this._headerHeight+"px";
			this._displayPane.style.left="0px";
			this._currentx=0;
			this._displayPane.style.width=this._paneWidth+"px";
			this._displayPane.style.display="block";
			this._displayPane.style.height=(this._paneHeight-this._headerHeight)+"px";
			this._displayPane.style.backgroundColor="#ababab";
			//this._displayPane.style.borderTopRightRadius="10px";
			//this._displayPane.style.borderBottomRightRadius="10px";
			
			this._splitBarElement.style.top=this._headerHeight+"px";
			this._splitBarElement.style.left=this._paneWidth+"px";
			this._splitBarElement.style.width=this._splitBarWidth+"px";
			if(that._requireSplitBar==false){
		    	this._splitBarElement.style.display="none";
		    	this._displayPane.style.borderTopRightRadius="10px";
				this._displayPane.style.borderBottomRightRadius="10px";
		    }else{
		    	this._splitBarElement.style.display="block";
		    	this._displayPane.style.borderTopRightRadius="0x";
				this._displayPane.style.borderBottomRightRadius="0px";
		    }
			this._splitBarElement.style.height=this._paneHeight+"px";
			this._splitBarElement.style.backgroundColor="yellow";
			this._splitBarElement.style.borderTopRightRadius="10px";
			this._splitBarElement.style.borderBottomRightRadius="10px";
			this._splitBarElement.style.verticalAlign="middle";
			on(this._splitBarElement, "click", function(){
				that._onClickShowHide(that);
			});
			
			var pageX = 0;
			var layerX = 0;
			var start = false;
			this.own(touch.press(this._displayPane, function(e){
				layerX = e.layerX;start=true;
				pageX = e.pageX;
			}));
			this.own(touch.cancel(this._displayPane, function(e){
				if(start){
					var temppageX = e.pageX;
					if(pageX>(temppageX+that._viewWidth*0.07)){
						that._onClickShowHide(that);
					}else if(that._viewWidth*0.07>=that._paneWidth){
						that._onClickShowHide(that);
					}else{
						that._slideShow = false;
						that._onClickShowHide(that);
					}
					layerX = 0;
					start=false;
					pageX = 0;
				}
			}));
			this.own(touch.release(this._displayPane, function(e){
				if(start){
					var temppageX = e.pageX;
					if(pageX>(temppageX+that._viewWidth*0.07)){
						that._onClickShowHide(that);
					}else if(that._viewWidth*0.07>=that._paneWidth){
						that._onClickShowHide(that);
					}else{
						that._slideShow = false;
						that._onClickShowHide(that);
					}
					layerX = 0;
					start=false;
					pageX = 0;
				}
				
			}));
			this.own(touch.move(this._displayPane, function(e){
				if(start){
					var theleft = layerX-e.pageX;
					if(theleft>0){
						console.log(e);
						that._displayPane.style.left=-theleft+"px";
						that._splitBarElement.style.left=-theleft+that._paneWidth+"px";
						that._currentx = -theleft;
					}
					
				}
				
			}));
			var listItems = dojo.query("li[data-dojo-type='dojox/mobile/ListItem']", this.domNode);
			for(i=0;i<listItems.length;i++){
				var listItem = registry.byNode(listItems[i]);
				listItem.on("click", function(){
					setTimeout(function(){that.hidePane()}, 500);
				});
			}
		},
		showPane: function(){
			var that = this;
			that._slideShow=false;
			that._onClickShowHide(that);
		},
		hidePane: function(){
			var that = this;
			that._slideShow=true;
			that._onClickShowHide(that);
		},
		_onClickShowHide: function(thatElement){
			var that = this;
			if(thatElement){
				var that = thatElement;
			}
			if(that._slideShow==true){
				//that._displayPane.style.display="none";
				
				var anim = fx.slideTo({
		            duration: 300,
		            node: that._displayPane,
		            left: -that._paneWidth+10,
		            top: that._headerHeight
		        });
				var anim2 = fx.slideTo({
		            duration: 300,
		            node: that._splitBarElement,
		            left: 10,
		            top: that._headerHeight
		        });
				
				on(anim, "End", function(){
					//that._displayPane.style.display="none";
					that._splitBarElement.style.left="10px";
					that._splitBarElement.style.display="block";
					if(that._requireSplitBar==false){
				    	that._splitBarElement.style.display="none";
				    }else{
				    	that._splitBarElement.style.display="block";
				    }
					that._img1.src="../../images/right-arrow-min.png";
					that._img2.src="../../images/right-arrow-min.png";
					that._img3.src="../../images/right-arrow-min.png";
				});
				anim.play();
				anim2.play();
			}else{
				var anim = fx.slideTo({
		            duration: 300,
		            node: that._displayPane,
		            left: 0,
		            top: that._headerHeight
		        });
				var anim2 = fx.slideTo({
		            duration: 300,
		            node: that._splitBarElement,
		            left: that._paneWidth,
		            top: that._headerHeight
		        });
				
				on(anim, "End", function(){
					that._splitBarElement.style.left=that._paneWidth+"px";
					that._img1.src="../../images/left-arrow-min.png";
					that._img2.src="../../images/left-arrow-min.png";
					that._img3.src="../../images/left-arrow-min.png";
				});
				//that._displayPane.style.display="block";
				
				anim.play();
				anim2.play();
			}
			that._slideShow = !that._slideShow;
		}
	});
	return travelDraftInfoPane;
});

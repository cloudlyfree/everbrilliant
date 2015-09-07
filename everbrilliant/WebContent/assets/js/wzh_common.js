
/*************************************************************************
 *功能:设置“返回”按钮、设置一屏可见高度、自定义滚动条、跨页面点击目标
 *by:wzh
 **************************************************************************/


(function($) {
	/********************************************************************
	 *设置“返回”按钮
	 *********************************************************************/
	$.wzhBreadcrumb = function(options) {
		var defaults = {
			wBtns: "",
			/*将产生“返回”的按钮*/
			wFirstBtns: "",
			/*最开始的按钮（点击后不产生“返回”）*/
			wFnFilter: "",
			/*过滤出产生返回的函数*/
			wYourRuleArr2: [".aim", "attr", "fn"],
			/*自定义规则*/
			wAjaxLoadBox: "",
			/*加载新内容的块*/
			wReturnBtn: "",
			/*“返回”按钮*/
			wReturnBtnBox: "",
			/*放置“返回”按钮的块*/
			wReturnBtnHtml: "",
			/*“返回”按钮的html字符串*/
			wTabsBtns: "",
			/*tabs按钮*/
			wTabsBtnsAttr: "",
			/*tabs按钮上特定属性*/
			wTabsCons: "",
			/*tabs内容块*/
			wTabsConsAttr: "",
			/*tabs内容块上特定属性*/
			_bcStr: [],
			/*返回路径”数组*/
			_tempLink: "",
			/*临时缓存“返回路径”*/
			_wzhHtmlDomT: "t",
			/*循环变量*/
			_tabsRecord: []
			/*tabs记录*/
		};
		var o = $.extend({}, defaults, options);

		// 监听点击事件
		$(document).on("click", o.wBtns + "," + o.wFirstBtns + "," + o.wReturnBtn, function() {

			//清除循环
			clearInterval(o._wzhHtmlDomT);

			//第一次点击，只记录，不生成“返回”
			if ($(this).is(o.wFirstBtns)) {

				// 如果有不生成“返回”按钮的标志，则退出去
				if ($(this).hasClass("noReturn")) return false;

				// 清空重新开始
				o._bcStr = [];
				o._tabsRecord = [];

				// 如果存在“onclick”事件，直接获取。否则拼装“返回路径”
				if ($(this).attr("onclick") && $(this).attr("onclick").length > 0) {
					o._tempLink = $(this).attr("onclick");
				} else if ($(this).is(o.wYourRuleArr2[0])) {
					o._tempLink = o.wYourRuleArr2[2] + "('" + $(this).attr(o.wYourRuleArr2[1]) + "')";
				};
			}

			//点击“返回”
			else if ($(this).is(o.wReturnBtn)) {

				//取出最近的“返回”，并缓存
				o._tempLink = o._bcStr.pop();

				//返回时设置标志
				$("body").attr("_tabsRecordPop", "true");

				// 设置是否生成标志，生成“返回”按钮
				$(o.wAjaxLoadBox).append("<i style='display:none' class='Iambadflag'></i>");
				o._wzhHtmlDomT = setInterval(wzhHtmlDom, 10);
			}

			// 其它经过滤满足条件的
			else if (o.wFnFilter.indexOf($(this).attr('onclick').split('(')[0]) > -1) {

				// 如果有不生成“返回”按钮的标志，则退出去
				if ($(this).hasClass("noReturn")) return false;

				// 推入上次缓存的“返回路径”，及tabs记录
				o._bcStr.push(o._tempLink);
				o._tabsRecord.push($(o.wTabsCons + ":visible").attr(o.wTabsConsAttr));

				// 缓存当前“返回路径”
				o._tempLink = $(this).attr("onclick");

				$(o.wAjaxLoadBox).append("<i style='display:none' class='Iambadflag'></i>");
				o._wzhHtmlDomT = setInterval(wzhHtmlDom, 10);
			}

			// 自定义规则
			else if ($(this).is(o.wYourRuleArr2[0])) {

				// 如果有不生成“返回”按钮的标志，则退出去
				if ($(this).hasClass("noReturn")) return false;
				
				o._bcStr.push(o._tempLink);
				o._tabsRecord.push($(o.wTabsCons + ":visible").attr(o.wTabsConsAttr));

				// 拼装“返回路径”
				o._tempLink = o.wYourRuleArr2[2] + "('" + $(this).attr(o.wYourRuleArr2[1]) + "')";

				$(o.wAjaxLoadBox).append("<i style='display:none' class='Iambadflag'></i>");
				o._wzhHtmlDomT = setInterval(wzhHtmlDom, 10);
			};
		});

		//生成“返回”按钮

		function wzhHtmlDom() {

			// 判断是否有标志，没有错误标志则开始生成
			if ($(o.wAjaxLoadBox).find(".Iambadflag").length === 0) {

				//清除循环
				clearInterval(o._wzhHtmlDomT);

				// 如果是返回上来的，则触发tabs定位
				if ($("body").attr("_tabsRecordPop") === "true") {
					$(o.wTabsBtns + '[' + o.wTabsBtnsAttr + '="#' + o._tabsRecord.pop() + '"]').trigger("click");
					$("body").attr("_tabsRecordPop", "false");
				};

				// 如果“返回路径”数组中还有值，则在“返回”父块中追加自定义的“返回”按钮，并加上"onclick"事件
				if (o._bcStr.length > 0) {
					$(o.wReturnBtnBox).append(o.wReturnBtnHtml);
					$(o.wReturnBtn).attr("onclick", o._bcStr[o._bcStr.length - 1]);
				};
			};
		};
	};


	/********************************************************************
	 *设置一屏可见高度
	 *********************************************************************/
	$.wBoxSetHeight = function(options) {
		var defaults = {
			wNeedSetHeightAllAim: ".wNeedSetHeightAim",
			wSetHeightStartBtn: ".wSetHeightStartBtn",
			wCustomOffset: 0,
			wMaxHeight: 50000,
			wMimHeight: 0
		};
		var o = $.extend({}, defaults, options);

		$(window).on({
			"resize": wSetHeight,
			"scroll": wSetHeight
		});

		function wSetHeight() {
			var $wNeedSetHeightAim = $(o.wNeedSetHeightAllAim).filter(":visible");

			if ($wNeedSetHeightAim.length < 1) return false;

			var wTempAimHeight = $(window).scrollTop() + $(window).height() - $wNeedSetHeightAim.offset().top - o.wCustomOffset,
				wFilterMinAimHeight = Math.min(wTempAimHeight, o.wMaxHeight),
				wFinalAimHeight = Math.max(wFilterMinAimHeight, o.wMimHeight);

			$wNeedSetHeightAim.height(wFinalAimHeight);
		};

		var wSetHeightTT = "";

		$(o.wSetHeightStartBtn).on("click", wStartSetHeightEvent);

		function wStartSetHeightEvent() {
			clearInterval(wSetHeightTT);
			wSetHeightTT = setInterval(wStartSetHeight, 100);

			function wStartSetHeight() {
				if ($(o.wNeedSetHeightAllAim).filter(":visible").length > 0) {
					clearInterval(wSetHeightTT);
					$(window).trigger("resize");
				};
			};
		};
	};


	/********************************************************************
	 *自定义滚动条
	 *********************************************************************/
	$.fn.wzhScrollBar = function(options) {
		var defaults = {
			/*滚动的文本*/
			sTxt: ".scrollTxt",
			/*滚动条宽度*/
			sBarWd: 9,
			/*滚动条背景颜色*/
			sBgColor: "#ddd",
			/*滚动条前景颜色*/
			sFtColor: "#333",
			/*滚动条圆角度*/
			sFtRadius: "9px",
			/*滚动条鼠标未进入透明度*/
			sOutOpacity: 0,
			/*滚动条鼠标进入时透明度*/
			sInOpacity: 0.8,
			/*滚动条透明度渐变持续时间*/
			sDuration: 400
		};
		var o = $.extend({}, defaults, options);

		//对窗口的大小变化和滚动做监听			
		$(window).on({
			"resize": _windowEvent4Scroll,
			"scroll": _windowEvent4Scroll
		});

		function _windowEvent4Scroll() {
			$(".scrollBox:visible").trigger("scroll");
		};

		$(window).trigger("resize");
		// 每个目标滚动区域的函数 
		return this.each(function() {
			// 如果已经加了滚动条，直接退出
			if ($(this).hasClass("hasScrollFlag")) return;

			//新增所需dom元素       
			$(this).css({
				"overflow": "hidden",
				"position": "relative"
			}).addClass("hasScrollFlag").append("<div class='scrollBar'><i class='scrollBarLine'></i></div><div class='scrollBarLR'><i class='scrollBarLineLR'></i></div>");
			$(this).find(o.sTxt).wrap("<div class='scrollBox'></div>");

			// 缓存常用变量
			var $sWindow = $(this),
				$sTxt = $sWindow.find(o.sTxt),
				$scrollBar = $sWindow.find(".scrollBar"),
				$scrollBarLine = $sWindow.find(".scrollBarLine"),
				$scrollBarLR = $sWindow.find(".scrollBarLR"),
				$scrollBarLineLR = $sWindow.find(".scrollBarLineLR"),
				$scrollBox = $sWindow.find(".scrollBox"),
				perA = $sWindow.height() / $sTxt.outerHeight(),
				perB = Math.floor(perA * 1000) / 10 + "%",
				perALR = $sWindow.width() / $sTxt.outerWidth(),
				perALRWt = ($sWindow.width()-o.sBarWd) / ($sTxt.outerWidth() + 5),
				perBLR = Math.floor(perALRWt * 1000) / 10 + "%";

			// 设置新增dom相应样式
			$scrollBar.css({
				"position": "absolute",
				"width": o.sBarWd,
				"height": "100%",
				"background": o.sBgColor,
				"top": 0,
				"right": 0,
				"display": "none"
			});
			$scrollBarLine.css({
				"position": "absolute",
				"width": o.sBarWd,
				"height": perB,
				"background": o.sFtColor,
				"top": 0,
				"right": 0,
				"border-radius": o.sFtRadius
			});
			$scrollBarLR.css({
				"position": "absolute",
				"width": $sWindow.width()-o.sBarWd,
				"height": o.sBarWd,
				"background": o.sBgColor,
				"bottom": 0,
				"left": 0,
				"display": "none"
			});
			$scrollBarLineLR.css({
				"position": "absolute",
				"width": perBLR,
				"height": o.sBarWd,
				"background": o.sFtColor,
				"bottom": 0,
				"left": 0,
				"border-radius": o.sFtRadius
			});
			$scrollBox.css({
				"width": $sWindow.width() + 50,
				"height": "100%",
				"overflow-x": "hidden",
				"overflow-y": "auto"
			});

			// 如果内容少则不显示滚动条
			if ($sWindow.height() / $sTxt.outerHeight() >= 1) {
				$scrollBar.hide();
			} else {
				$scrollBar.add($scrollBarLine).fadeTo(o.sDuration, o.sOutOpacity);
			};
			if ($sWindow.width() / $sTxt.outerWidth() >= 1) {
				$scrollBarLR.hide();
			} else {
				$scrollBarLR.add($scrollBarLineLR).fadeTo(o.sDuration, o.sOutOpacity);
			};

			// 时时同步滚动条百分比
			$sWindow.on("mousemove", function() {
				resetScrollBar();
			});

			$sWindow.on("click", function() {
							setTimeout(resetScrollBar,300);
						});

			function resetScrollBar(){
				perA = $sWindow.height() / $sTxt.outerHeight(),
				perB = Math.floor(perA * 1000) / 10 + "%",
				perALR = $sWindow.width() / $sTxt.outerWidth(),
				perALRWt = ($sWindow.width()-o.sBarWd) / ($sTxt.outerWidth() + 5),
				perBLR = Math.floor(perALRWt * 1000) / 10 + "%";

				if (perA >= 1) {
					$scrollBar.hide();
				}else if(perA < 1&&$scrollBar.hasClass("hoverInFlag")){
					$scrollBar.add($scrollBarLine).stop(false, true).fadeTo(o.sDuration, o.sInOpacity);
				};
				$scrollBarLine.css({
					"height": perB
				});

				if (perALR >= 1) {
					$scrollBarLR.hide();
					$sTxt.css("left",0);
					$scrollBarLineLR.css({
						"left": 0
					});
				}else if(perALR < 1&&$scrollBar.hasClass("hoverInFlag")){
					$scrollBarLR.add($scrollBarLineLR).stop(false, true).fadeTo(o.sDuration, o.sInOpacity);
				};
				$scrollBarLineLR.css({
					"width": perBLR
				});
			};

			// 滚动条根据鼠标进入与否隐藏和出现
			$sWindow.hover(function() {
				perA = $sWindow.height() / $sTxt.outerHeight(),
				perALR = $sWindow.width() / $sTxt.outerWidth();

				// 无滚动条时，直接退出
				if (perA >= 1) {
					$scrollBar.hide();
				} else {
					// 完全显示
					$scrollBar.add($scrollBarLine).stop(false, true).fadeTo(o.sDuration, o.sInOpacity);
					/*
					 *增加鼠标进入标志
					 *用于判断拖动时是否离开感应区
					 *从而判断是否完全显示滚动条
					 */
					$scrollBar.addClass("hoverInFlag");
				};
				if (perALR >= 1) {
					$scrollBarLR.hide();
				} else {
					// 完全显示
					$scrollBarLR.add($scrollBarLineLR).stop(false, true).fadeTo(o.sDuration, o.sInOpacity);
					/*
					 *增加鼠标进入标志
					 *用于判断拖动时是否离开感应区
					 *从而判断是否完全显示滚动条
					 */
					$scrollBar.addClass("hoverInFlag");
				};
			}, function() {
				// 去掉鼠标进入标志
				$scrollBar.removeClass("hoverInFlag");

				// 判断是否锁定透明度，如果不是则非完全显示
				if (!$scrollBar.hasClass("lockOpcityFlag")) {
					$scrollBar.hide();
					$scrollBarLR.hide();
				};
			});

			// 模拟滚动条滚动效果
			$scrollBox.on("scroll", function(event) {
				_countScrollBar();

				event.stopPropagation();
			});

			// 计算滚动条高度和位置
			function _countScrollBar() {
				perA = $sWindow.height() / $sTxt.outerHeight();
				perB = Math.floor(perA * 1000) / 10 + "%";

				if (perA >= 1) {
					$scrollBar.add($scrollBarLine).stop(false, true).fadeTo(o.sDuration, o.sOutOpacity);
				} else {
					if ($scrollBar.hasClass("hoverInFlag")) {
						$scrollBar.add($scrollBarLine).stop(false, true).fadeTo(o.sDuration, o.sInOpacity);
					};
					$scrollBarLine.css({
						"height": perB,
						"top": $scrollBox.scrollTop() * perA
					});
				};

				//IE7所需
				if (navigator.appVersion.indexOf("MSIE 7") > -1) {
					$scrollBarLine.trigger("mousedown");
					$("body").trigger("mouseup");
				};
			};

			//鼠标拖动上下滚动条效果
			$scrollBarLine.on("mousedown", function(event) {
				var eTop = event.pageY,
					sTop = $scrollBox.scrollTop();

				// 拖动时禁止内容被选中（IE）
				document.body.onselectstart = function() {
					return false;
				};

				// 拖动时即使鼠标离开滚动感应区也保持完全显示
				$scrollBar.addClass("lockOpcityFlag");

				$("body").on("mousemove", function(e) {
					var eTopTemp = e.pageY;

					$scrollBox.scrollTop(sTop + (eTopTemp - eTop) / perA);
				});

				$("body").on("mouseup", function() {
					$("body").off("mousemove");

					//拖动结束去掉透明锁定标志，并判断是否将滚动条完全显示
					$scrollBar.removeClass("lockOpcityFlag");

					if (!$scrollBar.hasClass("hoverInFlag")) {
						$scrollBar.add($scrollBarLine).fadeTo(o.sDuration, o.sOutOpacity);
					};

					// 放手时允许内容被选中（IE）
					document.body.onselectstart = function() {};
				});

				// 拖动时禁止内容被选中（FF、chrome）
				return false;
			});

			//鼠标拖动左右滚动条效果
			$scrollBarLineLR.on("mousedown", function(event) {
				var eLeft = event.pageX,
					tLeft=$scrollBarLineLR.position().left;

				// 拖动时禁止内容被选中（IE）
				document.body.onselectstart = function() {
					return false;
				};

				// 拖动时即使鼠标离开滚动感应区也保持完全显示
				$scrollBar.addClass("lockOpcityFlag");

				$("body").on("mousemove", function(e) {
					var eLeftTemp = e.pageX;
					if (tLeft + eLeftTemp - eLeft >= 0 && tLeft + eLeftTemp - eLeft <= $sWindow.width() - o.sBarWd - $scrollBarLineLR.width()) {
						$sTxt.css("left", -(tLeft + eLeftTemp - eLeft) / perALRWt);
						$scrollBarLineLR.css("left", tLeft + eLeftTemp - eLeft);	
					}else if(tLeft + eLeftTemp - eLeft < 0){
						$sTxt.css("left", 0);
						$scrollBarLineLR.css("left", 0);
					}else if(tLeft + eLeftTemp - eLeft > $sWindow.width() - o.sBarWd - $scrollBarLineLR.width()){
						$sTxt.css("left", -($sWindow.width() - o.sBarWd - $scrollBarLineLR.width())/ perALRWt);
						$scrollBarLineLR.css("left", $sWindow.width() - o.sBarWd - $scrollBarLineLR.width());
					};
				});

				$("body").on("mouseup", function() {
					$("body").off("mousemove");

					//拖动结束去掉透明锁定标志，并判断是否将滚动条完全显示
					$scrollBar.removeClass("lockOpcityFlag");

					if (!$scrollBar.hasClass("hoverInFlag")) {
						$scrollBarLR.add($scrollBarLineLR).fadeTo(o.sDuration, o.sOutOpacity);
					};

					// 放手时允许内容被选中（IE）
					document.body.onselectstart = function() {};
				});

				// 拖动时禁止内容被选中（FF、chrome）
				return false;
			});

			//鼠标点击上下滚动条“空白区”效果
			$scrollBar.on("mousedown", function(event) {
				var oTop = $scrollBar.offset().top,
					eTop = event.pageY,
					bLHt = $scrollBarLine.height(),
					bLTop = $scrollBarLine.offset().top;

				// 根据点击上端下端的位置不同分别处理
				if (eTop <= bLTop) {
					$scrollBarLine.css("top", eTop - oTop);
					$scrollBox.scrollTop((eTop - oTop) / perA);
				} else {
					var tempBtSpace = eTop - bLTop - bLHt,
						tempTpSpace = bLTop - oTop;

					$scrollBarLine.css("top", tempBtSpace + tempTpSpace);
					$scrollBox.scrollTop((tempBtSpace + tempTpSpace) / perA);
				};
			});

			//鼠标点击左右滚动条“空白区”效果
			$scrollBarLR.on("mousedown", function(event) {
				var eLeft = event.pageX,
					bLWt = $scrollBarLineLR.width(),
					bLLeft = $scrollBarLineLR.offset().left;
					bLPLeft = $scrollBarLineLR.position().left;

				// 根据点击上端下端的位置不同分别处理
				if (eLeft <= bLLeft) {
					$scrollBarLineLR.css("left", bLPLeft + eLeft - bLLeft);
					$sTxt.css("left",-(bLPLeft + eLeft - bLLeft)/ perALRWt);
				} else {
					var tempBtSpace = eLeft - bLLeft - bLWt;

					$scrollBarLineLR.css("left", bLPLeft+tempBtSpace);
					$sTxt.css("left",-(bLPLeft+tempBtSpace) / perALRWt);
				};
			});
		});
	};


	/********************************************************************
	 *跨页面点击目标
	 *********************************************************************/
	$.wClickAimLink = function(wKeyMenu, wNodeBox, wName, wNodeTagType, wAttr, wIsStrict) {
		var wNodeTagType = wNodeTagType || "a",
			wAttr = wAttr || "title",
			wIsStrict = wIsStrict || "true",
			wClickAimLinkTT="";

		if (wKeyMenu !== "") {
			$(wKeyMenu).trigger("click");
		};

		if (typeof(wClickAimLinkTT) !== "undefined") {
			clearInterval(wClickAimLinkTT);
		};

		showMainContent();

		wClickAimLinkTT = setInterval(wClickLink, 100);

		function wClickLink() {
			if ($(wNodeBox + " " + wNodeTagType).length > 0) {
				clearInterval(wClickAimLinkTT);
				
					if(wName===""){
						$(wNodeBox + " " + wNodeTagType + ":eq(0)").trigger("mouseover").trigger("click");
					}
					else if (wName!==""&&wIsStrict === "true") {
						$(wNodeBox + " " + wNodeTagType + "[" + wAttr + "='" + wName + "']").trigger("mouseover").trigger("click");
					} else {
						$(wNodeBox + " " + wNodeTagType + "[" + wAttr + "*='" + wName + "']").trigger("mouseover").trigger("click");
					};
				
			};
		};
	};

	/********************************************************************
	 *按最大高度设置省略号，适合字数相差不大的情况
	 *********************************************************************/
	$.fn.wzhCreateEllipsis = function(options) {
		var defaults = {
			wMaxHeight: 36
		};
		var o = $.extend({}, defaults, options);

		return this.each(function() {
			if ($(this).height() <= o.wMaxHeight) return;

			var wTextStr = $(this).text(),
				wTextLen = wTextStr.length;

			for (var i = wTextLen; i > 0; i--) {
				$(this).text(wTextStr.substr(0, i));
				if ($(this).height() <= o.wMaxHeight) {
					$(this).text(wTextStr.substr(0, i - 2) + "...");
					return;
				};
			};
		});

		function wCountStrLen(wStr) {
			return wStr.replace(/[^\x00-\xFF]/g, '**').length;
		};
	};
})(jQuery)

/*函数调用*/
//设置“返回”按钮
$.wzhBreadcrumb({
  wBtns: ".btn-link",
  wFirstBtns: ".csc_left_tabbtn li,.csc_right_panel a,.csc_left_tabcon a",
  wFnFilter: "showMainContent,showResourceTemplateInfo,showVdcInfo,$.wClickAimLink",
  wYourRuleArr2: [".csc_left_tabcon a", "href", "showMainContent"],
  wAjaxLoadBox: "#main_content",
  wReturnBtn: ".csc_returnBtn .btn",
  wReturnBtnBox: "#main_tabs",
  wReturnBtnHtml: "<li class='csc_returnBtn'><button class='btn'>返回上层</button></li>",
  wTabsBtns: "#main_tabs li a",
  wTabsBtnsAttr: "href",
  wTabsCons: "#main_tabbable>.tab-content>div",
  wTabsConsAttr: "id"
});

//设置菜单一屏可见高度
$.wBoxSetHeight({
  wNeedSetHeightAllAim: "#tree_tabbable .csc_left_tabcon .tab-pane .tab-pane",
  wSetHeightStartBtn: "#tree_tabbable #tree_tabs > li > a",
  wCustomOffset: 22,
  wMaxHeight: 482,
  wMimHeight: 412
});

var placeHolder_ForIE = function(cssSelect){
    if(cssSelect){
        $(cssSelect).each(
            function(){
                $(this).placeHolderForIE();
            }
        );
    }
}
$.fn.placeHolderForIE = function(cssSelect){
  var $this = $(this);
  var ua = window.navigator.userAgent;
  if((ua.indexOf("MSIE 8.0") > -1 || ua.indexOf("MSIE 9.0") > -1) && $this.attr("placeholder") != undefined && $this.attr("placeholder") != null)
  {
    var tips = $this.attr("placeholder");
    $this.val(tips).on("click",function(){
	  if($this.val() == tips){
	      $this.val("");
	  }
    }).on("blur",function(){
      if($this.val() == ""){
    	  $this.val(tips);
      }
    });
  } 
}
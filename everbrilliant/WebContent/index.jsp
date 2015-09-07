<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=9;IE=8;IE=7;" />
  <meta charset="utf-8">
  <title>服务中心</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"/>
  <meta name="description" content=""/>
  <meta name="author" content=""/>

  <meta http-equiv="pragma" content="no-cache" /> 
  <meta http-equiv="cache-control" content="no-cache" />
  <meta http-equiv="expires" content="0" />
  
  <link href="/assets/css/fix.css" rel="stylesheet"/>

  <!-- Le sty les -->
  <script src="/assets/js/jquery.js"></script>

  <link href="/assets/css/bootstrap.css" rel="stylesheet"/>
  <link href="/assets/css/bootstrap-modal.css" rel="stylesheet"/>
  <link href="/assets/css/bootstrap-loading.css" rel="stylesheet"/>
  <link href="/assets/css/csc.css" rel="stylesheet"/>

  <script src="/assets/js/bootstrap-transition.js"></script>
  <script src="/assets/js/bootstrap-alert.js"></script>
  <script src="/assets/js/bootstrap-prompts-alert.js"></script>
  <script src="/assets/js/bootstrap-modal.js"></script>
  <script src="/assets/js/bootstrap-modalmanager.js"></script>
  <script src="/assets/js/bootstrap-dropdown.js"></script>
  <script src="/assets/js/bootstrap-scrollspy.js"></script>
  <script src="/assets/js/bootstrap-tab.js"></script>
  <script src="/assets/js/bootstrap-tooltip.js"></script>
  <script src="/assets/js/bootstrap-popover.js"></script>
  <script src="/assets/js/bootstrap-button.js"></script>
  <script src="/assets/js/bootstrap-collapse.js"></script>
  <script src="/assets/js/bootstrap-carousel.js"></script>
  <script src="/assets/js/bootstrap-typeahead.js"></script>
  <script src="/assets/js/bootstrap-contextmenu.js"></script>
  <script src="/assets/js/bootstrap-filestyle.js"></script>
  <script src="/assets/js/bootstrap-tableclick.js"></script>
<!--统计图表，待处理-->
  <script src="/assets/js/highchart2/highstock.js"></script>
  <script src="/assets/js/highchart2/exporting.js"></script>
  
  <script src="/assets/js/wzh_common.js"></script>
  <script src="/assets/js/newcsc.js"></script>
  
  <!-- 首页 -->
   <script src="/js/home/home.js"></script>
  
  <!--目录树-->
  <script src="/assets/js/domain/entity.js"></script>
  <link href="/assets/js/bootstrap-tree/css/bootstrap-tree.css" rel="stylesheet"/>
  <script src="/assets/js/bootstrap-tree/js/bootstrap-tree.js"></script>
  <!--下拉选择-->
  <link href="/assets/js/bootstrap-chosen/chosen.css" rel="stylesheet" />
  <script src="/assets/js/bootstrap-chosen/chosen.jquery.js"></script>
  <!--向导-->
  <link href="/assets/js/bootstrap-application-wizard/bootstrap-wizard.css" rel="stylesheet" />
  <script src="/assets/js/bootstrap-application-wizard/bootstrap-wizard.js"></script>
  <!--日期范围选择-->
  <link href="/assets/js/daterange/daterangepicker.css" rel="stylesheet"/>
  <script src="/assets/js/daterange/date.js"></script>
  <script src="/assets/js/daterange/daterangepicker.js"></script>
  <!--即时消息提示-->
  <link href="/assets/js/notify/bootstrap-notify.css" rel="stylesheet">
  <link href="/assets/js/notify/alert-blackgloss.css" rel="stylesheet">
  <link href="/assets/js/notify/alert-bangTidy.css" rel="stylesheet">
  <script src="/assets/js/notify/bootstrap-notify.js"></script>
  <!--时间选择器-->
  <link href="/assets/js/datetime/datetimepicker.css" rel="stylesheet">
  <script src="/assets/js/datetime/bootstrap-datetimepicker.js"></script>
  <script src="/assets/js/datetime/bootstrap-datetimepicker.zh-CN.js"></script>
  <!--悬浮即时下拉-->
  <script src="/assets/js/twitter-bootstrap-hover-dropdown.js"></script>
  <!--颜色选择器-->
  <link href="/assets/js/bootstrap-colorpicker/bootstrap-colorpicker.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-colorpicker/bootstrap-colorpicker.js"></script>
  <!--双向选择器-->
  <link href="/assets/js/bootstrap-transfer/bootstrap-transfer.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-transfer/bootstrap-transfer.js"></script>
  <!--表单校验-->
  <script src="/assets/js/jqBootstrapValidation.js"></script>

  <!--分页控件-->
  <script src="/assets/js/jquery.pagination.js"></script>
  <!--日历控件-->
  <link href="/assets/js/bootstrap-calendar/bootstrap-calendar.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-calendar/bootstrap-calendar.js"></script>
  <!--编辑器控件-->
  <script src="/assets/js/ckeditor3/ckeditor.js"></script>
  <!--<script src="/assets/js/ckeditor4/ckeditor.js"></script>-->
  <!--switch控件-->
  <link href="/assets/js/bootstrap-switch/bootstrap-switch.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-switch/bootstrap-switch.js"></script>
  <!--标签控件-->
  <link href="/assets/js/bootstrap-tags/bootstrap-tags.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-tags/bootstrap-tags.js"></script>
  <!--标签控件2-->
  <link href="/assets/js/bootstrap-tagmanager/bootstrap-tagmanager.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-tagmanager/bootstrap-tagmanager.js"></script>
  <!--多选下拉控件-->
  <link href="/assets/js/bootstrap-multiselect/bootstrap-multiselect.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-multiselect/bootstrap-multiselect.js"></script>
<!--IP-Address控件-->
  <script src="/assets/js/jquery-ipaddress/jquery.caret.js"></script>
  <link href="/assets/js/jquery-ipaddress/jquery-ipaddress.css" rel="stylesheet">
  <script src="/assets/js/jquery-ipaddress/jquery-ipaddress.js"></script>
<!--文件上传控件-->  
  <link href="/assets/js/uploader/jquery.plupload.queue/css/jquery.plupload.queue.css" rel="stylesheet">
  <script src="/assets/js/uploader/plupload.full.js"></script>
  <script src="/assets/js/uploader/jquery.plupload.queue/jquery.plupload.queue.js"></script>
  <script src="/assets/js/uploader/i18n/zh-cn.js"></script>
<!--数量输入-->
  <link href="/assets/js/bootstrap-spinedit/bootstrap-spinedit.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-spinedit/bootstrap-spinedit.js"></script>
<!--拖动条-->
  <link href="/assets/js/bootstrap-slider/bootstrap-slider.css" rel="stylesheet">
  <script src="/assets/js/bootstrap-slider/bootstrap-slider.js"></script>
<!--进度条-->
  <link href="/assets/js/bootstrap-progressbar/bootstrap-progressbar.css" rel="stylesheet"/>
  <script src="/assets/js/bootstrap-progressbar/bootstrap-progressbar.js"></script>
 <!--排序按钮-->
  <script src="/assets/js/bootstrap-sortbutton.js"></script>
  <script src="/assets/js/jquery-drag.js"></script>


<!--响应式标签页-->
  <!--<link href="/assets/js/responsive-tabs/responsive-tabs.css" rel="stylesheet">-->
  <script src="/assets/js/responsive-tabs/responsive-tabs.js"></script>
<!--ztree-->
  <link href="/assets/js/Jquery_Ztree/css/zTreeStyle.css" rel="stylesheet">
  <script src="/assets/js/Jquery_Ztree/js/jquery.ztree.all-3.5.min.js"></script>
<!-- 公共 -->
  <script src="/commJs/common.js"></script>
  <script src="/commJs/pointMessage.js"></script>
  <script src="/commJs/zy_tmpl.js"></script>
  <script src="/commJs/map.js"></script>
  <script src="/commJs/rightMenu.js"></script>
  <script src="/commJs/ajax-pushlet-client.js"></script>
  <script src="/commJs/ajaxfileupload.js"></script>
	
	<!-- jqgrid 4.0-->
    <link rel="stylesheet" type="text/css" media="screen" href="/assets/css/jqGrid/redmond/jquery-ui-1.8.2.custom.css" />
	
	<script src="/assets/js/jqGrid/jquery4early.js"></script>
	<script src="/assets/js/jqGrid/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
	<script src="/assets/js/jqGrid/jquery.layout.js" type="text/javascript"></script>
	<script src="/assets/js/jqGrid/i18n/grid.locale-en.js" type="text/javascript"></script>
	<script type="text/javascript">
		$.jgrid.no_legacy_api = true;
		$.jgrid.useJSON = true;
	</script>
	<script src="/assets/js/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
	<script src="/assets/js/jqGrid/jquery.tablednd.js" type="text/javascript"></script>
	<script src="/assets/js/jqGrid/jquery.contextmenu.js" type="text/javascript"></script>
	<script src="/assets/js/jqGrid/ui.multiselect.js" type="text/javascript"></script>

    <script>
	// 弹窗可拖动，需跟jquery-ui.js一起用
	  if ($(".modal-draggable").length > 0) {
	    $(".modal-draggable").draggable({ handle:'.modal-header'});
	  }
	  
	</script>

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
<script src="assets/js/html5shiv.js"></script>
<![endif]-->

<!-- Fav and touch icons -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/assets/ico/apple-touch-icon-144-precomposed.png"/>
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/assets/ico/apple-touch-icon-114-precomposed.png"/>
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/assets/ico/apple-touch-icon-72-precomposed.png"/>
<link rel="apple-touch-icon-precomposed" href="/assets/ico/apple-touch-icon-57-precomposed.png"/>
<link rel="shortcut icon" href="/assets/ico/favicon.png"/>
<script src="/assets/js/j_comp/j_comp.js"></script>
<!-- 新界面样式 -->
<link href="/assets/css/newcsc.css" rel="stylesheet"/>
<link href="/assets/css/csc_skin.css" rel="stylesheet"/>
<!-- 2015年新增 -->
<link href="/assets/css/font.css" rel="stylesheet">
<link href="/assets/css/csc4.3.css" rel="stylesheet"/>
<style type="text/css">

 .main_content_container{
   min-height:560px;
 }     
</style>
</head>
<body id="topOfPage">
<span class="csc_topLeftBg"></span>
<span class="csc_topRightBg"></span>
<span class="csc_topMiddleBg"></span>

<!-- 头部start -->
<div class="csc_headerBox">
    <div class="container-fluid">
        <div class="csc_logoBox">
            <h1>
		        <b>服务中心</b>
		     </h1>
        </div>
        <div class="masthead">
        </div>
        <div style="clear:both;"></div>
    </div>
</div>
<!-- 头部end -->

<div class="container-fluid">
	<div class="tabbable" id="tree_tabbable">
	<ul class="nav nav-tabs" style="display:none;">
	</ul>
	<div class="tab-content">
	 </div>
	</div>
</div>

<div class="csc_footer">
	<p>版权所有</p>
</div>

<div class='notifications top-right'></div>
<div class='notifications bottom-right'></div>
<div class='notifications top-left'></div>
<div class='notifications bottom-left'></div>

<script>
      $(function(){
        $("#tree_tabbable .nav .active a").each(function(){
          $(this).tab('show');
        });
        $("#tree_tabbable .nav .active a").parent().click();
      });
   
      
    /**退出模式化窗口**/
  function hideError(){
    $("#errr-modal").modal('hide');
  }
  function hideModal(){
    $("#ajax-modal").modal('hide');
  }
  function hideModal2(){
    $("#ajax-modal2").modal('hide');
  }   
      
   function hideModalSecondary(){
    $("#ajax-modal-secondary").modal('hide');
   }   
      
   function showModalMax(url){
	  $("#ajax-modal-max").load(url, '', function(){
	      $("#ajax-modal-max").modal();
	      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
	    });
	    
	    $("#ajax-modal-max").bind("hidden",function(){
	    	hideLoading();
	    });
  }   
   
  /*
   * 弹出模态窗口，并且，重新设置窗口大小 
   * @author billz
   * @date 2015-7-6
   */
   function showModalMax(url, width){
	 // 设置窗口大小
	 if(width != null && !isNaN(width) && parseInt(width) > 0){
		setTimeout(function(){
			$('#ajax-modal-max').css('width', width+'px'); 
			$('#ajax-modal-max.modal').css('width', width+'px'); 
		}, 500);
     }
	 
	 $("#ajax-modal-max").load(url, '', function(){
	     $("#ajax-modal-max").modal();
	     $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
     });
   
   	 $("#ajax-modal-max").bind("hidden",function(){
   	 	hideLoading();
   	 });
   } 
      
   function showModalMax2(url,width){
	// 设置窗口大小
	 if(width != null && !isNaN(width) && parseInt(width) > 0){
		setTimeout(function(){
			$('#ajax-modal-max2').css('width', width+'px'); 
			$('#ajax-modal-max2.modal').css('width', width+'px'); 
		}, 500);
     }
	
	  $("#ajax-modal-max2").load(url, '', function(){
	      $("#ajax-modal-max2").modal();
	      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
	    });
	    
	    $("#ajax-modal-max2").bind("hidden",function(){
	    	hideLoading();
	    });
  }   
   
   function showModalMax2(url){
		  $("#ajax-modal-max2").load(url, '', function(){
		      $("#ajax-modal-max2").modal();
		      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
		    });
		    
		    $("#ajax-modal-max2").bind("hidden",function(){
		    	hideLoading();
		    });
	  }   
   function hideModalMax(){
	    $("#ajax-modal-max").modal('hide');
	  }  
   function hideModalMax2(){
	    $("#ajax-modal-max2").modal('hide');
	  }
      
  function showIndex(Num){
    $("#tab_home_"+Num+"_link").click();
  }    
  /**
   * 点击首页的时候调用，不仅切换为首页，还要调用一下首页刷新时候的部分方法
   * @author wangst
   * @time:2015-8-11
   */
  function firstindexset(){
	   showIndex(0);
	   getAllDataCenterWarning();//刷新告警信息
	   refreshNotice();//刷新通知的提示
  }
  function showError(msgText,data){
	    $("#error-modal").html('');//防止url指向页面不存在
	    $("#error-modal").load("error.jsp", '', function(){
	      $("#Msg__errorName").html(msgText);
	      $("#Msg__errorCode").html(data.exceptionCode);
	      $("#Msg__errorMessage").html(data.exceptionMessage);
	      $("#Msg__errorStackTrace").val(data.stackTrace);
	      $("#error-modal").modal();
	    });
	  }
  function showModal(url,classNum){
    var classNum=classNum||1;
    if(classNum==1){$("#ajax-modal").removeClass("modal2")}else{$("#ajax-modal").addClass("modal2")};
    $("#ajax-modal").html('');//防止url指向页面不存在
    $("#ajax-modal").load(url, '', function(){
      $("#ajax-modal").modal();
      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
    });
  }

  function showModal2(url){
    $("#ajax-modal2").html('');//防止url指向页面不存在
    $("#ajax-modal2").load(url, '', function(){
      $("#ajax-modal2").modal();
      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
    });
  }

  /**
   * 加载中的效验提示，默认提示
   */
  function showLoading(loadingId, loadingTip){
		$('.loading').center();
	    $('.loading').hide();
	    $(loadingId||'#loading-0').show();
	    $("#loadingTip").text(loadingTip||"加载中......");
	  }
  
  /**
   * 加载中的效验提示，自定义
   */
  function showLoadingWithWord(words,loadingId, loadingTip){
		$('.loading').center();
	    $('.loading').hide();
	    $(loadingId||'#loading-0').show();
	    $("#loadingTip").text(loadingTip||words);
  }
  
  function showDailyRecord(url){
    $("#ajax-modal-dailyRecord").html('');//防止url指向页面不存在
    $("#ajax-modal-dailyRecord").load(url, '', function(){
      $("#ajax-modal-dailyRecord").modal();
    });
  }
  
  function showWizard(url){
	    $("#ajax-wizard").html('');//防止url指向页面不存在
	    $("#ajax-wizard").load(url, '', function(){
	      wizard.show();
	      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽 wizard-modal
	      $(".wizard-modal").draggable({ handle:'.modal-header'});//支持弹窗拖拽 
	    });
	  }
  
  function showModalSecondary(url,classNum){
	    var classNum=classNum||1;
	    if(classNum===1){$("#ajax-modal-secondary").removeClass("modal2")}else{$("#ajax-modal-secondary").addClass("modal2")};
	    $("#ajax-modal-secondary").html('');//防止url指向页面不存在
	    $("#ajax-modal-secondary").load(url, '', function(){
	      $("#ajax-modal-secondary").modal();
	      $(".modal-draggable").draggable({ handle:'.modal-header'});//支持弹窗拖拽
	    });
	  }
  
  function showMainContent(url,wholeFlag){
	    if(url=="###")return false;
	    saveEndUrl(url);
	    $("#tab_home_1_link").click();
	    $("#main_content").html();
	    $("#main_content").load(url);
	    if(wholeFlag==="whole")
	    {
	      $(".csc_leftMenuBox").hide();
	      $(".csc_wholeBox").removeClass("span9").addClass("span12").css({"margin-left":"0","padding":"0 19px"});
	    }else{
	      $(".csc_leftMenuBox").show();
	      $(".csc_wholeBox").removeClass("span12").addClass("span9").css({"margin-left":"12px","padding":"0 0 19px"});
	    };
	  }
  
  function hideLoading(){
	    $('.loading').hide();
	  }
  
  jQuery.fn.center = function () {  
	   var $win = $(window);
	   this.css('position','absolute');  
	   this.css('top', (($win.height() - this.height()) / 2) + $win.scrollTop() + 'px');  
	   this.css('left', (($win.width() - this.width()) / 2) + $win.scrollLeft() + 'px');  
	   return this;  
	  };
  
  function plupload_init(){
	    $("#uploader").pluploadQueue({
	    //$("#uploader").plupload({
	      runtimes : 'html4',//'gears,flash,silverlight,browserplus,html5,html4' 这里是说用什么技术引擎
	      url : 'servlet/fileUpload',// 服务端上传路径
	      max_file_size : '100mb',// 文件上传最大限制
	      chunk_size : '1mb',// 上传分块每块的大小，这个值小于服务器最大上传限制的值即可
	      unique_names : true,// 上传的文件名是否唯一    
	      resize : {width : 320, height : 240, quality : 90},// 是否生成缩略图（仅对图片文件有效）    
	      filters : [//  这个数组是选择器，就是上传文件时限制的上传文件类型
	        {title : "Image files", extensions : "jpg,gif,png"},
	        {title : "Zip files", extensions : "zip"}
	      ],    
	      flash_swf_url : 'assets/js/uploader/plupload.flash.swf',// plupload.flash.swf 的所在路径    
	      silverlight_xap_url : 'assets/js/uploader/plupload.silverlight.xap',// silverlight所在路径
	      multipart_params: {'user': 'dujunzhi', 'time': '2012-06-12'}
	    });
	  }
  
  PL._init();
  PL.joinListen('/source/event');//事件标识 在数据源中引用 
  function onData(event) {
      if(event.get("msg")!=undefined){ 
           
           var msgObj = JSON.parse(event.get("msg"));  
           for(var i=0;i<msgObj.length;i++){
             //f_tip(msgObj[i]);
             //compTask(msgObj[i]);
        	//license拦截        	
//         	   if(msgObj[i].taskType == "LicenseProbation"){
// 					$("#license_remainDays_span").html("<i class='icon-exclamation-sign icon-white'></i>"+internationalizationObj.rightMenu_checkLic_check3);
// 					showModal(encodeURI("pages/license/loginShow.jsp?errorState=dateError"));
// 					continue;
// 				}
// 				if(msgObj[i].taskType == "LicenseProbationError"){
// 					showModal(encodeURI("pages/license/loginShow.jsp?errorState=dateFileError"));
// 					continue;
// 				} 
               try{//wangst2015-8-18 16：27添加，jms如果在调用的过程中出错，那么后续的所有消息的回调都将不执行，但是添加了catch之后，就可以避免这种错误导致的阻断，某次回调的错误不影响后续jms的回调
        	     pl_handlerMessage(msgObj[i]);	
	           }catch(e){
	        	   
	           }
           }
      }
  }
  var defaultTipTaskTypeFilter={
			"syncHostState":"-1",
			"masterHostSyncByHa":"0"
	 	};
	  
	  function f_tip(obj) 
	  {
		    var met=defaultTipTaskTypeFilter[obj.taskType];
		    if(met=="-1"){
		    	return;
		    }else if(met=="0"){
		    	sysTip(obj);
		    }else{
		    	defaultTip(obj);
		    }
	  
	  }
  function defaultTip(obj)
  {
    if(pc.util.isNotNull(obj.progress) && obj.progress==100){
  	 var msgDiv = "<div>任务【"+obj.taskId+"】</div>"+obj.taskText+"【"+obj.progress+"%】<div style='width:150px;height:1px;'></div>";
       $('.bottom-right').notify({
            message: {html:msgDiv},
            type:'bangTidy',
            fadeOut: {
              delay:8000
            }
          }).show();
    }
  }
  var memoryPerformance;
  var cpuPerformance;
  var netPerformance;
  var storagePerformance;
  
  function sysTip(obj){
    if(pc.util.isNotNull(obj.progress) && obj.progress==100){
 	  var msgDiv = "<div style='font-weight:bold;z-index:10000;'>"+obj.taskText+"</div><div style='width:150px;height:1px;'></div>";
      $('.bottom-right').notify({
           message: {html:msgDiv},
           type:'bangTidy',
           fadeOut: {
             delay:8000
           }
         }).show();
   }
  }
  
  
  $(window).load(function(){
      $("#tree_tabbable .nav .active a").trigger("click");
    })
    
    
	function showMainVm(url) {
	    $("#tree_soft_2_a").attr("class", "");
		$("#tree_soft_2_a").attr("class", "level1 curSelectedNode");
		$("#tree_soft_3_a").attr("class", "");
		$("#tree_soft_3_a").attr("class", "level1");
	    showMainContent(url + '&mathRound=' + Math.random());
	}
  
  function showMainResource(url) {
		//$("#tree_soft_3_a").attr("class", "");
		//$("#tree_soft_3_a").attr("class", "level1");
		showMainContent(url + '?mathRound=' + Math.random());
		var url1 = 'tree_my_resources.jsp?mathRound=' + Math.random();
		$('#lefttab9_link').attr('url', url1);
	}
  
</script>

</body>
</html>



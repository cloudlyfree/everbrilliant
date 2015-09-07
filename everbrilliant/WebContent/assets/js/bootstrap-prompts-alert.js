window._originalAlert = window.alert;
window._alert = window.alert;
window.alert = function(text, cb, style) {
  bootStrapAlert = function() {
    if(! $.fn.modal.Constructor)
      return false;
    if($('#windowAlertModal').length == 1){
    	unbind();
    	return true;
    }
    var breadcrumbcon = $(".breadcrumb");
    if(style=="inpage" && breadcrumbcon.length > 0)
    {
      var breadcrumbHtml = breadcrumbcon.html();
      var msg = "<li>" + text +"</li>";
      breadcrumbcon.addClass("showresult").html(msg);
      var closefuc = function(){
        $("li",breadcrumbcon).fadeOut(1000,function(){
           breadcrumbcon.removeClass("showresult");
           breadcrumbcon.html(breadcrumbHtml);
        })
      }
      setTimeout(closefuc,2000);
    }
    else
    $('body').append(' \
    <div id="windowAlertModal" class="alertmodal modal hide fade" tabindex="-1" role="dialog" aria-hidden="true"> \
      <div class="modal-header"> \
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
          <h3 id="myModalLabel">系统提示</h3> \
      </div> \
      <div class="modal-body"> \
        <p> alert text </p> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">关闭</button> \
      </div> \
    </div> \
    ');
    return true;
  };
  function unbind() { 
      $("#windowAlertModal .btn-primary").unbind('click');
    }
  if ( bootStrapAlert() ){
    $('#windowAlertModal .modal-body p').text(text);
    $('#windowAlertModal').modal();
    $("#windowAlertModal .btn-primary").bind('click', cb);
  }  else {
    console.log('bootstrap was not found');
    window._originalAlert(text);
  }
}
window._originalConfirm = window.confirm;
window._confirm = window.confirm;
window.confirm = function(text, cb) {
  bootStrapConfirm = function() {
    if(! $.fn.modal.Constructor)
      return false;
    if($('#windowConfirmModal').length == 1){
    	unbind();
    	 $("#windowConfirmModal .btn-primary").bind('click', confirm);
    	    $("#windowConfirmModal .dialog_cancel").bind('click', deny);
    	return true;
    }
    $('body').append(' \
    <div id="windowConfirmModal" class="confirmmodal modal hide fade" tabindex="-1" role="dialog" aria-hidden="true"> \
      <div class="modal-header"> \
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
          <h3 id="myModalLabel">系统提示</h3> \
      </div> \
      <div class="modal-body"> \
        <p> alert text </p> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">确定</button> \
        <button class="btn dialog_cancel" data-dismiss="modal" aria-hidden="true">取消</button> \
      </div> \
    </div> \
    ');
    function unbind() { 
      $("#windowConfirmModal .btn-primary").unbind('click');
      $("#windowConfirmModal .dialog_cancel").unbind('click');
    }
    function confirm() { cb(true); }
    function deny() { cb(false); }
    $("#windowConfirmModal .btn-primary").bind('click', confirm);
    $("#windowConfirmModal .dialog_cancel").bind('click', deny);
    return true;
  }
  if ( bootStrapConfirm() ){
    $('#windowConfirmModal .modal-body p').text(text);
    $('#windowConfirmModal').modal();
  }  else {
    console.log('bootstrap was not found');
    window._originalConfirm(text);
  }
}

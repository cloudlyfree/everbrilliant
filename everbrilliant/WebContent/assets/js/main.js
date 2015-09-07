var messages = [
    [ 'bottom-right', 'info', '有一个用户登录了系统.'],
    [ 'top-right', 'success', '有一台虚拟机创建成功.' ],
    [ 'bottom-left', 'warning', '有一个硬盘快满了.' ],
    [ 'top-right', 'danger', "有一个虚拟机快撑不住了." ],
    [ 'bottom-right', 'info', "有一个页面被点击了." ],
    [ 'top-right', 'inverse', '你看到我这个信息了吗？' ],
    [ 'bottom-left', 'bangTidy', '你必须看清楚这里的信息！' ]
];
function refreshCurrentTab() {
    $("#main_content > .tabbable .nav .active a").tab("refresh");
}
function fireClickEvent(obj) {
    try {
        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent('click', true, true, window);
        obj.dispatchEvent(evObj);
    } catch (err) {
        obj.click();
    }
}
function loginOut() {
    confirm('确定要退出系统吗？', function (result) {
        if (result) {
            location.href = "login.html";
        }
    });
}
/**输入当前操作员密码进行校验**/
function userValidate(callback) {
    $("#ajax-modal").load("pages/user/validate.html", '', function () {
        $("#ajax-modal").modal();
    });
}
/**退出模式化窗口**/
function hideError() {
    $("#errr-modal").modal('hide');
}
function hideModal() {
    $("#ajax-modal").modal('hide');
}
function hideModalSecondary() {
    $("#ajax-modal-secondary").modal('hide');
}
/**退出向导页面**/
function hideWizard() {
    $("#ajax-wizard").modal('hide');
}
function showIndex() {
    $("#main_content").load("pages/root/tab.html");
}

function toggleWarning() {
    $("#uploadingPopup").hide();
    $("#warningPopup").toggle();
}
function toggleUploading() {
    $("#warningPopup").hide();
    $("#uploadingPopup").toggle();
}
function showError() {
    $("#error-modal").html('');//防止url指向页面不存在
    $("#error-modal").load("error.html", '', function () {
        $("#Msg__errorCode").html('abc');
        $("#error-modal").modal();
    });
}
function showModal(url) {
    $("#ajax-modal").html('');//防止url指向页面不存在
    $("#ajax-modal").load(url, '', function () {
        $("#ajax-modal").modal();
    });
}
function showModalSecondary(url) {
    $("#ajax-modal-secondary").html('');//防止url指向页面不存在
    $("#ajax-modal-secondary").load(url, '', function () {
        $("#ajax-modal-secondary").modal();
    });
}
/*function showModalSecondary2(url) {
    $("#ajax-modal-secondary").html('').addClass('modal2');//防止url指向页面不存在
    $("#ajax-modal-secondary").load(url, '', function () {
        $("#ajax-modal-secondary").modal();
    });
}*/
function showWizard(url) {
    $("#ajax-wizard").html('');//防止url指向页面不存在
    $("#ajax-wizard").load(url, '', function () {
        wizard.show();
    });
}
function showMainContent(url) {
    $("#main_content").html();
    $("#main_content").load(url);
}

function notifyEvent() {
    var message = messages[Math.floor(Math.random() * messages.length)];

    $('.' + message[0]).notify({
        message: { text: message[2] },
        type: message[1],
        fadeOut: {
            delay: Math.floor(Math.random() * 500) + 2500
        }
    }).show();
    //showLoading();
    setTimeout(notifyEvent, 5000);
}
function showLoading(loadingId, loadingTip) {
    $('.loading').center();
    $('.loading').hide();
    $(loadingId || '#loading-0').show();
    $("#loadingTip").text(loadingTip || "加载中......");
}
function hideLoading() {
    $('.loading').hide();
}

$.fn.center = function () {
    var $win = $(window);
    this.css('position', 'absolute');
    this.css('top', (($win.height() - this.height()) / 2) + $win.scrollTop() + 'px');
    this.css('left', (($win.width() - this.width()) / 2) + $win.scrollLeft() + 'px');
    return this;
};

window.onscroll = function () {
    $('.loading').center();
};

$(window).resize(function(){
    $('.loading').center();
});






$(function () {
    $("#tree_tabbable .nav .active a").each(function () {
        $(this).tab('show')
    });
    setTimeout(notifyEvent, 5000);

    //异步加载组件模板， 模板中包含应当包含所有组件的html模板， 每个组件的html都用type="text/template"的script标签包含住

    $('#template_area').load('templates/j_comp_template.html', function(){

        //初始化组件
        var taskShow = $.comp_taskShow();

        //使用组件
        useTaskShow(taskShow);

    });

    /*
    定义使用组件的函数， 组件的详细使用方法在
     */
    function useTaskShow(taskShow){
        taskShow.task('1', 'qwe', 'qweqweqwe', 20, 0);
        var nn = 1, mm = 1, rr = 1;
        window.setInterval(function(){
            taskShow.task('1',{progress: nn++, status: -1})
        }, 1000);
        window.setInterval(function(){
            taskShow.task(++mm,'qwe', 'qweqweqwe', 20, -1);
        }, 3000);

        window.setInterval(function(){
            taskShow.task(++rr);
        }, 5000);
    }


});

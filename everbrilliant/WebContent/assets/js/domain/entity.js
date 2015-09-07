!function ($) {	
	$.ContextMenu = function(menuList){
		this.menuList = menuList;

		this.node_html = function(menu){
			//if(!menu) return;

			if(menu=="divider")
				return '<li class="divider"></li>';
			if(menu.onclick && menu.onclick!="")
				return '<li><a tabindex="-1" class="'+menu.className+'" href="javascript:void(0)" onclick="'+menu.onclick+'">'+menu.name+'</a></li>';
			else
				return '<li><a tabindex="-1" class="'+menu.className+'" href="javascript:void(0)">'+menu.name+'</a></li>'
		};
		this.html = function(){
			var str = '<ul class="dropdown-menu" role="menu">'
			if(this.menuList && this.menuList.length>0){
				for(var i=0; i<this.menuList.length; i++){
					str += this.node_html(this.menuList[i]);
				}
			}else{
				str += '<li><a tabindex="-1" href="javascript:void(0)">没有可执行操作</a></li>';
			}			
			str += '</ul>'
			return str;
		};
		this.root = function(id){
	    	return '<div id="'+id+'">'
	    		+this.html()
	    		+'</div>';
	    };
	}
}(window.jQuery);

!function ($) {
	var contextMenuIndex = 0;
	var contextMenu_allHTML ="";
	$.TreeNode = function (isleaf, name, className, url, contextmenu, showChildNum, menuList, id) {
		this.isleaf = isleaf;
		this.name = name;
		this.className = className;
		this.children = [];
		this.url = url;
		this.showChildNum = showChildNum;
		this.type = contextmenu;
		this.contextmenu = contextmenu;
		this.menuList = menuList;
		this.id = id;
		this.contextMenu_HTML = "";
		this.isShowLoading = false;
		
		this.addChild = function(child){
			this.children[this.children.length++] = child;
		};
		this.children_html = function(){
			var str = "";
			for(var i=0; i<this.children.length; i++){
				str += '<li>' + this.children[i].html() + '</li>';
			}
			return str;
		};

	    this.html = function () {
	    	if(this.menuList){
	    		contextMenuIndex++;
	    		this.contextMenu_HTML = new $.ContextMenu(this.menuList).root(this.contextmenu+contextMenuIndex);
	    		contextMenu_allHTML += this.contextMenu_HTML;
	    	}

	        return !isleaf ? 
	    		 '<a href="javascript:void(0)" onclick="bootstrap_tree_nodeClick($(this))" type="'+this.type+'" id="'+this.id+'" role="branch" class="tree-toggle closed" data-toggle="branch" url="'+this.url+'" title="'+this.name+'">'
	            +'<span class="'+this.className+'"'
	            +(this.contextmenu?(' data-toggle="context" data-target="#'+this.contextmenu+contextMenuIndex+'"'):'')
	            +'>'+this.name+(this.showChildNum?'('+this.children.length+')':'')+'</span>'
	          	+'</a>'
	          	+(this.isShowLoading?"":'<ul class="branch">'+this.children_html()+'</ul>')
	        	:
	        	 '<a href="javascript:void(0)" onclick="bootstrap_tree_nodeClick($(this))" type="'+this.type+'" id="'+this.id+'" role="leaf" data-toggle="leaf" url="'+this.url+'" title="'+this.name+'">'
	            +'<span class="'+this.className+'"'
	            +(this.contextmenu?(' data-toggle="context" data-target="#'+this.contextmenu+contextMenuIndex+'"'):'')
	            +'>'+this.name+'</span>'
	          	+'</a>';
	    };

	    this.root = function(){
	    	return '<ul class="tree">'
	    		+'<li>'
	    		+this.html()
	    		+'</li>'
	    		+'</ul>';
	    };
	    this.contextmenu_node = function(){
	    	return this.contextMenu_HTML;
	    };
	    this.contextmenu_all = function(){
	    	return contextMenu_allHTML;
	    };

	};
}(window.jQuery);

/**将树选中节点设置为空**/
function bootstrap_tree_current_node_set_null(){
	bootstrap_currentNode = null;
}
/**增加子树**/
function bootstrap_tree_add_subtree(rootId, node){
	$(rootId + " + ul").append("<li>"+node.html()+"</li>");		
	$("#contextMenuDiv").append(node.contextmenu_all());
}
/**增加节点**/
function bootstrap_tree_add_node(parentNodeType, parent_id, isleaf, name, className, url, contextmenu, showChildNum, menuList, id){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){	
		var node = new $.TreeNode(isleaf, name, className, url, contextmenu, showChildNum, menuList, id);

		var datacenter_id = bootstrap_currentNode.attr("id").split("-")[1];
		var parent_node_id = "#datacenter-"+datacenter_id+"-"+parentNodeType+"-"+parent_id;
		if($(parent_node_id).attr("role")=="branch"){
			var nearNode = $(parent_node_id+" + ul a[type='"+contextmenu+"']:last");
			if(nearNode.length>0){
				nearNode.parent().after("<li>"+node.html()+"</li>");
			}else{
				$(parent_node_id+" + ul").append("<li>"+node.html()+"</li>");
			}			
		}
		$("#contextMenuDiv").append(node.contextmenu_node());
	}
}

/**增加节点**/
function datacenter_bootstrap_tree_add_node(datacenter_id,parentNodeType, parent_id, isleaf, name, className, url, contextmenu, showChildNum, menuList, id){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){	
		var node = new $.TreeNode(isleaf, name, className, url, contextmenu, showChildNum, menuList, id);
		var parent_node_id = "#datacenter-"+datacenter_id+"-"+parentNodeType+"-"+parent_id;
		if($(parent_node_id).attr("role")=="branch"){
			var nearNode = $(parent_node_id+" + ul a[type='"+contextmenu+"']:last");
			if(nearNode.length>0){
				nearNode.parent().after("<li>"+node.html()+"</li>");
			}else{
				$(parent_node_id+" + ul").append("<li>"+node.html()+"</li>");
			}	
		}
		$("#contextMenuDiv").append(node.contextmenu_node());
	}
}

/**删除节点**/
function bootstrap_tree_remove_node(nodeType, id){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){	
		var backup_bootstrap_currentNode_id = "#"+bootstrap_currentNode.attr("id");

		var datacenter_id = bootstrap_currentNode.attr("id").split("-")[1];
		var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
		if($(node_id).attr("role")=="branch")
			$(node_id).parent().remove();
		else
			$(node_id).remove();

		if(node_id==backup_bootstrap_currentNode_id){
			bootstrap_tree_current_node_set_null();
		}
	}
}

/**删除节点**/
function datacenterId_tree_remove_node(datacenterId,nodeType, id){
		var node_id = "#datacenter-"+datacenterId+"-"+nodeType+"-"+id;
		if($(node_id).attr("role")=="branch")
			$(node_id).parent().remove();
		else
			$(node_id).remove();
}

/**更新节点名称**/
function bootstrap_tree_update_node_name(nodeType, id, name){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){		
		var datacenter_id = bootstrap_currentNode.attr("id").split("-")[1];
		var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
		$(node_id+" span").text(name);
		$(node_id).attr("title", name);
	}
}
/**更新节点名称**/
function update_node_name(datacenter_id, nodeType, id, name){
	var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
	$(node_id+" span").text(name);
	$(node_id).attr("title", name);
}
/**更新节点url**/
function bootstrap_tree_update_node_url(nodeType, id, url){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){		
		var datacenter_id = bootstrap_currentNode.attr("id").split("-")[1];
		var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
		$(node_id).attr("url", url);
	}
}
/**更新节点url**/
function update_node_url(datacenter_id, nodeType, id, url){
	var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
	$(node_id).attr("url", url);
}
/**更新节点样式**/
function bootstrap_tree_update_node_cssName(nodeType, id, cssName){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){
		var datacenter_id = bootstrap_currentNode.attr("id").split("-")[1];
		var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
		$(node_id+" span").removeClass();
		$(node_id+" span").addClass(cssName);
	}
}
/**更新节点样式**/
function datacenterId_tree_update_node_cssName(nodeType,dcId,id, cssName){
		var node_id = "#datacenter-"+dcId+"-"+nodeType+"-"+id;
		$(node_id+" span").removeClass();
		$(node_id+" span").addClass(cssName);
}
/**更新节点右键菜单**/
function bootstrap_tree_update_node_contextmenu(nodeType, id, menuList){
	if(bootstrap_currentNode && bootstrap_currentNode.attr("id")){
		var datacenter_id = bootstrap_currentNode.attr("id").split("-")[1];
		var node_id = "#datacenter-"+datacenter_id+"-"+nodeType+"-"+id;
		var contextmenu_id = $(node_id+" span").attr("data-target");
		$(contextmenu_id).html(new $.ContextMenu(menuList).html());
	}
}

/**更新节点右键菜单**/
function datacenterId_tree_update_node_contextmenu(nodeType,dcId,id, menuList){
		var node_id = "#datacenter-"+dcId+"-"+nodeType+"-"+id;
		var contextmenu_id = $(node_id+" span").attr("data-target");
		$(contextmenu_id).html(new $.ContextMenu(menuList).html());
}

function memo4button_popover(){
	$(".memo4button").each(function(){
		$(this).attr("data-toggle", "popover");
		$(this).attr("data-trigger", "hover");
		if(!$(this).attr("data-placement")||$(this).attr("data-placement").length<0)
		{
			$(this).attr("data-placement", "top");
		};
		$(this).attr("title", "功能说明");
		$(this).attr("data-content", memo4button_map[$(this).attr("memoId")]);
		$(this).popover();
	});
}

function memo4popover_popover(){
	$(".popover_icon").each(function(){
		$(this).attr("data-toggle", "popover");
		$(this).attr("data-trigger", "hover");
		if(!$(this).attr("data-placement")||$(this).attr("data-placement").length<0)
		{
			$(this).attr("data-placement", "top");
		};
		$(this).attr("title", "概念说明");
		$(this).attr("data-content", memo4popover_map[$(this).attr("memoId")]);
		$(this).popover();
	});
}

var memo4button_map = {
	//VDC
	vdc_create_task: "平台管理员创建业务域之后，业务域管理员可使用业务域下的配额部署云主机或云硬盘以及创建业务系统",//创建VDC
	vdc_update_task: "修改业务域的名称和备注", //修改VDC信息
	vdc_update_resource_task: "修改业务域的配额。此功能允许在业务域容量不足时扩展配额，或在不影响已使用资源的前提下缩减配额",  //修改业务域配额
	vdc_delete_task: "删除不再使用的业务域，要求该业务域下不存在有效的服务、业务系统、服务实例，此操作不可恢复",//删除VDC TODO 删除
	
	//服务
	service_create_task: "服务是云平台提供资源的方式，用户通过申请服务来使用云平台的资源(云主机、云硬盘)",//创建服务
	service_manage_task: "将服务产品用目录管理起来",//服务目录管理
	service_release_task: "发布服务供用户申请",//发布服务 
	service_offline_task: "下线不再使用或者需要变更的服务，下线期间用户将不能申请该服务，但不影响已申请的服务",//下线服务
	service_destroy_task: "销毁已下线的服务，服务销毁后将不能再发布和修改",//销毁服务 

	//业务系统
	project_create_task: "业务系统用于归类用户的服务实例。所有的服务实例必须归属于某一业务系统，用户申请服务时必须指定服务归属的业务系统",//创建业务系统
	vApp_summary_task1: "创建业务系统",
	vApp_summary_task2: "修改业务系统",
	vApp_summary_task3: "启动业务系统",
	vApp_summary_task4: "关闭业务系统",
	vApp_summary_task6: "重启业务系统",
	vApp_summary_task5: "删除业务系统",
	//服务实例
	service_instance_task1: "配置服务实例，支持调整云主机CPU和内存或扩展云硬盘大小",  //修改服务实例 改成 配置
	service_instance_task2: "终止服务实例，系统将停止向用户提供服务并回收服务所使用的资源，此操作不可恢复", //终止服务实例 改成 终止 ，位置放在延期后面。删除回收资源的按钮。
	service_instance_task3: "冻结服务实例，冻结后，用户将无法配置服务及操作服务提供的资源。系统会在服务实例超过有效期时自动执行此操作。", //冻结服务实例
	service_instance_task4: "回收已过期且未延期的资源实例，回收之后该资源将不能恢复", //回收服务实例 删除此任务
	service_instance_task5: "恢复被冻结的服务实例", //恢复服务实例
	service_instance_task6: "有效时间变更：变更失效时间，可提前或者延后服务的有效期", //延期服务
	service_instance_task7: "终止：立即终止服务，终止后资源将无法使用，仅支持用户延期恢复服务或删除服务。服务到期后将自动进行终止",
	service_instance_task8: "删除：删除已经过期且未延期的服务，释放服务占用的资源，删除后资源将不能恢复",
	//vm>show.jsp 虚拟机摘要页面
	vm_summary_task1: "对目标业务系统下的云主机进行开机操作",
	vm_summary_task12:"对目标业务系统下的云主机进行关机操作",
	vm_summary_task2: "对目标业务系统下的云主机进行重启操作",
	vm_summary_task3: "对目标虚拟机进行挂起/恢复操作",
	vm_summary_task4: "可以将正在运行的虚拟机从一台服务器移动到同一个资源池中的另一台服务器，而几乎不会造成任何服务中断",
	vm_summary_task11: "可以将关机的虚拟机从一台服务器移动到同一个资源池中的另一台服务器",
	vm_summary_task5: "使当前虚拟机转换为模板",
	vm_summary_task6: "用户把当前选择的虚拟机另存为模板",
	vm_summary_task7: "在当前的物理主机中复制目标虚拟机",
	vm_summary_task8: "进入控制台",
	vm_summary_task9: "删除虚拟机",
	vm_summary_task10: "对目标虚拟机进行收集操作",
	vm_summary_task13:"设置业务系统下目标云主机的启动顺序",
	vm_summary_task14: "对目标云主机进行关机操作",
	vm_summary_task15: "对目标云主机进行开机操作",
	vm_summary_task16: "查看云主机通过系统安装的软件信息和进度",
	
	//虚拟磁盘
	vdisk_mount_task1: "可将云硬盘挂载到云主机",
	vdisk_mount_task2: "云主机为运行中和关机时才能执行此操作",
	vdisk_refresh_task1: "刷新云硬盘列表",
	vdisk_expand_task1: "可对云硬盘的容量进行扩展",
	
	//业务域管理
	bdm_sync_org_task: "同步组织架构的信息形成域信息",
	bdm_create_down_task: "新增下级域目录信息",
	bdm_delete_task: "删除域目录信息",
	bdm_update_task: "修改域目录信息",
	bdm_update_pe_task: "修改业务域的资源配额",
	bdm_addOuter_task: "添加组织机构以外的用户",
	bdm_innerOuter_task: "添加组织机构中的用户",
	//软件管理
	appstore_create_task: "在软件库中新添加软件；上传软件介质安装包，并维护软件的基本信息，关联安装脚本",
	appstore_type_task: "对软件进行分类管理，可维护软件类型信息",
	script_create_task: "在脚本库中新添加脚本；上传安装脚本文件，并维护脚本的基本信息，关联安装软件",
	
	//系统管理
	ad_sync_org_task: "AD域服务器中的组织信息同步到系统",
	org_create_task: "新增同一级的组织信息",
	org_create_down_task: "新增下一级的组织信息",
	org_del_task: "删除组织信息",
	org_update_task: "修改组织信息",
	
	ad_sync_user_task: "AD域服务器中的用户信息同步到系统",
	user_create_task: "新增加用户；维护用户的账号、密码等基本信息",
	
	role_create_task: "新增加角色；可分配角色相应的操作权限"

}

var memo4popover_map = {
	service_baseinfo_expire: "设定服务有效期限，有效期限范围含开始日期及结束日期当日，用户只能在有效期内申请使用服务。系统将自动下线超过有效期的服务",//创建服务时，有效期说明
	project_new_memo1: "使用业务系统部署虚拟机的时候需要从指定ip池中选择ip，因此创建业务系统的时候需要预先指定ip池",
	license_show_memo1:"许可数量在当前系统中没有明确作用"
	//license_show_memo1: "每个虚拟机将占用一个许可数量"
}
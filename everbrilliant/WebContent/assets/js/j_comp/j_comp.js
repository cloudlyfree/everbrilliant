/*
组件使用方法：
    var t = $.comp_taskShow()初始化组件

    新增或修改---- t.task(id, taskNum, name, progress, status) id不存在新增， 存在修改， 参数必须为满惨

    新增----t.add(id, taskNum, name, progress, status)满参数的时候来新增任务

    修改----t.update(id, progress, status)三个参数时，用作修改进度跟状态信息
           t.update(id, {...}) 两个参数时， 用作自定义修改各项信息， id不能修改

    删除----t.remove(id)删除操作。


    t.clear(isAll)此方法主要用于按钮事件， 手动调用几率很小;手动调用传入true的时候， 会清空所有任务， 如果不传就只清空完成跟失败的任务
 */
$.comp_taskShow = (function(G, doc, $, undefined){


        var $body,
            $mainE,
            $popUp,
            $content,
            $table,
            $tBody,
            $clearBtn,
            $topBtn,
            htmlStr,
            tempOuterE,
            theComp,
            allTasks = {};

        var Task = (function(){

            function _task(props){

                var $idE = $('<td style="display: none;"></td>'),
                    $taskNum = $('<td></td>'),
                    $nameE = $('<td></td>'),
                    $progressE = $('<td class="progressBarContainer"></td>'),
                    $statusE = $('<td></td>'),
                    $timeE = $('<td></td>'),
                    $tr = $('<tr></tr>');

                $progressE.html('<div class="progress progress-striped active p_rel"><div class="progressTxt"></div><div class="bar bar-info b_r"></div></div>');
                $statusE.html('<div></div>');

                var $progressBar = $($progressE[0].children[0]),
                    $progressTxt = $($progressBar[0].children[0]),
                    $progressStep = $($progressBar[0].children[1]);



                $tBody.prepend($tr.append($idE, $taskNum, $nameE, $progressE, $statusE, $timeE));
                this.$es = {
                    tr: $tr,
                    id: $idE,
                    taskNum: $taskNum,
                    name: $nameE,
                    progressBar: $progressBar,
                    progressTxt: $progressTxt,
                    progressStep:$progressStep,
                    status: $($statusE[0].children[0]),
                    time: $timeE
                };

                this.update(props);
            }

            _task.prototype = {
                destroy: function(){
                    this.$es.tr.remove();
                    delete allTasks[this.id];
                },
                update: function(props){
                    var prop;

                    if( (prop = props.id)!==undefined && this.id === undefined) {
                        this.id = prop;
                        this.$es.id.html(prop);
                    }//初始化id


                    if( (prop = props.taskNum)!==undefined) {//
                        this.taskNum = prop;
                        this.$es.taskNum.html(prop);
                    }

                    if( (prop = props.name)!==undefined ) {//更新任务名称
                        this.name = prop;
                        this.$es.name.html(prop);
                    }

                    if( (prop = props.progress)!==undefined ) {//更新任务进度
                        var n = Number(prop),
                            n = n > 100? 100: n,
                            m = 100 - n,
                            colorStr = 'rgb('+ m + '%,'+ n + '%,0%)';
                        this.progress = n;
                        this.$es.progressTxt.html(n + '%');//更新进度指示文本
                        this.$es.progressStep.css({width: n + '%'});//更新进度条长度及颜色
                    }

                    if((prop = props.status)!==undefined) {

                        var statusClass, statusText;
                        this.status = Number(prop);

                        switch(Number(prop)) {
                            case -1:
                                statusText = '失败';
                                statusClass = 'label label-important';
                                break;
                            case 0:
                                statusText = '进行中';
                                statusClass = 'label label-warning';
                                break;
                            case 1:
                                statusText = '完成';
                                statusClass = 'label label-success';
                                break;
                            default:
                                statusText = '状态错误';
                                statusClass = 'label label-important';
                        }

                        this.$es.status.html(this.statusText = statusText);//更新状态文字
                        this.$es.status[0].className = statusClass;//更新状态颜色
                    }


                    var time = new Date();
                    this.$es['time'].html(time.getDate() + '日&nbsp' + time.toLocaleTimeString());
                }
            };


            return _task;
        })();

        function updateTask(id, prop){
            var theTask;
            if(!(theTask = allTasks[id])) throw new Error('wrongId, this task doesn\'t exists');

            theTask.update(prop);
        }

        function addTask(id, taskNum, name, progress, status){
            var newTask = new Task({id:id, taskNum: taskNum, name: name, progress: progress, status: status});
            allTasks[id] = newTask;
            return newTask;
        }

        function removeTask(id) {
            var task;
            if(task = allTasks[id]) task.destroy();
        }

        function clearTasks(isAll){
            var i ,temp, all = allTasks;

            for( var i in all){
                if((temp = all[i]).status === -1 || temp.status === 1 || isAll) temp.destroy();
            }

        }

        return function(){

            if(theComp) return theComp;

            $body = $(doc.body);

            htmlStr = $('#template_taskShow').html();
            tempOuterE = doc.createElement('div');

            tempOuterE.innerHTML = htmlStr;

            $mainE = $(tempOuterE.children[0]);
            $tBody = $('.taskTBody', $mainE);

            $popUp = $('.f-taskListPopupContainer', $mainE);

            $table = $tBody.parent();

            $content = $table.parent();

            $clearBtn = $('.clearTaskBtn', $mainE);
            $topBtn = $('.f-topBtn', $mainE);

            tempOuterE = htmlStr = undefined;

            function positionIt(){
                var needLeft = $(window).width()/2 + 1200/2 - 18;

                if(needLeft < 1182) needLeft = 1200 - 18;

                $mainE.css({left:needLeft + 'px'});
            }

            positionIt();
            /*
            function stopIt(e){
                e.preventDefault();
                e.stopPropagation();
            }

            function scrollByHand(e, d){
                $content.scrollTop($content.scrollTop() - d*100);
            }

            $table.on('mouseover', function(){
                console.log(2);
                $table.mousewheel(scrollByHand);
            });

            $table.on('mouseout', function(){
                console.log(3);
                $table.unmousewheel(scrollByHand);
            });

            $popUp.on('mouseover', function(){
                console.log(1);
                $popUp.mousewheel(stopIt);
            });

            $popUp.on('mouseout', function(){
                console.log(0);
                $popUp.unmousewheel(stopIt);
            });
               */
            $(window).scroll(function(){
                var topN = $(doc).scrollTop(), display;

                //console.log(topN);

                display = topN > 250 ? 'block' : 'none';

                $topBtn.css({display: display});
            });


            $(window).resize(function(){
                positionIt();
            });



            $body.append($mainE);//将模板元素添加到body中

            $clearBtn.on('click', function(event){
                clearTasks();
            });

            return {

                task: function(id, taskNum, name, progress, status){
                    if(allTasks[id]) updateTask(id, {taskNum: taskNum, name:name, progress: progress, status: status});
                    else addTask.apply(allTasks, arguments);
                },
                add: function(id, taskNum, name, progress, status){
                    addTask.apply(allTasks, arguments);
                },

                update: function(id, taskNum, name, progress, status){
                    var len = arguments.length;

                    switch (len) {
                        case 3:
                            updateTask(id, {progress: taskNum, status:name}); break;
                        case 2:
                            updateTask(id, name);break;
                    }
                },

                remove: function(id){
                    removeTask(id);
                },

                clear: function(all){
                    clearTasks(all);
                }
            };

        };
})(window, window.document, $);

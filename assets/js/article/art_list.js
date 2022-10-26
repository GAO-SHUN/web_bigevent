$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage


    // 定义一个时间的过滤器
    template.defaults.imports.dataFormat = function (date){
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = addZero(dt.getMonth() +1)
        var d = addZero(dt.getDate())

        var hh = addZero(dt.getHours())
        var mm = addZero(dt.getMinutes())
        var ss = addZero(dt.getSeconds())

        return y+'-'+ m +'-'+ d +' '+ hh +':'+ mm +':'+ ss 
    }

    function addZero(n){
        // 补零操作
       return n >9 ? n : '0'+n
    }




    // 定义一个查询参数用来和服务器比对
    var q ={
        pagenum:1,  // 页码值
        pagesize:2, // 每页显示多少条数据
        cate_id:'',   // 文章分类的id
        state:'',     // 文章的状态，可选值有：已发布、草稿
    }

    // 调用获取函数
    Huoqushuju()
    moban()



    // 获取服务器的表单数据
   function Huoqushuju(){
    $.ajax({
        method:'get',
        url:'/my/article/list',
        data:q,
        success:function(res){
            console.log(res)
            if(res.status !== 0){
                return layer.msg('获取失败')
            }
            layer.msg('获取成功')
            var temp = template('tpl-table',res)
            $('tbody').html(temp)
            tongjiText(res.total)
        }
    })
   }


//    模板类的发起请求
   function moban(){
    $.ajax({
        method:'get',
        url:'/my/article/cates',
        success:function(res){
            if(res.status !== 0){
                return layer.msg('调用失败')
            }
           var html = template('shaixuan',res)
           $('[name=cate_id]').html(html)

        //    from.render() 作用是用来再次渲染的，因为可能会提前渲染但是参数获取不到后面就不会在渲染页面,
        // 所以在这里使用form.render()就是发起结束时在渲染一次页面
           form.render()
        }
    })
   }


//    模板筛选类别的请求
   $('#shaixuanFrom').on('submit',function(e){
        e.prevenDefault()
        // 获取列表的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        // 赋值
        q.cate_id = cate_id
        q.state = state
        // 获取服务器渲染列表,重新获取
        Huoqushuju()
   })



//    页面总数统计
    function tongjiText(res){ // 获取显然页面的回调总数
        // 调用laypage.render() 方法来渲染页面的结构
        laypage.render({
            elem:'boxForm',         // 分页容器的 Id
            count:res,              // 总数据条数
            limit:q.pagesize,       // 每页显示几条数据
            limits:q.pagenum,      // 设置默认的选择的分页
            layout:['prev','limit','page', 'next','skip'], //分页其他功能的实现
            limits:[2,3,5,10], // 跳转页数的选择
            

// 触发jump的方式有两种，一个是点击触发，还有个就是调用了页面获取方法时候就调用
            // 分页页面的选择进行页面切换 
            jump:function(obj,op){// op是个布尔值可以检测是否是那种方式进行的判断
                // 将获取的页码值给q的pagenum(页面数值)
                console.log(op)
            console.log(obj.curr)



                q.pagenum = obj.curr
                // q.pagesize = obj.limit
                if(!op){ //基于判断的结果进行设置的添加
                    Huoqushuju()
                }
            }


        })
    }


    // 删除按钮的添加
    $('tbody').on('click','.layui-btn-xs',function(){
        // 获取删除按钮的个数
        var len = $('.layui-btn-xs').length

        layer.confirm('是否要删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/delete' + id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除失败')
                    }
                    if(len === 1){
                        q.pagenum = q.pagenum === 1 ? 1:q.pagenum -1
                        
                    }
                    layer.msg('删除成功')   
                    Huoqushuju() //刷新页面

                }
            })
            
            layer.close(index);
          });
       
    })
})
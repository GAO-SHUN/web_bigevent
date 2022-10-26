$(function(){

    var layer = layui.layer
    var form = layui.form


    artCate()

    function artCate(){
        $.ajax({
            method:'get',
            url:"/my/article/cates",
            success:function(res){
                
                var htmlSrc = template('tpl-table',res)
                $('tbody').html(htmlSrc)
            }
        })
    }


    var indexAdd = null
    // 添加按钮功能的实现
    $('#btnLeibie').on('click',function(){
         indexAdd = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tbn_tanchuang').html()
            // 这里选择的type是1就是可以识别html命令，但是直接书写无法获得code那样的错误纠正，可以在自己scrtipt中写一个
            // 然后通过dom进行获取直接赋值给content这样可以直接进行样式的添加和修改
          }); 
    })



    // 通过代理的方式，为form-add 表单绑定 submit事件
    $('body').on('submit','#tbn_TanchuForm',function(e){
        e.preventDefault(); // 移除默认提交行为
   //     console.log('ok') // 用来测试是否可用的
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('新增分类成功失败')
                }
                // 重新在执行获取参数的方法
                artCate()
                layer.msg('添加成功')
                layer.close(indexAdd) // 关闭弹出层indexAdd
            }
        })
    })


    // 编辑按钮的完成
    var indexExit = null
    $('tbody').on('click','#btn-bianji',function(){
        indexExit = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#tbn_tanchuang-exdt').html()
            // 这里选择的type是1就是可以识别html命令，但是直接书写无法获得code那样的错误纠正，可以在自己scrtipt中写一个
            // 然后通过dom进行获取直接赋值给content这样可以直接进行样式的添加和修改
          }); 

          var id = $(this).attr('data-id')
          $.ajax({
            method:'get',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('from-edit',res.data)
            }
          })
    })


    // 添加代理事件修改绑定事件
    $('body').on('submit','#tbn_TanchuForm-exdt',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('数据跟新失败')
                }layer.msg('数据跟新成功')

                layer.close(indexExit) //关闭弹出层

                artCate() //刷新页面
            }
        })
    })

    // 删除按钮的事件绑定
    $('tbody').on('click','#btn-delect',function(){
        var id = $(this).attr('data-id')

        // 提示用户是否删除
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
          $.ajax({
            method:'get',
            url:'/my/article/deletecate/' + id,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('删除失败')
                }
                layer.msg('删除成功')
                layer.close(index);
                artCate()

            } 
          })
        }) 
    })
})
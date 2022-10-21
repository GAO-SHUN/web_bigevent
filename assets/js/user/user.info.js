$(function(){
    var form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length > 6 ){
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    // 调用获取信息函数
    formusername()


    // 获取用户信息
    function formusername(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layui.smg('获取用户信息失败')
                }
                form.val('Formusername',res.data)
            }
        })
    }


    // 重置按钮功能的实现
    $('#btnPerst').on('click',function(e){
        // 阻止默认行为
        e.preventDefault() 
        // 然后在获取以下里面的东西然后完成重置
        formusername()  
    })

    // 提交功能的实现
    $('.layui-form').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                
                if(res.status !== 0){
                    return layui.layer.msg('提交失败')
                }
                layui.layer.msg('用户信息更新成功')
                // 提交成功调用父类的getUserinfo方法进行页面其他元素的修改
                window.parent.getUserinfo()
            
            }
        })
    })
})
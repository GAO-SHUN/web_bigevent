$(function(){
    // 点击注册的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击登录的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取layui的form表单
    var form = layui.form
    // 使用layui的弹窗
    var layer = layui.layer;
    form.verify({ // 两个自定义校验规则
        // 密码校验
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

        //重复密码校验规则
        repass:function(date){
            // 属性选择器 [] 意思是选择.reg-box 的叫name=repassword的属性
           let val = $('.reg-box [name=repassword]').val()
           if(val !== date){
            return '两次密码不一致'
           }
        }
    })


// 发起POST请求

   
    // 监听表单
    $('#Form_select').on('submit',function(e){
    var data = {username:$('#Form_select [name=username]').val(),password:$('#Form_select [name=password]').val()}
    e.preventDefault() // 阻止默认行为
    $.post('/api/reguser',data,function(res){
        if(res.status !== 0){
            return layer.msg(res.message);
        }layer.msg('注册成功,请登录')
        // 条件成功后，模拟人为点击行为
        $('#link_login').click()
        })
    })


    // 监听登录表单
    $('#Form_login').on('submit',function(e){
        e.preventDefault() // 清除默认样式
        $.ajax({
            url:"/api/login",
            method:'post',
            // 获取表单数据，这里this值的是Form_login
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                   return layer.msg('登录失败');
                }
                layer.msg('登录成功')
                // 保存 token数据
                localStorage.setItem('token',res.token)

                // 跳转到后台页面
                location.href='/index.html'
            }
        })
    })



})


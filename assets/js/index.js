$(function(){
    // 调用 getUserinfo获取用户信息
    getUserinfo()

    // 退出功能的实现
    // 导入layui库组件
    var layer = layui.layer;
    $('#exte').on('click',function(){
        layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
            // 如果点击确认则清除本地的localStorage的token密钥
            localStorage.removeItem('token')
            // 然后跳转到登录页面
            location.href='/login.html'
            
            layer.close(index);
          });
    })
})

function getUserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
       // 为了节约执行成本添加到自定api里面进行统一的设置
        // headers:{
        //     // 这里加Authorization是因为没有权限获取Authorization，在链接接口文档的里面会写get或post请求需要加什么才可以获取什么值
        //     Authorization:localStorage.getItem('token') || " "
        // },
        success:function(res){
            if(res.status !== 0){
                // 登录失败
                return layui.layer.msg('登录失败')
            }
            // 登录成功的话
                Authorization(res.data)
        },
        // 用来拦截没有登录还能进入管理页面的操作
        // 无论是执行成功还是执行失败都会执行complete
        // complete:function(res){
        //     console.log(res)
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
        //         // 清除locaolStorage中的token密钥
        //         localStorage.removeItem('token')
        //         // 然后在跳转页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function Authorization(res){
    // 获取用户名称
    var name = res.nickname || res.username
    // 将名字获取修改的值
    $('.login_text').html('欢迎:&nbsp;'+ name)
    // 判断是否有头像如果有就用头像照片如果没有就提取第一个字符作为头像显示
    if(res.user_pic !== null){ // 如果是空就说明没有头像，如果不是空说明有头像
        $('.layui-nav-img') // 有头像的话
            .attr('src',res.user_pic)
            .show()
        $('.content').hide() 
    }else{
        $('.layui-nav-img').hide() // 没头像的话
        var firs = name[0].toUpperCase() // 获取字符串第一个，然后转换为大写
        $('.content')
            .html(firs)
            .show()
    }
    
}
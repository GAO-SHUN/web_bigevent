// 每次调用 $.get() 或 $.post() 或 $.ajax()的时候都会先调用 ajaxPrefilter 这个函数
// 这个函数中，可以拿到我们给Ajax提供的配置对象


$.ajaxPrefilter(function(option){
    // 真正的ajax请求地址之前都会到这里进行拼接，防止地址更换要批量修改情况
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url

    // 设置headers文件的识别
    // 为什么要加if因为执行option.headers需要是前面带/my/的才可以，这里用indexOf查看里面有没有/my/
    // 如果没有返回的是-1
    if(option.url.indexOf('/my/') !== -1){
        option.headers={
            Authorization:localStorage.getItem('token') || " "
        }
    }

    // 用来拦截没有账户或者没有key密钥时候强制关闭进入主界面的问题
    // 统一设置一个全局的complete回调函数进行统一的使用
    option.complete=function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
                    // 清除locaolStorage中的token密钥
                    localStorage.removeItem('token')
                    // 然后在跳转页面
                    location.href = '/login.html'
                }
    }

})
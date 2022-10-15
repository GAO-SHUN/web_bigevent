// 每次调用 $.get() 或 $.post() 或 $.ajax()的时候都会先调用 ajaxPrefilter 这个函数
// 这个函数中，可以拿到我们给Ajax提供的配置对象


$.ajaxPrefilter(function(option){
    // 真正的ajax请求地址之前都会到这里进行拼接，防止地址更换要批量修改情况
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
})
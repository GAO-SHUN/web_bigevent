$(function(){
    var form = layui.form

    form.verify({
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samePswd:function(value){
            if(value === $('[name=pasWd]').val()){
                return '新旧密码不能相同'
            }
        },
        WordPad:function(value){
            if(value !== $('[name=Wd]').val()){
                return '两次密码不一致'
            }
        }
         
    })

    // 提交密码的功能
  $('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data:$(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return console.log(res.success)
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})

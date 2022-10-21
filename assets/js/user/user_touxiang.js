$(function(){
   
 var layer = layui.layer
 
 // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

// 图片选择按钮
$('#btnFile').on('click',function(){
  $('#file').click()
})

// 文件上传模块
$('#file').on('change',function(e){
  var targrt = e.target.files
  if(targrt.length === 0){
    return layer.msg('没有选中图片')
  }
  // 1.拿到用户选择的文件
  var file = e.target.files[0]
  // 2.选择文件创建一个对应的URL地址
  var newURL = URL.createObjectURL(file)
  // 3.先销毁旧的裁剪区域,在重新设置图片路径,之后在创建新的裁剪区域
  $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src',newURL) // 重新设置图片路径
      .cropper(options)   // 重新初始化裁剪区域
})


// 更新头像
$('#btnYes').on('click',function(){
    // 拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas',{
        // 创建一个Canvas画布
        width:100,
        height:100,
      })
      // 将Canvas画布上的内容，转化为base64格式的字符串
      .toDataURL('image/png')

      $.ajax({
        method:'post',
        url:'/my/update/avatar',
        data:{
          avatar:dataURL
        },
        success:function(res){
          if(res.status !== 0){
            return layer.msg('头像上传失败')
          }
          layer.msg('上传成功')
        }
      })
      
})


})
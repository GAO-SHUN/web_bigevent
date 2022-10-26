$(function () {
    var layer = layui.layer
    var form = layui.form

    // 调用自定义函数
    addZhonglei()
    initEditor()

    function addZhonglei() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取类别失败')
                }

                layer.msg('获取成功')
                var Html = template('tpl-catte', res)
                $('[name=cate_id]').html(Html)

                // !!!!重要，如何获取不到一定要试一下form.render()在刷新一次
                form.render()
            }
        })
    }


    // 参见区域的js
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#fengmian').on('click', function () {
        $('#file_demo').click()
    })



    // 为按钮添加一个change事件
    $('#file_demo').on('change', function (e) {
        // 获取e.targett中的files信息进行判断是否有东西传入
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('用户没有选择图片')
        }
        // 根据文件创建对应的url地址            
        var newImgURL = URL.createObjectURL(files[0])

        // 重新为裁剪区域设置图片
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })



    // 文章状态的按钮
    var FormSever = '已发布' // 设置默认状态

    $('#btn_Bsever').on('click', function () {
        FormSever = '草稿'  // 如果点击了就更改状态为草稿
    })



    // 监听表单from的变化
    $("#Form_data").on('submit', function (e) {
        // 阻止默认表单
        e.preventDefault()

        // 获取form表单数据
        // 转换dom对象
        var fd = new FormData($(this)[0])

        //    将文章发布状态添加到里面
        fd.append('state', FormSever)

        // //   循环表单查看是否可以获取数据用的
        //    fd.forEach(function(v,k){
        //     console.log(k,v)
        //    })


        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                // 5.将文件对象存储到fd中，名字要根据给的后端文档写不能瞎写
                fd.append('cover_img', blob)
                

                // 调用发布方法
                publicForm(fd)

                // 6.发起ajax请求
                function publicForm(fd) {
                    $.ajax({
                        method: "post",
                        url: '/my/article/add',
                        data: fd,
                        // 如果是传FormData格式的数据就必须要添加下面两个配置
                        contentType: false,
                        processData: false,
                        
                        success: function (res) {
                            console.log('res:', res)
                            if (res.status !== 0) {
                                return layer.msg('发布文章失败')
                            }
                            layer.msg('发布文章成功')
                            // 如果成功则跳转到文章界面
                            location.href = '/artcate/art_list.html'
                        }

                    })
                }


            })

    })



})
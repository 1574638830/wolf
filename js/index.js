$(function(){
    // 监听游戏规则按钮
    $(".rules").click(function(){
        // 显示游戏规则
        $(".rule").css("display","block");
    })

    // 监听游戏规则中关闭按钮
    $(".rule>a").click(function(){
        // 关闭游戏规则
        $(".rule").css("display","none");
        // 取消事件机制
        return false;
    })

    // 监听开始游戏按钮
    $(".start").click(function(){
        // 关闭开始按钮
        $(this).stop().fadeOut(100);
        // 进度条函数
        proGress();
        // 游戏内容，灰太狼函数
        startWolfAnimation();
    });

    // 监听重新开始按钮
    $(".mask>button").click(function(){
        // 关闭重新开始界面
        $(".mask").css("display","none");
        // 进度条函数
        proGress()
        // 重新开启灰太狼函数
        startWolfAnimation();
    })

    // 游戏开始，进度条函数
    function proGress(){
        // 重新设置进度条宽度
        $(".progress").width("180px");
        // 定时器，每秒减一
        var timer = setInterval(function(){
             // 获取进度条宽度
            var $proGressWidth = $(".progress").width();
            $proGressWidth -= 2;
            // 将新宽度重新赋值给进度条
            $(".progress").css("width",$proGressWidth);
            // 监听进度条是否走完
            if($proGressWidth <= 0){
                // 关闭定时器
                clearInterval(timer);
                // 关闭灰太狼函数
                stopWolfAnimation();
                // 显示重新开始界面
                $(".mask").stop().fadeIn(100);
            }
        },100)
    }

    // 定义一个定时器
    var timeImg;
    // 游戏开始，开始灰太狼动画函数
    function startWolfAnimation(){
        // 数组，保存灰太狼和小灰灰图片
        var wolf_1 = ['images/h0.png','images/h1.png','images/h2.png','images/h3.png','images/h4.png','images/h5.png','images/h6.png','images/h7.png','images/h8.png','images/h9.png'];
        var wolf_2 = ['images/x0.png','images/x1.png','images/x2.png','images/x3.png','images/x4.png','images/x5.png','images/x6.png','images/x7.png','images/x8.png','images/x9.png'];
        // 数组，保存所有可能出现得位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //  保存一张图片
        window.$wolfImg = $("<img src='' class='wolfImage'>");
        // 设置随机数，随机出现位置
        var posIndex = arrPos[Math.round(Math.random() * 8)];
        // 设置小灰灰和灰太狼随机
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        // 设置定时器，灰太狼动画
        timeImg = setInterval(function(){
            wolfIndex ++ ;
            // 将图片转为动态
            $wolfImg.attr("src",wolfType[wolfIndex]);
            // 判断 如果图片执行到img5
            if(wolfIndex > wolfIndexEnd){
                // 删除图片
                $wolfImg.remove();
                // 清除定时器
                clearInterval(timeImg);
                // 重新执行灰太狼函数
                startWolfAnimation()
            }
            console.log(wolfIndex);
        },300)
        // 设置图片位置
        $wolfImg.css({
            position:"absolute",
            left:posIndex.left,
            top:posIndex.top,
        })
        // 将内容上传到页面上
        $(".container").append($wolfImg);
        // 调用图片点击方法
        gameRules($wolfImg);
    }

    // 图片点击获取$wolfImg变量
    function gameRules($wolfImg){
        $wolfImg.one("click",function(){
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            // 获取图片src属性节点
            var $src = $(this).attr("src");
            // 获取src中是否又h
            var flag = $src.indexOf("h") >= 0;
            // 判断是否为灰太狼或小灰灰
            if(flag){
                // 灰太狼+10
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                // 小灰灰-10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        })
    }

    // 游戏结束，关闭灰太狼动画函数
    function stopWolfAnimation(){
        // 删除灰太狼函数
        $(".wolfImage").remove();
        // 清除定时器
        clearInterval(timeImg);
    }

    
})
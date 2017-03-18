(function () {
//下拉一屏导航变白色
    ~function () {
        var body=document.body||document.documentElement;
        var header = document.getElementById('header');
        var oNav = header.getElementsByTagName('nav')[0];
        var oA=document.getElementById('logCon');
        var oUl =oNav.getElementsByTagName('ul')[0];
        var aA=oUl.getElementsByTagName('a');
        var n = -1;
        window.onscroll = computedDisplay;
        function computedDisplay() {
            if(body.clientWidth>480){
                if (utils.win('scrollTop') > utils.win('clientHeight')) {//如果滚动距离>一屏
                    oNav.style.background = '#FFF';
                    oNav.style.boxShadow='rgb(204, 204, 204) 0px 1px 6px 0px';
                    for(var i=0;i<aA.length;i++){
                        aA[i].style.color='#999';
                    }
                    oA.style.background='url("images/yunoslog.png") no-repeat';
                } else {
                    for(var i=0;i<aA.length;i++){
                        aA[i].style.color='#FFF';
                    }
                    oNav.style.background = 'rgba(0,0,0,0.4)';
                    oA.style.background='url("images/logo1.png") no-repeat';
                    oNav.style.boxShadow='';
                }
            }
        }
    }();
//响应式头部导航
    ~function () {
        var navRender=(function(){
                var $navCon=$('.navCon'),
                    $menu=$navCon.children('.g-nav-entry'),
                    $ul=$('.ul');
                var isBlock=false;
                return {
                    init:function(){
                        $menu.click(function(){
                            if(!isBlock){
                                isBlock=true;
                                $ul.css({
                                    width:'100%',
                                    height:'440px',
                                    display:'block',
                                });
                                return;
                            }
                            isBlock=false;
                            $ul.css({
                                height:'0'
                            });
                        });
                    }
                }
            })();
        navRender.init();
    }();
//主页轮播图
    ~function () {
        var header = document.getElementById('header');
        var banner =header.getElementsByTagName('div')[1];
        var aDiv=banner.getElementsByTagName('div');
        var oUl=header.getElementsByTagName('ul')[1];
        var aLi=oUl.getElementsByTagName('li');
        var n=0;
        var timer=null;
        //4.图片渐隐渐现
        timer=setInterval(autoMove,3000);
        function autoMove(){
            if(n>=aDiv.length-1){
                n=-1;
            }
            n++;
            setBanner();
        }
        function setBanner(){
            //第几张图片的索引等于n，就让第几张图片的层级提高（让其他图片的层级为0）；让层级最高的这个图片透明度从0-1；（让他的兄弟元素透明度为0）；
            for(var i=0; i<aDiv.length; i++){
                if(i==n){//要显示的图片
                    utils.css(aDiv[i],'zIndex',1);
                    animate({
                        id:aDiv[i],
                        target:{
                            opacity:1
                        },
                        callback:function(){
                            var siblings=utils.siblings(this);//aDiv[i]
                            for(var i=0; i<siblings.length; i++){
                                utils.css(siblings[i],'opacity',0);
                            }
                        }
                    })
                }else{
                    utils.css(aDiv[i],'zIndex',0);
                }
                bannerTip();
            }
        }
        //5.焦点自动轮播
        function bannerTip(){
            for(var i=0; i<aLi.length; i++){
                aLi[i].className=i==n?'on':null;
            }
        }
        //6.鼠标移入停止，移出继续
        banner.onmouseover=function(){
            clearInterval(timer);
        };
        banner.onmouseout=function(){
            timer=setInterval(autoMove,3000);
        };
        //7.点击焦点手动切换
        handleChange();
        function handleChange(){
            for(var i=0; i<aLi.length; i++){
                (function(index){
                    aLi[index].onclick=function(){
                        n=index;
                        setBanner()
                    };
                })(i);
            }
        }
    }();
//导航轮播图
    ~function () {
        var travel = document.getElementById('travel');
        var tabBanner =travel.getElementsByTagName('div')[0];
        var aDiv=tabBanner.getElementsByTagName('div');
        var oUl=travel.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        var n=0;
        var timer=null;
        //4.图片渐隐渐现
        timer=setInterval(autoMove,2000);
        function autoMove(){
            if(n>=aDiv.length-1){
                n=-1;
            }
            n++;
            setBanner();
        }
        function setBanner(){
            //第几张图片的索引等于n，就让第几张图片的层级提高（让其他图片的层级为0）；让层级最高的这个图片透明度从0-1；（让他的兄弟元素透明度为0）；
            for(var i=0; i<aDiv.length; i++){
                if(i==n){//要显示的图片
                    utils.css(aDiv[i],'zIndex',1);
                    animate({
                        id:aDiv[i],
                        target:{
                            opacity:1
                        },
                        callback:function(){
                            var siblings=utils.siblings(this);//aDiv[i]
                            for(var i=0; i<siblings.length; i++){
                                utils.css(siblings[i],'opacity',0);
                            }
                        }
                    })
                }else{
                    utils.css(aDiv[i],'zIndex',0);
                }
                bannerTip();
            }
        }
        //5.焦点自动轮播
        function bannerTip(){
            for(var i=0; i<aLi.length; i++){
                aLi[i].className=i==n?'show':null;
            }
        }
        //6.鼠标移入停止，移出继续
        travel.onmouseover=function(){
            clearInterval(timer);
        };
        travel.onmouseout=function(){
            timer=setInterval(autoMove,2000);
        };
        //7.点击焦点手动切换
        handleChange();
        function handleChange(){
            for(var i=0; i<aLi.length; i++){
                (function(index){
                    aLi[index].onclick=function(){
                        n=index;
                        setBanner()
                    };
                })(i);
            }
        }
    }();
//彩色点击
    ~function () {
        var oDiv = document.querySelector('#animete');
        var aDiv = oDiv.querySelectorAll('div');
        for(var i=0;i<aDiv.length;i++){
            aDiv[i].index=i;
            aDiv[i].onclick=function () {
                aDiv[this.index].className='shadow';
                /*    var timer=setTimeout(function () {
                 for(var j=0;j<aDiv.length;j++){
                 aDiv[Math.round(Math.random()*8)].className='shadow'
                 }
                 },1000);
                 var timer1=setTimeout(function () {
                 for(var a=0;a<aDiv.length;a++){
                 aDiv[a].className='';
                 }
                 },3000)*/
                aDiv[this.index].addEventListener('webkitTransitionEnd',function () {
                    aDiv[this.index].className='';
                    var timer=setTimeout(function () {
                        for(var j=0;j<aDiv.length;j++){
                            aDiv[Math.round(Math.random()*j)].className='shadow';
                        }
                    },300);
                    setTimeout(function () {
                        for(var j=0;j<aDiv.length;j++){
                            aDiv[j].className=' ';
                        }
                    },1200);

                })

            }
        }
    }();
//响应式末尾导航
    ~function () {
        var navFooter=(function(){
            var $footerMiddle=$('.footer_middle'),
                $dl=$footerMiddle.children('.dl'),
                $dl1=$footerMiddle.children('.dl1'),
                $dl2=$footerMiddle.children('.dl2'),
                $dl3=$footerMiddle.children('.dl3'),
                $dt=$dl.children('.dt'),
                $dt1=$dl1.children('.dt1'),
                $dt2=$dl2.children('.dt2'),
                $dt3=$dl3.children('.dt3'),
                $dd=$('dd.dd'),
                $dd1=$('dd.dd1'),
                $dd2=$('dd.dd2'),
                $dd3=$('dd.dd3'),
                timer = null;
            var isBlock=false;
            return {
                init:function(){
                    $dl.click(function(){
                        $dt.css({
                            backgroundColor:'#c8c8c8'
                        });
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            $dt.css({
                                backgroundColor:''
                            });
                        },100);
                        if(!isBlock){
                            isBlock=true;
                            $dl.css({
                                height:'auto'
                            });

                            $dd.css({
                                display:'block'
                            });
                            return;
                        }
                        isBlock=false;
                        $dl.css({
                            height:'50px'
                        });
                        $dd.css({
                            display:'none'
                        });
                    });
                    $dl1.click(function(){
                        $dt1.css({
                            backgroundColor:'#c8c8c8'
                        });
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            $dt1.css({
                                backgroundColor:''
                            });
                        },100);
                        if(!isBlock){
                            isBlock=true;
                            $dl1.css({
                                height:'auto'
                            });
                            $dd1.css({
                                display:'block'
                            });
                            return;
                        }
                        isBlock=false;
                        $dl1.css({
                            height:'50px'
                        });
                        $dd1.css({
                            display:'none'
                        });
                    });
                    $dl2.click(function(){
                        $dt2.css({
                            backgroundColor:'#c8c8c8'
                        });
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            $dt2.css({
                                backgroundColor:''
                            });
                        },100);
                        if(!isBlock){
                            isBlock=true;
                            $dl2.css({
                                height:'auto'
                            });
                            $dd2.css({
                                display:'block'
                            });
                            return;
                        }
                        isBlock=false;
                        $dl2.css({
                            height:'50px'
                        });
                        $dd2.css({
                            display:'none'
                        });
                    });
                    $dl3.click(function(){
                        $dt3.css({
                            backgroundColor:'#c8c8c8'
                        });
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            $dt3.css({
                                backgroundColor:''
                            });
                        },100);
                        if(!isBlock){
                            isBlock=true;
                            $dl3.css({
                                height:'auto'
                            });
                            $dd3.css({
                                display:'block'
                            });
                            return;
                        }
                        isBlock=false;
                        $dl3.css({
                            height:'50px'
                        });
                        $dd3.css({
                            display:'none'
                        });
                    });
                }
            }
        })();
        navFooter.init();
    }();
})();
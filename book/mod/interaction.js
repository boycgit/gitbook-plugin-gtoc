/**[Public]
 * 定义目录的交互，诸如交互、快捷键
 * 
 */
define([
    "jQuery",
    "Mousetrap"
], function($, Mousetrap){
    // $toc的一些交互
    var init = function($toc) {
        // 定义快捷键t，收缩/展现目录
        Mousetrap.bind(['t'], function(e) {
            $toc.toggleClass("state-min");
            return false;
        });

        // 定义快捷键h，显示/隐藏目录
        Mousetrap.bind(['h'], function(e) {
            $toc.toggleClass("state-hide");
            return false;
        });

        // 点击shrink按钮，改变状态
        $toc.find(".j-toggle-menu").on("click",function(){
            $toc.toggleClass("state-min");
        });

        // hover的时候更改名字
        $toc.find(".gtoc-menu-min .word").mouseenter(function(){
            $(this).parent().addClass("state-hover");
        }).mouseleave(function(){
            $(this).parent().removeClass("state-hover");
        });

    };

    return {
        init: init
    };
});
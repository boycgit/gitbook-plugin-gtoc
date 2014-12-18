require(["gitbook"], function(gitbook) {

    var archTOC = function(config){
        var $ibook = gitbook.state.$book;

        // 存储每个条目到顶部的距离值
        var topValueSet = [];

        // 默认抽取h2,h3标题
        // 定义toc字符串，方便后面的拼接
        var toc = "<nav role='navigation' class='gitbook-table-of-contents'>" +
                  "<div class='gtoc-menu'>"+      
                  "<h2>目录</h2>";


        // 遍历文章的标题
        var $page = $ibook.find(".page-inner .normal");

        var titleLevel = {"l1":0,"l2":0,"order":""};

        // 根据tagName更新序号，被addSubTitle所调用
        var updateLevel = function(name,level){
                if(name === "h2"){
                    level.l1 += 1;
                    level.l2 = 1;
                    level.order = level.l1;
                }else{
                    level.order = "" + level.l1 + "." +level.l2;
                    level.l2 += 1;
                }
                return level;
            };

        var addSubTitle = function(el){
             var newLine, title, nId; // 获取标题所需要的内容和连接

                title = el.text();

                // 使用jQuery的guid保证唯一
                nId = "gtoc-title-" + ($.guid++);//创建新的hrefID
                el.attr("id",nId);// 重新给节点赋值Id
                el.addClass("gtoc-header");
                topValueSet.push(el.offset().top);// 将该条目到顶部的距离获取过来

                name = el[0].tagName.toLowerCase();

                // 根据tagName更新titleLevel
                titleLevel = updateLevel(name,titleLevel);

                // 每一行链接的字符串，使用tagName创建层级类名
                newLine =
                      "<a href='#" + nId + "' class='gtoc-level gtoc-level-"+name+"'>" +
                      "<i class='levelNum'>"+titleLevel.order+"、</i>" + 
                        title +
                      "</a>";

                return newLine;
        }

        // 只有当第一层级不为空时候才出现toc
        // var newLine, el, title, link; // 获取标题所需要的内容和连接
        var titleStr,el;
        $page.find("h2,h3").each(function(){

            el = $(this);

            titleStr = addSubTitle(el); 

            toc += titleStr;

        });

        // 拼接完整的toc
        toc +=
            "</div>"+
                "<div class='gtoc-menu-min'>"+
                "<a href='javascript:void(0)' target='_self' class='icon icon-top'></a>"+
                "<a href='javascript:void(0)' target='_self' class='icon icon-toggle'>TOC</a>"+
            "</div>"
          "</nav>";

        // 创建gtoc
        // 最后塞到目标容器里
        var $toc = $(toc);
        // 将TOC绑定到文章里面
        $ibook.find(".book-body").append($toc);


        // 点击shrink按钮，改变状态
        $toc.find(".icon-toggle").on("click",function(){
            $toc.toggleClass("state-min");
        });
    };


    // 创建目录
    var init = function() {
        var config = {};
        archTOC(config);

    };

    // 当刷新页面的时候，重新创建目录
    gitbook.events.bind("page.change", function() {
        init();
    });
});
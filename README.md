GitBook Table Of Content Plugin
==============

为GitBook生成目录结构，效果如下：

![gtoc效果图](https://lh6.googleusercontent.com/-jsqrsB5Pu1o/VJLHr7s0J2I/AAAAAAAACNw/f3jcM5F4aVc/s800/gtoc%25E6%2588%25AA%25E5%259B%25BE.png)



### 使用方式
在`book.json`中添加如下配置：
{
    "plugins": ["gtoc"]
}

然后运行`gitbook install`即可。



### TODO
 - 添加“回到顶部”
 - 添加滚动高显功能
 - 配置：
     + 抽取层级
     + 放在左边还是右边
     + 跟随还是放在开头（跟随的时候可以折叠，包含“回到顶部”按钮）
 - 绑定快捷键't'，用于toggle显示/隐藏


### 修改记录

**2014.12.18**
 - 使用$.guid给不同的标题赋Id
 - 使用tagName给不同层级标题赋值类名
 - 添加动画效果
function layerOpen(e){var t={type:1,title:['<img src="imgs/'+e.imgUrl+'" style="margin-right:10px"/>'+e.title,"color:#fff;background:#ff514e;text-align:center;height:48px"],area:["570px","340px"],content:e.content,time:e.time,move:!1,zIndex:1e12};layer.open(t)}function timer(e){clearInterval(e.timer);var t=e.time;e.timer=setInterval(function(){--t<=0&&(clearInterval(e.timer),t=e.time,".yanzhang-timer"==e.dom&&$(e.dom).parent().css("background","#ff514e"),e.fn&&e.fn()),$(e.dom).text(t+e.content)},1e3)}var pathConfig={rootPath:"http://192.168.32.10:8020/src/",cardListPath:"json/bank-list.json"},dataConfig={cardType:0,binCard:!0};$(function(){function e(){$(this).hasClass("on_check")?$(this).removeClass("on_check"):$(this).addClass("on_check").siblings().removeClass("on_check")}switch($("a").focus(function(){$(this).blur()}),$("#tab>li").on("click",function(){var e=$(this).index();$(this).addClass("active").siblings().removeClass("active"),$(".sublist").eq(e).css("display","block").siblings().css("display","none")}),dataConfig.cardType){case 1:$(".storage-card").hide(),$(".credit-card").show();break;default:$(".storage-card").show(),$(".credit-card").hide()}timer({time:119,content:"秒",dom:".erwei-timer"}),$(".pay-next").on("click",function(){location.href="quick_save.html"}),$(".check-card").on("click",function(){location.href="quick_select.html"}),$(".loadMore").on("click",function(){alert("加载更多银行列表")}),$(".pay-btn").on("click",function(){$.get("layer_wait.html",function(e){layerOpen({title:"提示",imgUrl:"icon_tip.png",content:e,time:!1})},"html")}),$("#payment").bind("click",function(){$.get("layer_yanzhanma.html",function(e){layerOpen({title:"请输入短信验证码",imgUrl:"icon_code.png",content:e,time:!1})},"html")}),$(".add-btn").on("click",function(){location.href="index.html"}),$(".select-card").bind("click",e),$("#selmsg").bind("click",e),$(".check-quota").click(function(e){$(".icon",this).hasClass("icon-down")?$(".icon",this).removeClass("icon-down").addClass("icon-up"):$(".icon",this).removeClass("icon-up").addClass("icon-down"),$("table").toggle(),$(document).one("click",function(){$("table").hide()}),e.stopPropagation()}),$("table").on("click",function(e){e.stopPropagation()});$("#bank-id").on("keyup mouseout input",function(){var e=$(this),t=e.val();/\S{5}/.test(t)&&e.val(t.replace(/[^0-9]/g,"").replace(/(.{4})/g,"$1 "))});var t=$("#bank-id:disabled").val()?$("#bank-id:disabled").val():null;t&&$("#bank-id:disabled").val(t.replace(/[^0-9]/g,"").replace(/(.{4})/g,"$1 ")),$(".tabList  a").on("click",function(){$(this).hasClass("selected")?$(this).removeClass("selected"):$(this).addClass("selected").siblings().removeClass("selected")}),$("#tradeDetail-btn").on("click",function(){$(".icon",this).hasClass("icon-down")?$(".icon",this).removeClass("icon-down").addClass("icon-up"):$(".icon",this).removeClass("icon-up").addClass("icon-down"),$(".tradeDetail-con").toggle()})});
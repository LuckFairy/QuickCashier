/**
 * 配置文件
 * data.config.js
 * @authors liailian 
 * @date    2017-05-17 15:30:46
 * @version $1.0.0$
 */

/**
 * params：
 * pathConfig：路径配置
 * rootPath：请求根路径
 **/

var pathConfig = {
	// 生产环境
	//	'rootPath' : 'http://119.147.172.215:8088/BMS/',
	// 测试环境
	'rootPath': 'http://192.168.32.10:8020/src/',
	'cardListPath': 'json/bank-list.json'
};
/*
 *dataConfig :全局参数配置
 * cardType:卡类型,0储蓄卡，1信用卡
 * binCard:false，是否绑定银行卡，默认未绑定，true是绑定
 * */
var dataConfig = {
	'cardType': 1,
	'binCard': true,
}
//跳窗
function layerOpen(data) {
	//
	var layerOpts = {
		'type': 1,
		'title': ['<img src="imgs/' + data.imgUrl + '" style="margin-right:10px"/>' + data.title, 'color:#fff;background:#ff514e;text-align:center;height:48px;line-height:48px;'],
		'area': ['570px', '340px'],
		'content': data.content,
		'time': data.time,
		//	'id':data.id,
		'move': false,
		'zIndex': 1000000000000,
		//		'scrollbar':false,
	};
	layer.open(layerOpts);
	
}
//定时器
function timer(html) {
	clearInterval(html.timer);
	var i = html.time;
	html.timer = setInterval(function() {
		i--;
		if(i <= 0) {
			clearInterval(html.timer);
			i = html.time;
			if(html.dom == '.yanzhang-timer') {
				$(html.dom).parent().css('background', '#ff514e');
			}
			if(html.fn) {
				html.fn();
			}
		}else{
			if(html.dom == '.yanzhang-timer') {
				$(html.dom).parent().css('background', '#ccc');
			}
		}
		$(html.dom).text(i + html.content);
	}, 1000);
}

$(function() {
	//解决a标签虚线问题
	$('a').focus(function() {
		$(this).blur();
	})
	//nav点击
	$('#tab>li').on('click', function() {
		var index = $(this).index();

		$(this).addClass('active').siblings().removeClass('active');
		$('.sublist').eq(index).css('display', 'block').siblings().css('display', 'none');
	})

	//判断存蓄还是信用卡
	switch(dataConfig.cardType) {
		case 1:
			$('.storage-card').hide();
			$('.credit-card').show();
			break;
		default:
			$('.storage-card').show();
			$('.credit-card').hide();
			break;
	}
	//支付宝和微信定时器
	timer({
		time: 119,
		content: '秒',
		dom: '.erwei-timer'
	})

	$('.pay-next').on('click', function() {
		location.href = 'quick_save.html';
	})
//	$('.check-card').on('click', function() {
//		location.href = 'quick_select.html'
//	})
	//点击更多银行按钮
	$('.loadMore').on('click', function() {
		alert('加载更多银行列表');
	})
	//点击网上银行支付
	$('.pay-btn').on('click', function() {
		var res = '<ul class="layer layer-wait"><li><i class="icon icon-loadmore"></i></li><li class="tip-close" >支付仍在后台处理中 请耐心等待</li><li class="tip-close" style="margin-bottom: 0;">请您在新打开的页面完成付款</li><li style="margin-top: 20px;"><a class="submit a_btn"  href="javascript:;" onclick="submit()">已完成支付</a></li><li style="margin-top: 20px;display: none;"><a class="submit a_btn"  href="javascript:;" onclick="layer.closeAll()">我知道了</a></li><li>支付完成前请不要关闭此窗口</li></ul>'
			var tipData = {
				'title': '提示',
				'imgUrl': 'icon_tip.png',
				'content': res,
				'time': false, //等待60s
			};
			//等待支付
			layerOpen(tipData);

	})
	//点击支付宝和微信跳窗提示
	function tip(){
		var res = '<ul class="layer layer-wait" style="padding: 0;padding-top: 14px;"><li><img src="imgs/not_opened.png" alt="" /></li><li>抱歉，暂未开通该支付方式</li><li><a class="close" onclick="layer.closeAll()">确定</a></li></ul>';
			var tipData = {
				'title': '提示',
				'imgUrl': 'icon_tip.png',
				'content': res,
				'time': false, //等待60s
			};
			//等待支付
			layerOpen(tipData);
	}
	$('#zhifubao').bind('click', function() {
		tip();

	})
	$('#weixin').bind('click', function() {
		tip();

	})
//	//点击同意协议并支付
//	$('#payment').bind('click', function() {
//		$.get('layer_yanzhanma.html', function(res) {
//			typeof res;
//			var tipData = {
//				'title': '请输入短信验证码',
//				'imgUrl': 'icon_code.png',
//				'content': res,
//				'time': false, //关闭时间
//			};
//			//获取验证码
//			layerOpen(tipData);
//		}, 'html')
//
//	})

	//点击添加银行
	$('.add-btn').on('click', function() {
		location.href = 'index.html';
	})
	//点击checkbox变色
	function select() {
		if($(this).hasClass('on_check')) {
			$(this).removeClass('on_check');
		} else {
			$(this).addClass('on_check').siblings().removeClass('on_check');
		}
	}
	
//	$('#selmsg').bind('click', select);

	//点击查看限额
	$('.check-quota').click(function(e) {
		if($('.icon', this).hasClass('icon-down')) {
			$('.icon', this).removeClass('icon-down').addClass('icon-up');
		} else {
			$('.icon', this).removeClass('icon-up').addClass('icon-down');
		}
		$('table',this).toggle();
		$(document).one("click", function(){
	       $('table').hide();
	    });
	    e.stopPropagation();
	});
	$('table').on("click", function(e){
	    e.stopPropagation();
	});

	//银行卡号输入格式处理
	$('#bank-id').on('keyup mouseout input', function() {
		var $this = $(this),
			v = $this.val();
		/\S{5}/.test(v) && $this.val(v.replace(/[^0-9]/g, '').replace(/(.{4})/g, "$1 "));
	});
	//银行卡格式
	var v = $('#bank-id:disabled').val() ? $('#bank-id:disabled').val() : null;
	if(v) {
		$('#bank-id:disabled').val(v.replace(/[^0-9]/g, '').replace(/(.{4})/g, "$1 "));
	}
	
	
	//点击tabList,选择银行
	window.checkA_flag ={flag:false};//是否选择了银行卡
	$('.tabList  a').on('click', function() {
		checkA_flag = {flag:true,txt:''};
		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			checkA_flag = {flag:false,txt:'请选择银行卡'};
		} else {
			$('body').find('.tabList a').removeClass('selected');
			$(this).addClass('selected');
		}
	})
	$('#tradeDetail-btn').on('click', function() {
		if($('.icon', this).hasClass('icon-down')) {
			$('.icon', this).removeClass('icon-down').addClass('icon-up');
		} else {
			$('.icon', this).removeClass('icon-up').addClass('icon-down');
		}
		$('.tradeDetail-con').toggle();
	})
});


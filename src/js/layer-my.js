	var flag= 0,$url=null;//1是失败，2是成功，0是未知状态
		switch(flag){
			case 1:$url = 'quick_fail.html';break;
			case 2:$url = 'quick_seccess.html';break;
			case 0:$url = {
				txt:'抱歉当前未收到银行或第三方平台的支付确认，为避免重复支付，请确认您的银行卡或平台账户是否已经扣款。',
				btn:'我知道了'
			};break;
			default:'quick_save.html';break;
		}
		function submit(){
			if(flag==0){
				document.querySelector('.layer').className ='layer layer-wait txt';
				var tip = document.querySelectorAll('.tip-close'),btn = document.querySelectorAll('.a_btn');
				tip[0].innerText  = $url.txt;
				tip[1].style.display = 'none';
				btn[0].parentNode.style.display = 'none';
				btn[1].parentNode.style.display = 'inline-block';
				btn[1].innerText = $url.btn;
			}else{
				location.href = $url;
			}
		}
		
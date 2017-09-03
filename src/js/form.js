//Luhm校验规则：16位银行卡号（19位通用）:

// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。

//方法步骤很清晰，易理解，需要在页面引用Jquery.js
//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件

function luhmCheck(bankno) {
    try {
        var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

        var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array();  //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9

        var arrOuShu = new Array();  //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {//奇数位
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;
		if(bankno.length<13){
			return {flag:false,txt:'卡号长度位数不足'}
		}
        else if (lastNum == luhm) {
            return {flag:true,txt:''};
        }
        else {
            return {flag:false,txt:'当前银行卡不支持'};
        }
    } catch (e) {
        return {flag:false,txt:'银行卡输入错误'};
    }
}
checkCard = function (card) {
    //是否为空
    if (card === '') {
        return {flag:false,txt:'身份证号不能为空'}
    }
    //校验长度，类型
    if (isCardNo(card) === false) {
        return {flag:false,txt:'身份证号码不正确'};
    }
    //检验位的检测
    if (checkParity(card) === false) {
        return {flag:false,txt:'身份证校验位不正确'};
    }
    return {flag:false,txt:''};
};
//检查号码是否符合规范，包括长度，类型
isCardNo = function (card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }

    return true;
};
//校验位的检测
checkParity = function (card) {
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
};
//15位转18位身份证号
changeFivteenToEighteen = function (card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};
function checkPhone(phoneNo) {
    if (phoneNo == null || phoneNo.length == 0) {
        return {flag:false,txt:'手机号码不能为空'};
    }
    if (!(/^1[34578]\d{9}$/.test(phoneNo))) {
        return {flag:false,txt:'手机号码不正确'};
    }
    return {flag:true,txt:''};
}

//cvn信用卡背后三位数
checkCvn = function(v){
	if(v == null || v.length == 0){
		return {flag:false,txt:'cvn不能为空'};
	}
	
	return {flag:true,txt:''};
}

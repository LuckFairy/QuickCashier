// 获取光标位置
function getCursortPosition(textDom) {
    var cursorPos = 0;
    if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    } else if (textDom.setSelectionRange) {
        // webkit support
        textDom.focus();
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}
// 设置光标位置
function setCaretPosition(textDom, pos) {
    if (textDom.setSelectionRange) {
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // IE Support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
/**
 * 账号输入时自动4位一空格
 */
$(function () {
    var isDelete = false;
    $("input[data-type='acc']").on("keyup", function (e) {
        var elem = this;
        //加timeout是为了处理安卓部分机型系统键盘无法录入的问题如vivo
        setTimeout(function(){
            var str = elem.value;
            var currentPos = getCursortPosition(elem);
            var posAfterText = "";
            var posPreText = "";
            var isNextBlank = false;//后面的是否是空格
            var isPreBlank = false;
            var isLastPos = true;
            if (currentPos != str.length) {//不是最后一个
                posAfterText = str.substr(currentPos, 1);
                posPreText = str.substr(currentPos - 1, 1);
                isNextBlank = /^\s+$/.test(posAfterText);
                isPreBlank = /^\s+$/.test(posPreText);
                isLastPos = false;
            }
            if(elem.value.length <= $(elem).attr("maxlength")){//最大长度控制
                elem.value = elem.value.replace(/\s/g, '').replace(/(\w{4})(?=\w)/g, "$1 ");
            }
            if (isDelete) {
                if (isPreBlank) {
                    setCaretPosition(elem, currentPos - 1);
                } else {
                    setCaretPosition(elem, currentPos);
                }
            } else {
                if (!isLastPos) {
                    if (isNextBlank) {
                        setCaretPosition(elem, currentPos + 1);
                    } else {
                        setCaretPosition(elem, currentPos);
                    }
                } else {
                    setCaretPosition(elem, elem.value.length);
                }
            }
        },0);
    });
    $("input[data-type='acc']").on("keydown", function (e) {
        //console.log("keyCode=" + window.event.keyCode);
        isDelete = window.event.keyCode == 8;//标记用户进行删除操作
    });

})
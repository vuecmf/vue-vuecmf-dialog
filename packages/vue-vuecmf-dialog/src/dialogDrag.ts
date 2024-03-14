
function updateDlgBodyHeight(el){
    const dlgDom = el.querySelector('.el-dialog')
    const dlg_header = el.querySelector('.el-dialog__header')
    const dlg_body = el.querySelector('.el-dialog__body')
    const dlg_footer = el.querySelector('.el-dialog__footer')

    dlg_body.style.height = (dlgDom.clientHeight - dlg_header.clientHeight - dlg_footer.clientHeight - 24) + 'px'
}

export default {
    bind(el, binding, vnode, oldVnode) {
        //弹框可拉伸最小宽高
        let minWidth = 180;
        let minHeight = 80;

        const dlgDom = el.querySelector('.el-dialog');

        //左上角,鼠标拉伸弹窗
        let dragTl = dlgDom.querySelector('.drag_tl')
        dragTl.onmousedown = (e) => {
            let clientX = e.clientX;
            let clientY = e.clientY;
            let dlgW = dlgDom.clientWidth;
            let dlgH = dlgDom.clientHeight;
            let dlgOffsetLeft = dlgDom.offsetLeft;
            let dlgOffsetTop = dlgDom.offsetTop;

            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                dlgDom.style.marginLeft = dlgOffsetLeft - (clientX - e.clientX) + 'px';
                dlgDom.style.marginTop = dlgOffsetTop - (clientY - e.clientY) + 'px';
                if(dlgW + (clientX - e.clientX) > minWidth){
                    dlgDom.style.width = dlgW + (clientX - e.clientX) + 'px';
                }
                if(dlgH + (clientY - e.clientY) > minHeight){
                    dlgDom.style.height = dlgH + (clientY - e.clientY) + 'px';
                }
                updateDlgBodyHeight(el)
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //右上角,鼠标拉伸弹窗
        let dragTr = dlgDom.querySelector('.drag_tr')
        dragTr.onmousedown = (e) => {
            let clientX = e.clientX;
            let clientY = e.clientY;
            let dlgW = dlgDom.clientWidth;
            let dlgH = dlgDom.clientHeight;
            let dlgOffsetLeft = dlgDom.offsetLeft;
            let dlgOffsetTop = dlgDom.offsetTop;

            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                dlgDom.style.marginLeft = dlgOffsetLeft + 'px';
                dlgDom.style.marginTop = dlgOffsetTop - (clientY - e.clientY) + 'px';
                if(dlgW + (e.clientX - clientX) > minWidth){
                    dlgDom.style.width = dlgW + (e.clientX - clientX) + 'px';
                }
                if(dlgH + (clientY - e.clientY) > minHeight){
                    dlgDom.style.height = dlgH + (clientY - e.clientY) + 'px';
                }
                updateDlgBodyHeight(el)
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //右下角,鼠标拉伸弹窗
        let dragBr = dlgDom.querySelector('.drag_br')
        dragBr.onmousedown = (e) => {
            let clientX = e.clientX;
            let clientY = e.clientY;
            let dlgW = dlgDom.clientWidth;
            let dlgH = dlgDom.clientHeight;
            let dlgOffsetLeft = dlgDom.offsetLeft;

            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                dlgDom.style.marginLeft = dlgOffsetLeft + 'px';
                if(dlgW + (e.clientX - clientX) > minWidth){
                    dlgDom.style.width = dlgW + (e.clientX - clientX) + 'px';
                }
                if(dlgH + (e.clientY - clientY) > minHeight){
                    dlgDom.style.height = dlgH + (e.clientY - clientY) + 'px';
                }
                updateDlgBodyHeight(el)
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //左下角,鼠标拉伸弹窗
        let dragBl = dlgDom.querySelector('.drag_bl')
        dragBl.onmousedown = (e) => {
            let clientX = e.clientX;
            let clientY = e.clientY;
            let dlgW = dlgDom.clientWidth;
            let dlgH = dlgDom.clientHeight;
            let dlgOffsetLeft = dlgDom.offsetLeft;

            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                dlgDom.style.marginLeft = dlgOffsetLeft - (clientX - e.clientX) + 'px';
                if(dlgW + (clientX - e.clientX) > minWidth){
                    dlgDom.style.width = dlgW + (clientX - e.clientX) + 'px';
                }
                if(dlgH + (e.clientY - clientY) > minHeight){
                    dlgDom.style.height = dlgH + (e.clientY - clientY) + 'px';
                }
                updateDlgBodyHeight(el)
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //右边, 鼠标拉伸弹窗
        let dragR = dlgDom.querySelector('.drag_r')
        dragR.onmousedown = (e) => {
            let dlgW = dlgDom.clientWidth;
            let dlgOffsetLeft = dlgDom.offsetLeft;
            let clientX = e.clientX;
            document.onmousemove = function (e) {
                e.preventDefault(); // 禁用默认事件
                if(dlgW + (e.clientX - clientX) > minWidth){
                    dlgDom.style.marginLeft = dlgOffsetLeft + 'px';
                    dlgDom.style.width = dlgW + (e.clientX - clientX) + 'px';
                }
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //左边, 鼠标拉伸弹窗
        let dragL = dlgDom.querySelector('.drag_l')
        dragL.onmousedown = (e) => {
            let dlgW = dlgDom.clientWidth;
            let dlgOffsetLeft = dlgDom.offsetLeft;
            // 记录初始x位置
            let clientX = e.clientX;
            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                if(dlgW + (clientX - e.clientX) > minWidth){
                    dlgDom.style.width = dlgW + (clientX - e.clientX) + 'px';
                    dlgDom.style.marginLeft = dlgOffsetLeft - (clientX - e.clientX) + 'px';
                }
                binding.value() //调用initDlg
            };
            //拉伸结束
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //顶部， 鼠标拉伸弹窗
        let dragT = dlgDom.querySelector('.drag_t')
        dragT.onmousedown = (e) => {
            let clientY = e.clientY;
            let dlgH = dlgDom.clientHeight;
            let dlgOffsetTop = dlgDom.offsetTop;
            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                if(dlgH + (clientY - e.clientY) > minHeight){
                    dlgDom.style.height = dlgH + (clientY - e.clientY) + 'px';
                    dlgDom.style.marginTop = dlgOffsetTop - (clientY - e.clientY) + 'px';
                }
                updateDlgBodyHeight(el)
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }

        //底部， 鼠标拉伸弹窗
        let dragB = dlgDom.querySelector('.drag_b')
        dragB.onmousedown = (e) => {
            let clientY = e.clientY;
            let dlgH = dlgDom.clientHeight;
            document.onmousemove = function (e) {
                e.preventDefault(); //禁用默认事件
                if(dlgH - (clientY - e.clientY) > minHeight ){
                    dlgDom.style.height = dlgH + (e.clientY - clientY) + 'px';
                }
                updateDlgBodyHeight(el)
                binding.value() //调用initDlg
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
}

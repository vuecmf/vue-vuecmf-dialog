<template>
  <div ref="vuecmf_dlg_ref" v-drag="initDlg">
    <el-dialog  destroy-on-close :center="center" :modal="show_modal" :show-close="false" :close-on-press-escape="close_on_press_escape" :close-on-click-modal="close_on_click_modal" :class="custom_class" :fullscreen="fullscreen" :draggable="true" overflow  :width="width" :top="top" :append-to-body="append_to_body"  :model-value="dialogVisible"  @close="close"  @closed="closed" @opened="opened" @open="open">
      <template #header>
        <div class="vuecmf_dlg_header">
          <div v-html="title" class="vuecmf_dlg_title"></div>
          <div class="btn-group">
            <el-button class="el-dialog__headerbtn min_btn" title="最小化" @click="minScreen">—</el-button>
            <el-button class="el-dialog__headerbtn screen_btn" @click="toggleScreen">
              <el-icon title="最大化" v-if=" fullscreen === false "><full-screen /></el-icon>
              <el-icon title="还原" v-else><copy-document /></el-icon>
            </el-button>
            <el-button class="el-dialog__headerbtn close_btn" @click="closed" v-if="show_close">
              <el-icon title="关闭"><Close /></el-icon>
            </el-button>
          </div>
        </div>
      </template>

      <el-scrollbar ref="scrollbarRef">
        <slot name="content"></slot>
      </el-scrollbar>

      <template #footer>
        <slot name="footer" ></slot>
      </template>
      <div class="drag_br"></div>
      <div class="drag_bl"></div>
      <div class="drag_tl"></div>
      <div class="drag_tr"></div>
      <div class="drag_r"></div>
      <div class="drag_l"></div>
      <div class="drag_b"></div>
      <div class="drag_t"></div>
    </el-dialog>
  </div>

</template>

<script lang="ts" >
import {computed, defineComponent, ref, toRefs,} from 'vue'
import drag from './dialogDrag'
//引入element-plus图标
import {
  FullScreen,
  CopyDocument,
  Close
} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'vuecmf-dialog',
  components: {
    FullScreen, CopyDocument, Close
  },
  emits:['updateVisible', 'close', 'closed', 'toggleScreen', 'opened', 'open'],
  props: {
    //对话框标题
    title: {
      type: String,
      default: '',
    },
    //是否全屏显示
    max_screen: {
      type: Boolean,
      default: false
    },
    //对话框的ref
    dlg_ref: {
      type: String,
      default: ''
    },
    //对话框宽度
    width: {
      type: String,
      default: '50%'
    },
    //对话框顶部相对于窗口的偏移距离
    top: {
      type: String,
      default: '15vh'
    },
    //是否显示对话框
    model_value: {
      type: Boolean,
      default: false
    },
    //Dialog 的自定义类名
    custom_class: {
      type: String,
      default: ''
    },
    //是否可以通过点击 modal 关闭 Dialog
    close_on_click_modal: {
      type: Boolean,
      default: false
    },
    //是否可以通过按下 ESC 关闭 Dialog
    close_on_press_escape: {
      type: Boolean,
      default: true
    },
    //是否显示关闭按钮
    show_close: {
      type: Boolean,
      default: true
    },
    //是否让 Dialog 的 header 和 footer 部分居中排列
    center: {
      type: Boolean,
      default: false
    },
    //每次打开弹窗都滚动到头部位置
    scroll_top:{
      type: Boolean,
      default: true
    },
    //是否显示遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    //Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true
    append_to_body: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx){
    const vuecmf_dlg_ref = ref()
    const scrollbarRef = ref()
    const dlg_width = ref()  //弹窗初始宽度
    const dlg_height = ref() //弹窗初始高度
    const dlg_margin_top = ref() //弹窗初始margin top
    const dlg_margin_left = ref() //弹窗初始margin left
    const show_modal = ref()  //是否显示遮罩层

    //最大化与还原设置
    const fullscreen = ref()
    const { max_screen, model_value, scroll_top, modal } = toRefs(props)
    show_modal.value = modal.value

    //弹窗是否可见
    const dialogVisible = computed(()=> model_value.value)

    const open = ():void => {
      fullscreen.value = max_screen.value
      ctx.emit('open')
    }

    //弹窗打开后重置dialog body 高度
    const opened = () => {
      if(scroll_top.value) scrollbarRef.value.setScrollTop(0)
      initDlg()
      ctx.emit('opened')
    }

    //弹窗关闭时的回调
    const close = ():void => {
      ctx.emit('close')
    }

    //弹窗关闭时，将父组件中重置为弹窗不显示
    const closed = ():void => {
      ctx.emit('updateVisible', false)
      ctx.emit('closed')
    }

    //最大化与还原操作事件
    const toggleScreen = ():void => {
      fullscreen.value = !fullscreen.value
      resizeDlg()
      setTimeout(() => {
        scrollbarRef.value.update()
        ctx.emit('toggleScreen', fullscreen.value)
      }, 100)
    }

    //初始化弹窗相关参数
    const initDlg = ():void => {
      //保存当前弹窗的 width、height、marginTop、marginLeft
      const dlg = vuecmf_dlg_ref.value.querySelector('.el-dialog')
      dlg_width.value = dlg.clientWidth
      dlg_height.value = dlg.clientHeight
      dlg_margin_top.value = dlg.offsetTop
      dlg_margin_left.value = dlg.offsetLeft
      scrollbarRef.value.update()
    }

    //最小化操作事件
    const minScreen = ():void => {
      const dlg = vuecmf_dlg_ref.value.querySelector('.el-dialog')
      const dlg_body = vuecmf_dlg_ref.value.querySelector('.el-dialog__body')
      const dlg_footer = vuecmf_dlg_ref.value.querySelector('.el-dialog__footer')

      dlg.style.left = 0
      dlg.style.top = 0
      dlg.style.margin = 0
      dlg.style.width = '180px'
      dlg.style.height = '40px'
      dlg.style.overflow = 'hidden'
      dlg.style.border = '1px solid #ccc'

      dlg_body.style.display = 'none'
      dlg_footer.style.display = 'none'
      vuecmf_dlg_ref.value.querySelector('.min_btn').style.display = 'none'
      vuecmf_dlg_ref.value.querySelector('.vuecmf_dlg_title').style.width = '70px'

      fullscreen.value = true

      const overlay_dlg = vuecmf_dlg_ref.value.querySelector('.el-overlay-dialog')
      overlay_dlg.style.width = '180px'
      overlay_dlg.style.height = '40px'
      overlay_dlg.style.overflow = 'hidden'
      overlay_dlg.parentNode.style.width = '180px'
      overlay_dlg.parentNode.style.height = '40px'
      overlay_dlg.style.top = 'auto'
      overlay_dlg.style.bottom = 0
      overlay_dlg.parentNode.style.top = 'auto'
      overlay_dlg.parentNode.style.bottom = 0
    }

    //设置对话框body高度
    const resizeDlg = ():void => {
      const dlg = vuecmf_dlg_ref.value.querySelector('.el-dialog')
      const dlg_header = vuecmf_dlg_ref.value.querySelector('.el-dialog__header')
      const dlg_body = vuecmf_dlg_ref.value.querySelector('.el-dialog__body')
      const dlg_footer = vuecmf_dlg_ref.value.querySelector('.el-dialog__footer')

      //双击头部事件
      dlg_header.ondblclick = (e) => {
        toggleScreen()
      }

      dlg.style.border = '0'
      dlg_body.style.display = 'block'
      dlg_footer.style.display = 'block'
      vuecmf_dlg_ref.value.querySelector('.min_btn').style.display = ''

      const overlay_dlg = vuecmf_dlg_ref.value.querySelector('.el-overlay-dialog')
      overlay_dlg.style.width = '100%'
      overlay_dlg.style.height = '100%'
      overlay_dlg.parentNode.style.width = '100%'
      overlay_dlg.parentNode.style.height = '100%'

      if(fullscreen.value == true){
        dlg.style.width = '100VW';
        dlg.style.height = '100VH';
        dlg.style.marginLeft = '0';
        dlg.style.marginTop = '0';
      }else{
        dlg.style.width = dlg_width.value + 'px';
        dlg.style.height = dlg_height.value + 'px';
        dlg.style.marginLeft = dlg_margin_left.value + 'px';
        dlg.style.marginTop = dlg_margin_top.value + 'px';
      }

      dlg_body.style.height = (dlg.clientHeight - dlg_header.clientHeight - dlg_footer.clientHeight - 24) + 'px'
    }

    return {
      vuecmf_dlg_ref,
      scrollbarRef,
      fullscreen,
      dialogVisible,
      show_modal,
      toggleScreen,
      minScreen,
      closed,
      close,
      open,
      opened,
      initDlg
    }
  },
  directives: {
    //在模板中启用v-drag
    drag: {
      updated(el, binding, vnode, prevVnode) {
        drag.bind(el, binding, vnode, prevVnode)
      },
    }
  }
});

</script>
<style lang="scss">
.el-dialog{
  padding: 9px 12px 15px !important;
}
.el-dialog__header{ padding-bottom: 12px !important;}
.el-dialog__body{
  padding: 0 !important;
  margin: 0 !important;
  overflow-y: auto;
}
.el-dialog__footer{ padding: 0 !important; }
</style>
<style lang="scss" scoped>
.vuecmf_dlg_header{
  padding: 0 !important;
  position: relative !important;
  margin-right: 0 !important;
  display: flex !important;
  justify-content: space-between;
}
.btn-group{
  width: 100px;
  display: flex;
  justify-content: flex-end;
}
.el-dialog__headerbtn{
  width: 22px !important;
  height: 22px !important;
  font-size: 24px !important;
  text-align: right !important;
}
.vuecmf_dlg_title{
  width: calc(100% - 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
}

.min_btn, .screen_btn, .close_btn {
  border: 0 !important;
  color: var(--el-color-info) !important;
  position: absolute;
  cursor: pointer;
  font-size: 18px !important;
}
.min_btn{
  right: 70px !important;
}
.screen_btn {
  right: 30px !important;
}
.close_btn {
  right: -4px !important;
  font-size: 24px !important;
}
.min_btn:hover, .screen_btn:hover, .close_btn:hover{
  color: var(--el-color-primary) !important;
  background: #fff !important;
}

.screen_btn:active, .screen_btn:link, .screen_btn:visited, .screen_btn:focus,
.close_btn:active, .close_btn:link, .close_btn:visited, .close_btn:focus{
  background: #fff !important;
  color: var(--el-color-info) !important;
}

.drag_br {cursor: se-resize; position: absolute; height: 10px; width: 10px; right: 0px; bottom: 0px; z-index: 99;}
.drag_bl {cursor: sw-resize; position: absolute; height: 10px; width: 10px; left: 0px; bottom: 0px; z-index: 99;}
.drag_tl {cursor: nw-resize; position: absolute; height: 10px; width: 10px; left: 0px; top: 0px; z-index: 99;}
.drag_tr {cursor: ne-resize; position: absolute; height: 10px; width: 10px; right: 0px; top: 0px; z-index: 99;}
.drag_r {cursor: w-resize; position: absolute; height: 100%; width: 10px; right: 0px; top: 0px;}
.drag_l {cursor: w-resize; position: absolute; height: 100%; width: 10px; left: 0px; top: 0px;}
.drag_b {cursor: n-resize; position: absolute; height: 10px; width: 100%; left: 0px; bottom: 0px;}
.drag_t {cursor: n-resize; position: absolute; height: 10px; width: 100%; left: 0px; top: 0px;}
</style>

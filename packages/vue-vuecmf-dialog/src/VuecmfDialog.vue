<template>
<div ref="vuecmf_dlg_ref">
  <el-dialog  :center="center" :modal="show_modal" :show-close="show_close" :close-on-press-escape="close_on_press_escape" :close-on-click-modal="close_on_click_modal" :custom-class="custom_class" :fullscreen="fullscreen" :draggable="true"  :width="width" :top="top" :append-to-body="append_to_body"  :model-value="dialogVisible"  @close="close"  @closed="dlgClosed" @opened="opened" @open="open">
    <template #title>
      <div v-html="title" class="vuecmf_dlg_title"></div>
      <div class="min_btn" title="最小化" @click="minScreen">—</div>
      <div class="screen_btn" @click="toggleScreen">
        <el-icon title="最大化" v-if=" fullscreen == false "><full-screen /></el-icon>
        <el-icon title="还原" v-else><copy-document /></el-icon>
      </div>
    </template>

    <el-scrollbar ref="scrollbarRef">
      <slot name="content"></slot>
    </el-scrollbar>

    <template #footer>
      <slot name="footer" ></slot>
    </template>
  </el-dialog>
</div>

</template>

<script lang="ts" >
import {computed, defineComponent, ref, toRefs} from 'vue'

//引入element-plus图标
import {
  FullScreen,
  CopyDocument,
} from '@element-plus/icons-vue'


export default defineComponent({
  name: 'vuecmf-dialog',
  components: {
    FullScreen, CopyDocument
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
    const is_min = ref(false) //弹窗是否为最小化
    const show_modal = ref()  //是否显示遮罩层

    //最大化与还原设置
    const fullscreen = ref()
    const { max_screen, model_value, scroll_top, modal } = toRefs(props)
    fullscreen.value = max_screen.value
    show_modal.value = modal.value

    //弹窗是否可见
    const dialogVisible = computed(() => model_value.value )

    //弹窗关闭时，将父组件中重置为弹窗不显示
    const dlgClosed = ():void => {
      ctx.emit('updateVisible', false)
      ctx.emit('closed')
    }

    const open = ():void => {
      ctx.emit('open')
    }

    //弹窗关闭时的回调
    const close = ():void => {
      ctx.emit('close')
    }

    //设置对话框body高度
    const setDlgHeight = ():void => {
      let dlg = vuecmf_dlg_ref.value.querySelector('.el-dialog')
      let dlg_header = vuecmf_dlg_ref.value.querySelector('.el-dialog__header')
      let dlg_body = vuecmf_dlg_ref.value.querySelector('.el-dialog__body')
      let dlg_footer = vuecmf_dlg_ref.value.querySelector('.el-dialog__footer')

      //若是先前是最小化时
      if(is_min.value){
        dlg.style.width = dlg_width.value
        dlg.style.height = dlg_height.value
        dlg_body.style.display = 'block'
        dlg_footer.style.display = 'block'
        vuecmf_dlg_ref.value.querySelector('.min_btn').style.display = 'block'
        vuecmf_dlg_ref.value.querySelector('.vuecmf_dlg_title').style.width = '90%'
      }

      dlg_body.style.height = (document.documentElement.clientHeight - dlg.offsetTop*2 - dlg_header.clientHeight - dlg_footer.clientHeight - 24) + 'px'

      is_min.value = false
      show_modal.value = true
    }

    //最大化与还原操作事件
    const toggleScreen = ():void => {
      fullscreen.value = !fullscreen.value
      setTimeout(() => {
        setDlgHeight()
        scrollbarRef.value.update()
        ctx.emit('toggleScreen', fullscreen.value)
      }, 100)
    }

    //最小化操作事件
    const minScreen = ():void => {
      let dlg = vuecmf_dlg_ref.value.querySelector('.el-dialog')
      let dlg_body = vuecmf_dlg_ref.value.querySelector('.el-dialog__body')
      let dlg_footer = vuecmf_dlg_ref.value.querySelector('.el-dialog__footer')

      //保存弹窗初始宽度及高度
      dlg_width.value = dlg.style.width
      dlg_height.value = dlg.style.height

      dlg.style.width = '150px'
      dlg.style.height = '40px'

      dlg_body.style.display = 'none'
      dlg_footer.style.display = 'none'
      vuecmf_dlg_ref.value.querySelector('.min_btn').style.display = 'none'
      vuecmf_dlg_ref.value.querySelector('.vuecmf_dlg_title').style.width = '70px'

      is_min.value = true
      show_modal.value = false
      fullscreen.value = true

      setTimeout(() => {
        vuecmf_dlg_ref.value.querySelector('.el-overlay-dialog').parentNode.style.zIndex = -999
      }, 100)

    }

    //弹窗打开后重置dialog body 高度
    const opened = () => {
      setDlgHeight()
      if(scroll_top) scrollbarRef.value.setScrollTop(0)
      ctx.emit('opened')
    }

    return {
      vuecmf_dlg_ref,
      scrollbarRef,
      fullscreen,
      dialogVisible,
      show_modal,
      toggleScreen,
      minScreen,
      dlgClosed,
      close,
      open,
      opened
    }

  }
});
</script>

<style lang="scss">
.el-dialog__header{
  padding: 10px 15px 0 !important;
  position: relative !important;;
}
.el-dialog__headerbtn{
  top: 10px !important;;
  right: 10px !important;;
  width: 22px !important;;
  height: 22px !important;;
}
.el-dialog__title{
  font-size: 15px !important;;
  line-height: 16px !important;;
}
.vuecmf_dlg_title{
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.min_btn, .screen_btn {
  color: var(--el-color-info);
  position: absolute;
  top: 12px;
  cursor: pointer;
  font-size: 13px;
  width: 22px;
  text-align: center;
  height: 18px;
}
.min_btn{
  right: 52px;
  font-size: 8px;
  line-height: 12px;
}
.screen_btn {
  right: 22px;
}
.min_btn:hover, .screen_btn:hover{
  color: var(--el-color-primary);
}

.el-dialog__body{
  padding: 0 15px  !important;
  margin: 12px 0 !important;
  overflow-y: auto;
}

</style>
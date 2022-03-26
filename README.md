# vue-vuecmf-dialog

> 基于vue3、Element Plus和TypeScript的弹窗组件，支持最大化、最小化、还原及弹窗主体内容自适应屏幕功能

- 示例演示： http://www.vuecmf.com

## 安装

``` bash
# yarn方式安装 vue-vuecmf-dialog
yarn add vue-vuecmf-dialog

# npm方式安装 vue-vuecmf-dialog
npm install vue-vuecmf-dialog
```

###1、先在项目中的main.ts 引入
```
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

/*导入组件*/
import VuecmfDialog from "vue-vuecmf-dialog"

createApp(App).use(VuecmfDialog).mount('#app')
```

## 模板中使用组件

```
<template>
  <h3>vuecmf-dialog demo</h3>

  <el-button size="default" type="primary" @click=" showDlg = true " >打开对话框</el-button>

  <vuecmf-dialog :model_value="showDlg" title="标题"  @updateVisible="updateVisible"  @close="close" @toggleScreen="toggleScreen">

    <template #content>
      <div> 这是一个可以最大化及还原的 对话框</div>
    </template>

    <template #footer>
      <el-button type="primary" @click=" showDlg = false ">关闭</el-button>
    </template>

  </vuecmf-dialog>


</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'App',
  setup(){
    const showDlg = ref()
    showDlg.value = false

    const updateVisible = (val:any) => {
      console.log('val=', val)
      showDlg.value = val
    }

    const close = ():void => {
       console.log('dialog closed!')
    }
    
    const toggleScreen = (is_max: boolean):void => {
       console.log('dialog is max:', is_max)
    }

    return {
     showDlg,
     updateVisible,
     close,
     toggleScreen
    }
  }
});
</script>

```
详细使用见 源码中 examples目录中示例

### 属性说明

title： 对话框标题，支持HTML内容

max_screen：是否全屏显示， 默认false

width: 对话框宽度, 默认50%

top：对话框顶部相对于窗口的偏移距离， 默认15vh

model_value：是否显示对话框， 默认false

custom_class: Dialog 的自定义类名

close_on_click_modal: 是否可以通过点击 modal 关闭 Dialog, 默认 false

close_on_press_escape: 是否可以通过按下 ESC 关闭 Dialog, 默认true

show_close: 是否显示关闭按钮, 默认true

scroll_top: 每次打开弹窗是否滚动到弹窗头部位置， 默认true

modal: 是否显示遮罩层, 默认 true

append_to_body: Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true,  默认false

### 事件说明

open: Dialog 打开时的回调

opened: Dialog 打开后的回调

close: Dialog 关闭的回调

closed: Dialog 关闭后的回调

updateVisible： 弹窗关闭时，重置为弹窗不显示

toggleScreen: 弹窗最大化及还原时的回调



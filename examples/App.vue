<template>
  <h3>vuecmf-dialog demo</h3>

  <el-button size="default" type="primary" @click=" showDlg = true " >打开对话框</el-button>

  <vuecmf-dialog :model_value="showDlg" title="标题"  @updateVisible="updateVisible"  @close="close" @toggleScreen="toggleScreen">

    <template #content>
      <div> 内容开始 </div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 这是一个可以最大化及还原的 对话框</div>
      <div> 内容结束</div>
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

    const updateVisible = () => {
      showDlg.value = false
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



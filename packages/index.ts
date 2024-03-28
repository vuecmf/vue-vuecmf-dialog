// +----------------------------------------------------------------------
// | Copyright (c) 2020~2024 http://www.vuecmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/emei8/vuecmf/blob/master/LICENSE )
// +----------------------------------------------------------------------
// | Author: emei8 <2278667823@qq.com>
// +----------------------------------------------------------------------

import VuecmfDialog from './vue-vuecmf-dialog'
import type { App } from 'vue'

// 存储组件列表
const components = [
  VuecmfDialog
]

/**
 * 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
 * @param app
 */
const install = (app: App):void => {
  components.forEach(component => {
    app.use(component.install)
  })
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}

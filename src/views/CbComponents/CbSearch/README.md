### 搜索框组件

#### 场景

- 列表页搜索，素材搜索等其他任何搜索场景
- 包含回车搜索，图标点击搜索，清空搜索
- 支持其他原生事件如focus，input，blur等



#### 设计说明

| 参数            | 说明                            | 类型    | 可选值 | 默认  | 备注     |
| --------------- | ------------------------------- | ------- | ------ | ----- | -------- |
| value / v-model | 绑定值                          | string  | ——     | ——    |          |
| prefix-icon     | 输入框头部图标                  | string  | ——     | ——    | icon图标 |
| suffix-icon     | 输入框尾部图标                  | string  | ——     | ——    | icon图标 |
| searchable      | 是否展示头部搜索图标/可点击搜索 | boolean |        | false |          |
| clearable       | 是否展示尾部清空图标/可点击清空 | boolean |        | false |          |



#### 内置事件

| 事件名称 | 说明                                          | 回调参数        |
| -------- | --------------------------------------------- | --------------- |
| search   | 点击图标搜索                                  | (value: string) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | (value: string) |
| input    | 在 Input 值改变时触发                         | (value: string) |
| focus    | 在 Input 获得焦点时触发                       | (event: Event)  |
| blur     | 在 Input 失去焦点时触发                       | (event: Event)  |
| enter    | 在 Input 回车时触发                           | (value: string) |



#### slot

| name   | 说明           |
| ------ | -------------- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |


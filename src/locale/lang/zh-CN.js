// 公共信息本地化
const common = {
  ok: '确认',
  cancel: '取消',
  save: '保存',
  submit: '提交',
  goback: '退回',
  reset: '重设',
  add: '新增',
  create: '创建',
  edit: '编辑',
  delete: '删除',
  destory: '销毁',
  restore: '恢复',
  reply: '回复',
  search: '搜索',
  more: '更多',
  detail: '明细',
  general: '常规',
  attachment: '附件'
}

// 系统级别的路由 本地化
const systemRouters = {
  home: '首页',
  error_logger_page: '错误日志'
}

// 菜单本地化
const menus = {

  menu: '菜单管理',
  menu_list: '菜单列表',

  module: '功能管理',
  module_group: '功能组',
  module_list: '功能点',

  filter: '数据权限',
  filter_condition: '数据条件',
  filter_position: '岗位数据权限',

  organization: '组织机构',
  organization_list: '机构管理',
  organization_position: '岗位管理',

  user: '用户管理',
  user_list: '用户管理',

  joinup: '接入管理',
  joinup_portal: '平台管理',
  joinup_auth: '接入授权',

  stting: '系统设置',
  dictionary: '字典管理',
  config: '配置管理'

}

export default {
  ...common,
  ...systemRouters,
  ...menus,

  // router local
  home: '首页',
  system: '系统管理',

  system_menu: '菜单管理',
  system_page: '页面管理',
  system_page_point: '功能点管理',
  system_role: '权限管理',

  system_department: '部门管理',
  system_department_position: '岗位管理',

  system_user: '用户管理',

  system_dictionary: '字典管理',
  system_config: '参数配置',

  // router local end

  // 数据记录属性面板 本地化 start
  prop_role_user: '授权用户',
  prop_role_item: '功能分配',
  prop_user_role: '用户授权',
  prop_user_group: '用户归岗',
  prop_dic_child_item: '字典条目',
  // 数据记录属性面板 本地化 end

  components: '组件',
  count_to_page: '数字渐变',
  tables_page: '多功能表格',
  split_pane_page: '分割窗口',
  markdown_page: 'Markdown编辑器',
  editor_page: '富文本编辑器',
  icons_page: '自定义图标',
  img_cropper_page: '图片编辑器',
  update: '上传数据',
  join_page: 'QQ群',
  doc: '文档',
  update_table_page: '上传CSV文件',
  update_paste_page: '粘贴表格数据',
  multilevel: '多级菜单',
  directive_page: '指令',
  level_1: 'Level-1',
  level_2: 'Level-2',
  level_2_1: 'Level-2-1',
  level_2_3: 'Level-2-3',
  level_2_2: 'Level-2-2',
  level_2_2_1: 'Level-2-2-1',
  level_2_2_2: 'Level-2-2-2',
  excel: 'Excel',
  'upload-excel': '上传excel',
  'export-excel': '导出excel',
  tools_methods_page: '工具函数',
  drag_list_page: '拖拽列表',
  i18n_page: '多语言',
  modalTitle: '模态框题目',
  content: '这是模态框内容',
  buttonText: '显示模态框',
  'i18n-tip': '注：仅此页做了多语言，其他页面没有在多语言包中添加语言内容',
  error_store_page: '错误收集',
  error_logger_page: '错误日志',
  query: '带参路由',
  params: '动态路由',
  cropper_page: '图片裁剪',
  message_page: '消息中心',
  tree_table_page: '树状表格',
  org_tree_page: '组织结构树',
  drag_drawer_page: '可拖动抽屉'
}

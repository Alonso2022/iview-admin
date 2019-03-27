import { local as joinUpLocaL } from './zh-CN/system.join-up'
import { local as platformLocaL } from './zh-CN/system.platform'
import { local as settingLocaL } from './zh-CN/system.setting'

// 公共信息本地化
const common = {
  ok: '确认',
  cancel: '取消',
  apply: '应用',
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
  attachment: '附件',
  test: '测试',
  success: '成功',
  error: '出错了',
  warning: '警告',
  failure: '失败',
  loading: '载入中...',
  date: '日期',
  register: '注册',
  enable: '启用',
  disable: '禁用',
  operation: '操作',
  open: '打开',
  close: '关闭',
  yes: '是',
  no: '否',
  true: '真',
  false: '假',

  menu: '菜单',
  value: '值',
  code: '编码',
  'token': '令牌',
  'app-id': 'APP ID',
  'secret-key': '秘钥',
  'domain': '域',
  'title': '标题',
  'name': '名称',
  'description': '描述',
  'create-by': '创建人',
  'create-on': '创建时间',
  'modify_by': '修改人',
  'modify_on': '修改时间',
  'is_disable': '禁用标记',
  'is_delete': '删除标记',

  'create-success': '创建成功',
  'create-failure': '创建失败',
  'edit-success': '编辑成功',
  'edit-failure': '编辑失败',
  'apply-success': '应用成功',
  'apply-failure': '应用失败',
  'submit-success': '提交成功',
  'submit-failure': '提交失败',

  'check-in': '登记',

  'search-key-empty-msg': '搜索关键字不能为空',
  'confirm-del': '确认删除',
  'confirm-del-content': '删除过后无法找回，确认删除吗?',
  'need-select-least-one': '需要选择至少一行记录',
  'advance-search': '高级搜索',
  'enter-search-key': '请输入关键字',
  'set-display-cols': '设置显示列',
  'send-to-api': '提交数据到API',
  'server-response': 'API响应完成'

}

// 系统级别的路由 本地化
const systemRouters = {
  home: '首页',
  error_logger_page: '错误日志'
}

// 菜单本地化
const menus = {

  // 菜单管理
  menu: '菜单管理',
  menu_list: '菜单管理',

  // 权限管理
  permission: '权限管理',
  page: '功能管理',
  page_point: '功能点管理',
  role: '角色管理',
  data_filter: '数据权限',

  // 用户管理
  user: '用户管理',
  user_list: '用户管理',

  // 组织机构管理
  organization: '组织机构',
  organization_list: '机构管理',
  organization_position: '岗位管理',

  // 授权管理
  auth: '授权管理',
  position_auth: '岗位授权',
  user_auth: '用户授权',

  // 接入管理
  joinup: '接入管理',
  platform: '平台管理',
  joinup_auth: '接入登记',

  // 系统设置
  setting: '系统设置',
  dictionary: '字典管理',
  config: '配置管理'

}

export default {
  ...common,
  ...systemRouters,
  ...menus,
  'join-up-lang': joinUpLocaL,
  'platform-lang': platformLocaL,
  'setting-lang': settingLocaL

}

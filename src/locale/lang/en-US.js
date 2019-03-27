import { local as joinUpLocaL } from './en-US/system.join-up'
import { local as platformLocaL } from './en-US/system.platform'
import { local as settingLocaL } from './en-US/system.setting'
// 公共信息本地化
const common = {
  ok: 'Ok',
  cancel: 'Cancel',
  apply: 'Apply',
  save: 'Save',
  submit: 'Submit',
  goback: 'Go Back',
  reset: 'Reset',
  add: 'Add',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
  destory: 'Destory',
  restore: 'Restore',
  reply: 'Reply',
  search: 'Search',
  more: 'More',
  detail: 'Detail',
  general: 'General',
  attachment: 'Attachment',
  test: 'Test',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  failure: 'Failure',
  loading: 'Loading...',
  date: 'Date',
  register: 'Register',
  enable: 'enable',
  disable: 'Disable',
  operation: 'Operate',
  open: 'Open',
  close: 'Close',
  yes: 'Yes',
  no: 'No',
  true: 'True',
  false: 'False',

  menu: 'Menu',
  value: 'Value',
  code: 'Code',
  'token': 'Token',
  'app-id': 'APP ID',
  'secret-key': 'Secret Key',
  'domain': 'domain',
  'title': 'Tile',
  'name': 'Name',
  'description': 'Description',

  'create-success': 'Create success',
  'create-failure': 'Create Failure',
  'edit-success': 'Edit Success',
  'edit-failure': 'Edit Failure',
  'apply-success': 'Apply Success',
  'apply-failure': 'Apply Failure',
  'submit-success': 'Submit Success',
  'submit-failure': 'Submit Failure',

  'check-in': 'Check in',

  'search-key-empty-msg': 'Search keywords cannot be empty',
  'confirm-del': 'Confirm deletion',
  'confirm-del-content': 'Can\'t be retrieved after deletion, confirm deletion?',
  'need-select-least-one': 'You need to select at least one row of records',
  'advance-search': 'Advance search',
  'enter-search-key': 'Please enter keywords',
  'set-display-cols': 'Setting display columns',
  'send-to-api': 'Send to API',
  'server-response': 'API response'

}

// 系统级别的路由 本地化
const systemRouters = {
  home: 'Home',
  error_logger_page: 'Error logs'
}

// 菜单本地化
const menus = {

  // 菜单管理
  menu: 'Menu',
  menu_list: 'Menu',

  // 权限管理
  permission: 'Permission',
  page: 'Page',
  page_point: 'Page point',
  role: 'Role',
  data_filter: 'Data permission',

  // 用户管理
  user: 'User',
  user_list: 'User list',

  // 组织机构管理
  organization: 'Organization',
  organization_list: 'Organization list',
  organization_position: 'Position',

  // 授权管理
  auth: 'Auth',
  position_auth: 'Position auth',
  user_auth: 'User auth',

  // 接入管理
  joinup: 'Joinup',
  platform: 'Platform',
  joinup_auth: 'Joinup auth',

  // 系统设置
  setting: 'Setting',
  dictionary: 'Dictionary',
  config: 'Config'

}

export default {
  ...common,
  ...systemRouters,
  ...menus,
  'join-up-lang': joinUpLocaL,
  'platform-lang': platformLocaL,
  'setting-lang': settingLocaL

}

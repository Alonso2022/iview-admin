import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList, uploadImage, getOrgData, getTreeSelectData, getRoleList, getResouceList, getGroupList, getUserist } from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'
import { getJoinAuthList } from './system/join-up/data'
import { getPlatformList } from './system/platform/data'
import { getConfigList } from './system/setting/data'
import { getDictionaryList } from './system/dictionary/data'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/get_org_data/, getOrgData)
Mock.mock(/\/get_tree_select_data/, getTreeSelectData)

//
Mock.mock(/\/sys\/get_role_list/, getRoleList)
Mock.mock(/\/sys\/get_resouce_list/, getResouceList)
Mock.mock(/\/sys\/get_group_list/, getGroupList)
Mock.mock(/\/sys\/get_user_list/, getUserist)

Mock.mock(/\/sys\/get_join_auth_list/, getJoinAuthList)
Mock.mock(/\/sys\/get_platform_list/, getPlatformList)
Mock.mock(/\/sys\/get_config_list/, getConfigList)
Mock.mock(/\/sys\/get_dictionary_list/, getDictionaryList)

export default Mock

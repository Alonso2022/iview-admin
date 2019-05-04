import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList, uploadImage, getOrgData, getTreeSelectData, getRoleList, getResouceList, getGroupList, getUserist } from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'
import { getJoinAuthList } from './system/join-up/data'
import { getPlatformList } from './system/platform/data'
import { getConfigList, delConfig, addConfig, updateConfig } from './system/setting/data'
import { query as dictionaryQuery, insert as dictionaryInsert, deleteById as dictionaryDeleteById, update as dictionaryUpdate } from './system/dictionary/data'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 500
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

// 配置
Mock.mock(/\/sys\/get_config_list/, getConfigList)
Mock.mock(/\/sys\/del_config/, delConfig)
Mock.mock(/\/sys\/add_config/, addConfig)
Mock.mock(/\/sys\/update_config/, updateConfig)

Mock.mock(/\/sys\/get_join_auth_list/, getJoinAuthList)
Mock.mock(/\/sys\/get_platform_list/, getPlatformList)
Mock.mock(/\/sysdictionary\/query/, dictionaryQuery)
Mock.mock(/\/sysdictionary\/insert/, dictionaryInsert)
Mock.mock(/\/sysdictionary\/deleteById/, dictionaryDeleteById)
Mock.mock(/\/sysdictionary\/update/, dictionaryUpdate)
export default Mock

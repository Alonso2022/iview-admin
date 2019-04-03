<template>
    <div class="mainRooter">
      <Row :gutter="10" style="margin-bottom: 10px;">
          <i-col :md="24" :lg="6" >
            <Input clearable :placeholder="$t('请输入关键字')" class="search-input" v-model="params.key" @keyup.enter.native="onSearch" />
          </i-col>
          <i-col :md="24" :lg="18" >
            <Button @click="onSearch" class="search-btn" type="primary" icon="ios-search">{{this.$t('搜索')}}</Button>

            <!-- 新增 -->
            <my-panl
              ref="myCreate"
              displayMode="modal"
              :panlTitle="createPanlTitle"
              btnClass="extendBtn"
              :buttonTitle="$t('创建')"
              type="primary"
              icon="md-add"
              :okTitle="$t('提交')"
              :cancelTitle="$t('取消')"
              :okLoading="okLoading"
              @onOk="onAdd('formValidate')">
                <!-- 创建表单 -->
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row :gutter="32">
                      <i-col span="24">
                            <FormItem :label="$t('配置类型')" prop="CONFIG_TYPE"  >
                              <Select v-model="formValidate.CONFIG_TYPE" @on-change="changeConfigType" >
                              <Option value="SYSTEM" label="SYSTEM">
                                <span>{{$t('系统')}}</span>
                                <span style="float:right;color:#ccc">SYSTEM</span>
                              </Option>
                              <Option value="POSITION" label="POSITION">
                                <span>{{$t('岗位')}}</span>
                                <span style="float:right;color:#ccc">POSITION</span>
                              </Option>
                              <Option value="USER" label="USER">
                                <span>{{$t('用户')}}</span>
                                <span style="float:right;color:#ccc">USER</span>
                              </Option>
                            </Select>

                            </FormItem>
                        </i-col>
                    </Row>
                    <row :gutter="32">
                        <i-col span="24">
                            <FormItem :label="$t('主体')"  prop="TARGET" >
                                <i-input v-if="formValidate.CONFIG_TYPE === 'SYSTEM'"  disabled v-model="formValidate.TARGET" :placeholder="$t('主体')" />
                                <i-input v-else v-model="formValidate.TARGET" :placeholder="$t('主体')" />
                            </FormItem>
                        </i-col>
                    </row>
                    <row :gutter="32">
                        <i-col span="24">
                            <FormItem :label="$t('编码')"  prop="CODE" >
                                <i-input v-model="formValidate.CODE" :placeholder="$t('编码')" />
                            </FormItem>
                        </i-col>
                    </row>
                    <Row :gutter="32">
                      <i-col span="24">
                        <FormItem :label="$t('描述')" prop="DESCRIPTION" >
                            <i-input type="textarea" v-model="formValidate.DESCRIPTION" :rows="4" :placeholder="$t('描述')" />
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="24">
                          <FormItem :label="$t('数据类型')"  prop="DATA_TYPE"  >

                            <Select v-model="formValidate.DATA_TYPE" @on-change="changeDataType">
                              <Option value="TEXT" label="TEXT">
                                <span>{{$t('文本型')}}</span>
                                <span style="float:right;color:#ccc">TEXT</span>
                              </Option>
                              <Option value="BOOLEAN" label="BOOLEAN">
                                <span>{{$t('布尔型')}}</span>
                                <span style="float:right;color:#ccc">BOOLEAN</span>
                              </Option>
                              <Option value="DATE" label="DATE">
                                <span>{{$t('日期型')}}</span>
                                <span style="float:right;color:#ccc">DATE</span>
                              </Option>
                              <Option value="NUMBER" label="NUMBER">
                                <span>{{$t('数字型')}}</span>
                                <span style="float:right;color:#ccc">NUMBER</span>
                              </Option>
                            </Select>

                          </FormItem>
                      </i-col>
                    </Row>

                    <Row :gutter="32">
                      <i-col span="24">

                        <FormItem :label="$t('值')" prop="VALUE" >
                          <i-switch v-if="formValidate.DATA_TYPE === 'BOOLEAN'" v-model="formValidate.VALUE" size="large">
                            <span slot="open">{{$t('是')}}</span>
                            <span slot="close">{{$t('否')}}</span>
                          </i-switch>
                          <DatePicker v-else-if="formValidate.DATA_TYPE === 'DATE'" format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="formValidate.VALUE"></DatePicker>
                          <InputNumber v-else-if="formValidate.DATA_TYPE === 'NUMBER'" v-model="formValidate.VALUE"></InputNumber>
                          <Input  v-else type="text" v-model="formValidate.VALUE"  />
                        </FormItem>

                        </i-col>
                    </Row>

                </Form>
            </my-panl>
          </i-col>
      </Row>

      <Table :columns="columns" :loading="loading" :data="data" >
          <template slot-scope="{ row, index }" slot="VALUE">
              <span v-if="editItem.editIndex === index">
                <i-switch v-if="row.DATA_TYPE === 'BOOLEAN'" v-model="editItem.formData.VALUE" size="large">
                  <span slot="open">{{$t('是')}}</span>
                  <span slot="close">{{$t('否')}}</span>
                </i-switch>
                <DatePicker v-else-if="row.DATA_TYPE === 'DATE'" format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="editItem.formData.VALUE"  ></DatePicker>
                <InputNumber v-else-if="row.DATA_TYPE === 'NUMBER'" v-model="editItem.formData.VALUE"></InputNumber>
                <Input  v-else type="text" v-model="editItem.formData.VALUE"  />
              </span>

              <span v-else>
                <span v-if="row.DATA_TYPE === 'BOOLEAN'">
                  <i-switch v-if="row.DATA_TYPE === 'BOOLEAN'" v-model="row.VALUE" disabled  size="large">
                    <span slot="open">{{$t('是')}}</span>
                    <span slot="close">{{$t('否')}}</span>
                  </i-switch>
                </span>
                <span v-else>{{ row.VALUE }}</span>
              </span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <div v-if="editItem.editIndex === index">
              <ButtonGroup size="small" >
                <Button @click="onSave(row, index)"  type="warning"  :title="$t('保存')">{{$t('保存')}}</Button>
                <Button @click="editItem.editIndex=-1"  type="default" :title="$t('取消')">{{$t('取消')}}</Button>
              </ButtonGroup>
            </div>
            <div v-else>
              <ButtonGroup size="small" >
                <Button @click="onEdit(row, index)"  type="primary"  :title="$t('编辑')">{{$t('编辑')}}</Button>
                <Button :disabled="row.CONFIG_TYPE === 'SYSTEM'" @click="onDelete(row, index)"  type="error" :title="row.CONFIG_TYPE === 'SYSTEM'?$t('系统配置不允许删除'):$t('删除')">{{$t('删除')}}</Button>
              </ButtonGroup>
            </div>
          </template>
      </Table>
      <div v-if="total > params.pageSize" class="page">
        <Page :total="total" :current="params.currentPage" :page-size="params.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" size="small" show-total show-elevator show-sizer />
      </div>

    </div>
</template>

<script>

import { getConfigList, delConfig, updateConfig, addConfig } from '@/api/system/setting/data'
import MyPanl from '_c/@my-panl/my-panl.vue'
import dayjs from 'dayjs'
export default {
  components: {
    MyPanl
  },
  data () {
    return {
      columns: [
        {
          title: '#',
          width: 40,
          className: 'action-column',
          // fixed: 'left',
          render: (h, params) => {
            return h('span', params.index + (this.params.currentPage - 1) * this.params.pageSize + 1)
          }
        },

        {
          key: 'CODE',
          sortable: false,
          // fixed: 'left',
          width: 150,
          renderHeader: (h, params) => {
            return h('span', this.$t('编码')) // 多语言切换 需要用到renderHeader 否则可以不用
          }
        },
        {
          key: 'CONFIG_TYPE',
          sortable: true,
          width: 150,
          // fixed: 'left',
          renderHeader: (h, params) => {
            return h('span', this.$t('配置类型')) // 多语言切换 需要用到renderHeader 否则可以不用
          },
          filters: [
            {
              label: this.$t('系统'),
              value: 'SYSTEM'
            },
            {
              label: this.$t('岗位'),
              value: 'POSITION'
            },
            {
              label: this.$t('用户'),
              value: 'USER'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.CONFIG_TYPE.toUpperCase() === value.toUpperCase()
          }
        },
        {
          key: 'TARGET',
          sortable: false,
          // fixed: 'left',
          width: 150,
          renderHeader: (h, params) => {
            return h('span', this.$t('主体')) // 多语言切换 需要用到renderHeader 否则可以不用
          }
        },
        // {
        //   key: 'DATA_TYPE',
        //   sortable: true,
        //   width: 120,
        //   renderHeader: (h, params) => {
        //     return h('span', this.$t('数据类型')) // 多语言切换 需要用到renderHeader 否则可以不用
        //   }
        // },
        {
          key: 'DESCRIPTION',
          sortable: false,
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('描述'))
          }
        },
        {
          slot: 'VALUE',
          sortable: false,
          renderHeader: (h, params) => {
            return h('span', this.$t('值')) // 多语言切换 需要用到renderHeader 否则可以不用
          }
        },
        {
          slot: 'action',
          // fixed: 'right',
          width: 110,
          className: 'action-column',
          renderHeader: (h, params) => {
            return h('span', this.$t('操作')) // 多语言切换 需要用到renderHeader 否则可以不用
          }
        }
      ],
      data: [],
      formValidate: {
        CODE: '',
        DESCRIPTION: '',
        CONFIG_TYPE: '',
        DATA_TYPE: '',
        TARGET: '',
        VALUE: '',
        ID: ''
      },
      ruleValidate: {
        CONFIG_TYPE: [
          { required: true, message: this.$t('配置类型') + this.$t('不能为空'), trigger: 'change' }
        ],
        TARGET: [
          { required: true, message: this.$t('主体') + this.$t('不能为空'), trigger: 'blur' }
        ],
        CODE: [
          { required: true, message: this.$t('编码') + this.$t('不能为空'), trigger: 'blur' }
        ],
        DESCRIPTION: [
          { required: true, message: this.$t('描述') + this.$t('不能为空'), trigger: 'blur' }
        ],
        DATA_TYPE: [
          { required: true, message: this.$t('数据类型') + this.$t('不能为空'), trigger: 'change' }
        ]
      },
      loading: false,
      okLoading: false,
      selectedItems: [],
      createPanlTitle: this.$t('创建'),
      editItem: {
        editIndex: -1,
        formData: { }
      },
      total: 0,
      params: {
        action: 'READ',
        currentPage: 1,
        pageSize: this.$config.pageSize,
        key: '',
        filter: { },
        item: {}
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // Read 列表数据
    getData () {
      this.loading = true
      this.params.action = 'READ'
      getConfigList(this.params).then(res => {
        if (res.data.code === '1') {
          this.total = res.data.total
          this.data = res.data.data
        } else {
          this.$Notice.error({
            title: this.$t('错误'),
            desc: res.data.msg
          })
        }
        this.loading = false
      }).catch((err) => {
        this.$Notice.error({
          title: this.$t('错误'),
          desc: err
        })
        this.loading = false
      })
    },
    // 搜索按钮事件
    onSearch () {
      this.getData()
    },
    // 取的当前记录行号
    getIndex (index) {
      return this.params.currentPage * this.params.pageSize + index + 1
    },
    // 执行删除 事件 （删除提示框中确认按钮事件）
    execDelete (row, index) {
      this.params.action = 'DELETE'
      this.params.item = row
      delConfig(this.params).then(res => {
        if (res.data.code === '1') {
          this.data.splice(index, 1)
          this.$Notice.success({
            title: this.$t('成功'),
            desc: this.$t('删除成功') + '(' + row.CODE + ')'
          })
        } else {
          this.$Notice.error({
            title: this.$t('错误'),
            desc: res.data.msg
          })
        }
        this.$Modal.remove()
      }).catch((err) => {
        this.$Notice.error({
          title: this.$t('错误'),
          desc: err
        })
        this.$Modal.remove()
      })
    },
    // 编辑按钮 事件
    onEdit (row, index) {
      this.createPanlTitle = row.TITLE
      this.editItem = {
        editIndex: index,
        formData: JSON.parse(JSON.stringify(row))
      }
    },
    // 删除按钮 事件 （删除提示确认框）
    onDelete (row, index) {
      // 确认删除对话框
      this.$Modal.confirm({
        title: this.$t('删除确认'),
        content: this.$t('确认删除指定记录吗?'),
        onOk: () => { this.execDelete(row, index) },
        loading: true,
        okText: this.$t('删除'),
        cancelText: this.$t('取消')
      })
    },
    // 编辑 保存事件
    onSave (row, index) {
      let oldValue = row.VALUE
      let newValue = this.editItem.formData.VALUE

      if (this.editItem.formData.DATA_TYPE === 'DATE') {
        oldValue = oldValue === null || oldValue.toString().trim() === '' ? '' : dayjs(oldValue).format('YYYY-MM-DD HH:mm:ss')
        newValue = newValue === null || newValue.toString().trim() === '' ? '' : dayjs(newValue).format('YYYY-MM-DD HH:mm:ss')
      }

      if (oldValue === newValue) {
        this.editItem.editIndex = -1
        return
      }

      this.loading = true
      this.params.action = 'UPDATE'
      this.params.item = row
      updateConfig(this.params).then(res => {
        if (res.data.code === '1') {
          this.data[index].VALUE = newValue
          this.editItem.editIndex = -1
          this.$Notice.success({
            title: this.$t('成功'),
            desc: this.$t('编辑成功') + '(' + row.CODE + ')'
          })
        } else {
          this.$Notice.error({
            title: this.$t('错误'),
            desc: res.data.msg
          })
        }
        this.loading = false
      }).catch((err) => {
        this.$Notice.error({
          title: this.$t('错误'),
          desc: err
        })
        this.loading = false
      })
    },
    // 新增面板中 保存按钮事件
    onAdd (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.okLoading = true
          this.params.action = 'CREATE'

          this.params.item = this.formValidate
          addConfig(this.params).then(res => {
            if (res.data.code === '1') {
              this.total = res.data.total
              this.data = res.data.data
              this.params.currentPage = 1 // 添加成功归页1
              this.$Notice.success({
                title: this.$t('成功'),
                desc: this.$t('创建成功') + '(' + this.formValidate.CODE + ')'
              })
              // 关闭创建面板
              // this.$refs.myCreate.closePanl()
            } else {
              this.$Notice.error({
                title: this.$t('错误'),
                desc: res.data.msg
              })
            }
            this.okLoading = false
          }).catch((err) => {
            this.$Notice.error({
              title: this.$t('错误'),
              desc: err
            })
            this.okLoading = false
          })
        }
      })
    },
    // 页码改变事件
    changePage (page) {
      this.params.currentPage = page
      this.getData()
    },
    // 每页显示记录数改变事件
    changePageSize (pageSize) {
      this.params.pageSize = pageSize
      this.getData()
    },
    // 创建面板中 配置类型 下来框改变事件
    changeConfigType () {
      if (this.formValidate.CONFIG_TYPE === 'SYSTEM') {
        this.formValidate.TARGET = 'SYSTEM'
      } else {
        this.formValidate.TARGET = ''
      }
    },
    // 创建面板中 数据类型 下来框改变事件
    changeDataType () {
      if (this.formValidate.DATA_TYPE === 'DATE') {
        this.formValidate.VALUE = new Date()
      } else if (this.formValidate.DATA_TYPE === 'NUMBER') {
        this.formValidate.VALUE = 1
      } else if (this.formValidate.DATA_TYPE === 'BOOLEAN') {
        this.formValidate.VALUE = true
      } else {
        this.formValidate.VALUE = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

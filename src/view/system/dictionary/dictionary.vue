<template>
  <div class="mainRooter">
    <Row :gutter="10" style="margin-bottom: 10px;">
      <i-col :md="24" :lg="6">
        <Input clearable :placeholder="$t('请输入关键字')" class="search-input" v-model="params.key" @keyup.enter.native="onSearch"/>
      </i-col>
      <i-col :md="24" :lg="18">
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
          @onOk="onSubmit"
          @onClickBefore="onCreate"
        >
          <!-- 创建表单 -->
          <Form ref="formValidate" :model="editItem.formData" :rules="ruleValidate" :label-width="80">
            <row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('编码')" prop="CODE">
                  <i-input v-if="editItem.editIndex>-1" disabled v-model="editItem.formData.CODE" :placeholder="$t('编码')"/>
                  <i-input v-else v-model="editItem.formData.CODE" :placeholder="$t('编码')"/>
                </FormItem>
              </i-col>
            </row>
            <row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('标题')" prop="TITLE">
                  <i-input v-model="editItem.formData.TITLE" :placeholder="$t('标题')"/>
                </FormItem>
              </i-col>
            </row>

            <Row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('描述')" prop="DESCRIPTION">
                  <i-input type="textarea" v-model="editItem.formData.DESCRIPTION" :rows="2" :placeholder="$t('描述')"/>
                </FormItem>
              </i-col>
            </Row>

            <Row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('扩展1')" prop="EX1">
                  <i-input v-model="editItem.formData.EX1" :placeholder="$t('扩展1')"/>
                </FormItem>
              </i-col>
            </Row>

            <Row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('扩展2')" prop="EX2">
                  <i-input v-model="editItem.formData.EX2" :placeholder="$t('扩展2')"/>
                </FormItem>
              </i-col>
            </Row>
            <Row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('扩展3')" prop="EX3">
                  <i-input v-model="editItem.formData.EX3" :placeholder="$t('扩展3')"/>
                </FormItem>
              </i-col>
            </Row>
            <Row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('扩展4')" prop="EX4">
                  <i-input v-model="editItem.formData.EX4" :placeholder="$t('扩展4')"/>
                </FormItem>
              </i-col>
            </Row>
            <Row :gutter="32">
              <i-col span="24">
                <FormItem :label="$t('扩展5')" prop="EX5">
                  <i-input v-model="editItem.formData.EX5" :placeholder="$t('扩展5')"/>
                </FormItem>
              </i-col>
            </Row>
            <Divider style="margin-top:-20px;"/>
            <Row :gutter="32">
              <i-col span="12">
                <FormItem :label="$t('创建人')" prop="CREATE_BY">
                  <i-input disabled v-model="editItem.formData.CREATE_BY" :placeholder="$t('创建人')"/>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem :label="$t('创建时间')" prop="CREATE_ON">
                  <DatePicker
                    style="display:block"
                    disabled
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    v-model="editItem.formData.CREATE_ON"
                    :placeholder="$t('创建时间')"
                  ></DatePicker>
                </FormItem>
              </i-col>
            </Row>

            <Row :gutter="32">
              <i-col span="12">
                <FormItem :label="$t('更新人')" prop="UPDATE_BY">
                  <i-input disabled v-model="editItem.formData.UPDATE_BY" :placeholder="$t('更新人')"/>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem :label="$t('更新时间')" prop="UPDATE_ON">
                  <DatePicker
                    style="display:block"
                    disabled
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    v-model="editItem.formData.UPDATE_ON"
                    :placeholder="$t('更新时间')"
                  ></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </my-panl>
      </i-col>
    </Row>

    <Table :columns="columns" :loading="loading" :data="data">
      <template slot-scope="{ row }" slot="Extend">
        <span>{{row.EX1}}{{!row.EX2||row.EX2===''?'':","+row.EX2}}{{!row.EX3||row.EX3===''?'':","+row.EX3}}{{!row.EX4||row.EX4===''?'':","+row.EX4}}{{!row.EX5||row.EX5===''?'':","+row.EX5}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <ButtonGroup size="small">
          <Button @click="onEdit(row, index)" type="primary" :title="$t('编辑')">{{$t('编辑')}}</Button>
          <Button
            :disabled="row.CONFIG_TYPE === 'SYSTEM'"
            @click="onDelete(row, index)"
            type="error"
            :title="row.CONFIG_TYPE === 'SYSTEM'?$t('系统配置不允许删除'):$t('删除')"
          >{{$t('删除')}}</Button>
        </ButtonGroup>
      </template>
    </Table>
    <div v-if="total > params.pageSize" class="page">
      <Page
        :total="total"
        :current="params.currentPage"
        :page-size="params.pageSize"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        size="small"
        show-total
        show-elevator
        show-sizer
      />
    </div>
  </div>
</template>

<script>

import { query, insert, deleteById, update } from '@/api/system/dictionary/data'
import MyPanl from '_c/@my-panl/my-panl.vue'
// import dayjs from 'dayjs'
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
          sortable: true,
          // fixed: 'left',
          width: 150,
          renderHeader: (h, params) => {
            return h('span', this.$t('编码')) // 多语言切换 需要用到renderHeader 否则可以不用
          }
        },
        {
          key: 'TITLE',
          sortable: true,
          // fixed: 'left',
          renderHeader: (h, params) => {
            return h('span', this.$t('标题')) // 多语言切换 需要用到renderHeader 否则可以不用
          }
        },
        {
          key: 'DESCRIPTION',
          sortable: false,
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('描述'))
          }
        },
        {
          slot: 'Extend',
          sortable: false,
          renderHeader: (h, params) => {
            return h('span', this.$t('扩展')) // 多语言切换 需要用到renderHeader 否则可以不用
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
      formModel: {
        CODE: '',
        TITLE: '',
        DESCRIPTION: '',
        EX1: '',
        EX2: '',
        EX3: '',
        EX4: '',
        EX5: '',
        CREATE_BY: '',
        CREATE_ON: '',
        UPDATE_BY: '',
        UPDATE_ON: '',
        ID: ''
      },
      ruleValidate: {
        TITLE: [
          { required: true, message: this.$t('标题') + this.$t('不能为空'), trigger: 'blur' }
        ],
        CODE: [
          { required: true, message: this.$t('编码') + this.$t('不能为空'), trigger: 'blur' }
        ]
      },
      loading: false,
      okLoading: false,
      selectedItems: [],
      createPanlTitle: this.$t('创建'),
      editItem: {
        editIndex: -1,
        formData: {}
      },
      total: 0,
      params: {
        action: 'READ',
        currentPage: 1,
        pageSize: this.$config.pageSize,
        key: '',
        filter: {},
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
      query(this.params).then(res => {
        console.log(res)
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
      deleteById(row.ID).then(res => {
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
    // 创建按钮事件
    onCreate () {
      this.createPanlTitle = this.$t('创建')
      this.editItem = {
        editIndex: -1,
        formData: this.formModel
      }
    },
    // 编辑按钮 事件
    onEdit (row, index) {
      this.createPanlTitle = row.TITLE
      this.editItem = {
        editIndex: index,
        formData: JSON.parse(JSON.stringify(row))
      }
      // this.formValidate = this.editItem.formData
      this.$refs.myCreate.openPanl()
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
    // 面板中 提交按钮事件
    onSubmit () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.okLoading = true
          this.params.action = 'CREATE'

          this.params.item = this.editItem.formData

          // const _vue = Vue

          if (this.editItem.editIndex > -1) {
            update(this.params).then(res => {
              if (res.data.code === '1') {
                // this.data[this.editItem.editIndex] = this.editItem.formData
                this.$set(this.data, this.editItem.editIndex, this.params.item)
                this.editItem.editIndex = -1
                this.$Notice.success({
                  title: this.$t('成功'),
                  desc: this.$t('编辑成功') + '(' + this.params.item.CODE + ')'
                })
              } else {
                this.$Notice.error({
                  title: this.$t('错误'),
                  desc: res.data.msg
                })
              }
              this.loading = false
              this.okLoading = false
              // 关闭创建面板
              this.$refs.myCreate.closePanl()
            }).catch((err) => {
              this.$Notice.error({
                title: this.$t('错误1'),
                desc: err
              })
              this.loading = false
              this.okLoading = false
            })
          } else {
            insert(this.params).then(res => {
              if (res.data.code === '1') {
                this.total = res.data.total
                this.data = res.data.data
                this.params.currentPage = 1 // 添加成功归页1
                this.$Notice.success({
                  title: this.$t('成功'),
                  desc: this.$t('创建成功') + '(' + this.editItem.formData.CODE + ')'
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
    }

  }
}
</script>

<style lang="less" scoped>
</style>

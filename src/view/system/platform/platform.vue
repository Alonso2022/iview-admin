<template>
    <div class="mainRooter">
      <Row :gutter="10" style="margin-bottom: 10px;">
          <i-col :md="24" :lg="6" >
            <Input clearable :placeholder="$t('enter-search-key')" class="search-input" v-model="key"/>
          </i-col>
          <i-col :md="24" :lg="18" >
            <Button
                @click="onSearch"
                class="search-btn"
                type="primary"
                icon="ios-search">{{this.$t('search')}}</Button>

            <!-- 新增 -->
            <my-panl
              ref="myCreate"
              displayMode="modal"
              :panlTitle="createPanlTitle"
              btnClass="extendBtn"
              :buttonTitle="$t('check-in')"
              type="primary"
              icon="md-add"
              :okTitle="$t('submit')"
              :cancelTitle="$t('cancel')"
              @onClickBefore="initCreatePanl"
              @onOk="onSave">
                <!-- 创建表单 -->
                <Form :model="editItem.formData">
                    <row :gutter="32">
                        <i-col span="24">
                            <FormItem :label="$t('title')"  label-position="top">
                                <i-input v-model="editItem.formData.TITLE" placeholder="Name" />
                            </FormItem>
                        </i-col>
                    </row>
                    <Row :gutter="32">
                      <i-col span="24">
                            <FormItem :label="$t('domain')" label-position="top">
                                <i-input v-model="editItem.formData.DOMAIN" placeholder="Domain" />
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="24">
                            <FormItem :label="$t('disable')" label-position="top">
                              <i-switch v-model="editItem.formData.IS_DISABLE"  size="large">
                                <span slot="open">{{this.$t('open')}}</span>
                                <span slot="close">{{this.$t('close')}}</span>
                              </i-switch>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="24">
                          <FormItem :label="$t('description')"  label-position="top">
                              <i-input type="textarea" v-model="editItem.formData.DESCRIPTION" :rows="4" placeholder="Description" />
                          </FormItem>
                        </i-col>
                    </Row>
                </Form>
            </my-panl>

            <!-- 批量删除 -->
            <i-button @click="onDeleteSelected" type="warning" class="extendBtn" icon="md-close">{{this.$t('delete')}}</i-button>

          </i-col>
      </Row>

      <Table :columns="columns" :loading="loading" :data="data" @on-selection-change="onSelectionChange">
           <template slot-scope="{ row }" slot="IS_DISABLE">
              <i-switch v-model="row.IS_DISABLE" disabled  size="large">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
          </template>

          <template slot-scope="{ row, index }" slot="action">

            <ButtonGroup size="small" >
              <Button @click="onEdit(row, index)"  icon="ios-create" type="primary"  :title="$t('edit')"></Button>
              <Button @click="onDelete(row, index)"  icon="md-close" type="warning" :title="$t('delete')"></Button>
            </ButtonGroup>
          </template>
      </Table>
      <div class="page">
        <Page :total="total" :current="paras.currentPage" :page-size="paras.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" size="small" show-total show-elevator show-sizer />
      </div>

    </div>
</template>

<script>

import { getPlatformList } from '@/api/system/platform/data'
import MyPanl from '_c/@my-panl/my-panl.vue'
export default {
  components: {
    MyPanl
  },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          className: 'action-column'
        },
        {
          title: '#',
          width: 40,
          className: 'action-column',
          render: (h, params) => {
            return h('span', params.index + (this.paras.currentPage - 1) * this.paras.pageSize + 1)
          }
        },
        {
          title: this.$t('title'),
          key: 'TITLE',
          sortable: true,
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('title'))
          }
        },
        {
          title: this.$t('description'),
          key: 'DESCRIPTION',
          sortable: true,
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('title'))
          }
        },

        {
          title: this.$t('domain'),
          key: 'DOMAIN',
          sortable: false,
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('domain'))
          }
        },
        {
          title: this.$t('disable'),
          slot: 'IS_DISABLE',
          sortable: false,
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('disable'))
          },
          render: (h, params) => {
            // <i-switch v-model="row.enable" disabled  size="large">
            return h('i-switch', { props: { value: params.row.IS_DISABLE, disabled: 'disabled', size: 'small' } })
          }
        },
        {
          title: this.$t('operation'),
          slot: 'action',
          fixed: 'right',
          width: 86,
          className: 'action-column',
          renderHeader: (h, params) => {
            // 多语言切换 需要用到renderHeader 否则可以不用
            return h('span', this.$t('operation'))
          }
        }
      ],
      data: [],
      key: '', // 搜索关键字
      loading: false,
      selectedItems: [],
      createPanlTitle: this.$t('create'),
      editItem: {
        editIndex: -1,
        formData: {}
      },

      total: 0,
      paras: {
        currentPage: 1,
        pageSize: 20,
        filter: {

        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getPlatformList(this.paras).then(res => {
        console.log(res)
        if (res.data.code === '1') {
          this.total = res.data.total
          this.data = res.data.data
        } else {
          this.$Notice.error({
            title: this.$t('error'),
            desc: res.data.msg
          })
        }
        this.loading = false
      })
    },
    getIndex (index) {
      return this.paras.currentPage * this.paras.pageSize + index + 1
    },
    onSearch () {
      if (this.key === '') {
        this.$Message.error(this.$t('search-key-empty-msg'))
        return
      }
      this.loading = true
      // 提交数据到API
      setTimeout(() => {
        this.$Notice.success({
          title: this.$t('success'),
          desc: this.$t('server-response')
        })
        this.loading = false
      }, 1000)
    },
    onAdvancedSearch () {
      this.loading = true
      // 提交数据到API
      setTimeout(() => {
        this.$Notice.success({
          title: this.$t('success'),
          desc: this.$t('server-response')
        })
        this.loading = false
      }, 1000)
      // 关闭搜索窗口
      this.$refs.mySearch.closePanl()
    },
    // 初始化创建窗口 以去除编辑后留下的状态
    initCreatePanl () {
      this.createPanlTitle = this.$t('create')
      this.editItem = {
        editIndex: -1,
        formData: {}
      }
    },
    onEdit (row, index) {
      this.createPanlTitle = row.TITLE
      this.editItem = {
        editIndex: index,
        formData: JSON.parse(JSON.stringify(row))
      }
      this.$refs.myCreate.openPanl()
    },
    onDelete (row, index) {
      // 确认删除对话框
      this.$Modal.confirm({
        title: this.$t('confirm-del'),
        content: this.$t('confirm-del-content'),
        onOk: this.execDelete,
        loading: true,
        okText: this.$t('delete'),
        cancelText: this.$t('cancel')
      })
    },
    onDeleteSelected () {
      if (!this.selectedItems.length) {
        this.$Message.error(this.$t('need-select-least-one'))
        return
      }
      this.$Modal.confirm({
        title: this.$t('confirm-del'),
        content: this.$t('confirm-del-content'),
        onOk: this.execDelete,
        loading: true,
        okText: this.$t('delete'),
        cancelText: this.$t('cancel')
      })
    },
    execDelete () {
      // 提交数据到API
      setTimeout(() => {
        this.$Notice.success({
          title: this.$t('success'),
          desc: this.$t('server-response')
        })
        // 关闭删除确认窗口
        this.$Modal.remove()
      }, 1000)
    },
    onSave () {
      if (this.editItem.editIndex === -1) {
        this.loading = true
        // 提交数据到APIedit-success
        setTimeout(() => {
          this.$Notice.success({
            title: this.$t('create-success'),
            desc: this.$t('server-response')
          })
          this.loading = false
        }, 1000)
      } else {
        this.loading = true
        this.$set(this.data, this.editItem.editIndex, this.editItem.formData)
        // 提交数据到API
        setTimeout(() => {
          this.$Notice.success({
            title: this.$t('edit-success'),
            desc: this.$t('server-response')
          })
          this.loading = false
        }, 1000)
      }

      // 关闭窗口
      this.$refs.myCreate.closePanl()
    },
    onSetCols () {
      this.$Notice.success({
        title: this.$t('apply-success'),
        desc: ''
      })
      this.$refs.myDisplayCols.closePanl()
    },
    onSelectionChange (selection) {
      this.selectedItems = selection
    },
    changePage (page) {
      this.paras.currentPage = page
      this.getData()
    },
    changePageSize (pageSize) {
      this.paras.pageSize = pageSize
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>

</style>

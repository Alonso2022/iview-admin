<template>
    <div class="mainRooter">

      <Table :columns="columns" :loading="loading" :data="data" >

          <template slot-scope="{ row, index }" slot="VALUE">
              <span v-if="editItem.editIndex === index">
                <i-switch v-if="row.DATA_TYPE === 'BOOLEAN'" v-model="editItem.formData.VALUE" size="large">
                  <span slot="open">{{$t('是')}}</span>
                  <span slot="close">{{$t('否')}}</span>
                </i-switch>
                <DatePicker v-else-if="row.DATA_TYPE === 'DATE'" format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="editItem.formData.VALUE"  placeholder="" style="width: 200px"></DatePicker>
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
      <div v-if="total > paras.pageSize" class="page">
        <Page :total="total" :current="paras.currentPage" :page-size="paras.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" size="small" show-total show-elevator show-sizer />
      </div>

    </div>
</template>

<script>

import { getConfigList } from '@/api/system/setting/data'
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
            return h('span', params.index + (this.paras.currentPage - 1) * this.paras.pageSize + 1)
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
      key: '', // 搜索关键字
      loading: false,
      selectedItems: [],
      createPanlTitle: this.$t('创建'),
      editItem: {
        editIndex: -1,
        formData: { }
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
      getConfigList(this.paras).then(res => {
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
      })
    },
    getIndex (index) {
      return this.paras.currentPage * this.paras.pageSize + index + 1
    },
    onEdit (row, index) {
      this.createPanlTitle = row.TITLE
      this.editItem = {
        editIndex: index,
        formData: JSON.parse(JSON.stringify(row))
      }
    },
    onDelete (row, index) {
      // 确认删除对话框
      this.$Modal.confirm({
        title: this.$t('删除确认'),
        content: this.$t('确认删除指定记录吗?'),
        onOk: this.execDelete,
        loading: true,
        okText: this.$t('删除'),
        cancelText: this.$t('取消')
      })
    },
    execDelete () {
      // 提交数据到API
      setTimeout(() => {
        this.$Notice.success({
          title: this.$t('成功'),
          desc: this.$t('API响应完成')
        })
        // 关闭删除确认窗口
        this.$Modal.remove()
      }, 1000)
    },
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
      // 提交数据到API
      setTimeout(() => {
        this.$Notice.success({
          title: this.$t('编辑成功'),
          desc: this.$t('API响应完成')
        })

        this.data[index].VALUE = newValue
        this.editItem.editIndex = -1
        this.loading = false
      }, 1000)
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

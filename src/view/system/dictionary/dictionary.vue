<template>
  <div class="mainRooter">
    <tables
    border
    editable
    searchable
    size="small"
    ref="tables"
    search-place="top"
    :columns="columns"
    v-model="items"
    @on-row-dblclick="dblclick"
    @on-create="create"
    ></tables>

    <drag-drawer v-model="itemDrawer.show"
        :width.sync="itemDrawer.width"
        :title="itemDrawer.title"
        :min-width="itemDrawer.minWidth"
        :placement="itemDrawer.position"
        :mask-closable="true"
        :draggable="itemDrawer.draggable"
        :scrollable="true"
        @on-visible-change="propDrawerVisibleChange"
        >
        <Tabs  @on-click="tabClick">
            <TabPane :label="$t('general')" icon="ios-paper-outline">

                <div>
                <Form :model="currentItem" :label-width="80">
                    <Row :gutter="32">
                        <i-col span="24">
                        <FormItem label="编码">
                            <i-Input v-model="currentItem.code" placeholder="编码CODE" ></i-Input>
                        </FormItem>
                    </i-col>
                    </Row>
                    <Row :gutter="32">
                        <i-col span="24">
                        <FormItem label="名称">
                            <i-Input v-model="currentItem.title" placeholder="名称" ></i-Input>
                        </FormItem>
                    </i-col>
                    </Row>
                    <Row :gutter="32">
                        <i-col span="24">
                        <FormItem label="数据归属">
                            <i-Input v-model="currentItem.group" readonly placeholder="选择归属" >
                            <Button slot="append" icon="ios-arrow-forward"  @click="groupDrawer.show=true"></Button>
                            </i-Input>
                        </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="32">
                        <i-col span="24">
                        <FormItem label="描述">
                            <i-Input v-model="currentItem.description"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"  placeholder="Enter something..." ></i-Input>
                        </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="32">
                        <i-col span="24">
                        <FormItem label="扩展字段">

                    <tables
                            border
                            editable
                            size="small"
                            ref="configTable"
                            :columns="extendTable.configTableCols"
                            v-model="extendTable.configTableRows"
                            @on-selection-change="selectChange"

                            ></tables>

                        </FormItem>
                        </i-col>
                    </Row>

                </Form>
                </div>
            </TabPane>
            <TabPane :label="$t('prop_dic_child_item')" icon="md-list">

              <Button  style="margin-bottom:10px;" long>+ 添加</Button>
              <Table border :loading="extendTable.loading" :columns="extendTable.cols" :data="extendTable.rows">
                  <template slot-scope="{ row, index }" slot="orderIndex">
                    <Input type="number" v-model="row.orderIndex" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.orderIndex }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="key">
                    <Input type="text" v-model="row.key" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.key }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="value">
                    <Input type="text" v-model="row.value" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.value }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="extend1">
                    <Input type="text" v-model="row.extend1" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.extend1 }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="extend2">
                    <Input type="text" v-model="row.extend2" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.extend2 }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="extend3">
                    <Input type="text" v-model="row.extend3" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.extend3 }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="extend4">
                    <Input type="text" v-model="row.extend4" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.extend4 }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="extend5">
                    <Input type="text" v-model="row.extend5" v-if="extendTable.editIndex === index" />
                    <span v-else>{{ row.extend5 }}</span>
                  </template>

                  <template slot-scope="{ row, index }" slot="action">
                    <div v-if="extendTable.editIndex === index">
                      <Button @click="handleSave(index)">保存</Button>
                      <Button @click="editIndex = -1">取消</Button>
                    </div>
                    <div v-else>
                      <Button @click="handleEdit(row, index)">操作</Button>
                    </div>
                  </template>
                </Table>

            </TabPane>
        </Tabs>
        <div slot="footer" class="drawerFooter">
            <Button type="primary" style="margin-right:10px;" @click="itemDrawer.show = false">{{ $t('submit') }}</Button>
            <Button type="default" @click="itemDrawer.show = false">{{ $t('cancel') }}</Button>
        </div>
    </drag-drawer>

    <drag-drawer v-model="groupDrawer.show"
        :width.sync="groupDrawer.width"
        :title="groupDrawer.title"
        :min-width="groupDrawer.minWidth"
        :placement="groupDrawer.position"
        :mask-closable="true"
        :draggable="groupDrawer.draggable"
        :scrollable="true">
        <RadioGroup v-model="currentItem.group" vertical>
            <Radio v-for="item in groupDrawer.groupDs" :label="item.value" :key="item.value">
                <span>{{item.label}}</span>
            </Radio>
        </RadioGroup>
    </drag-drawer>

    <Modal
        v-model="delModalShow"
        title="删除确认"
        width="360"
        >
        <p>你确认要删除指定记录吗？<br />
          {{ currentItem.code }} {{currentItem.title}}
        </p>
        <div slot="footer">
            <Button type="error" size="large" long :loading="confirm_loading" @click="del" >删除</Button>
        </div>
    </Modal>

  </div>
</template>

<script>
import DragDrawer from '_c/drag-drawer'
import Tables from '_c/@tables'
import { getRoleList, getResouceList, getGroupList } from '@/api/data'
export default {
  name: 'drag_drawer_page',
  components: {
    Tables,
    DragDrawer
  },
  data () {
    return {
      columns: [
        // { type: 'index', width: 50, align: 'center' },
        { type: 'selection', width: 50, align: 'center' },
        { title: '编码', key: 'code', sortable: true },
        { title: '名称', key: 'title', sortable: true },
        { title: '描述', key: 'description' },
        {
          title: '',
          key: 'handle',
          fixed: 'right',
          width: 100,
          align: 'center',
          button: [
            (h, params, vm) => {
              return h(
                'Button',
                {
                  props: {
                    type: 'text',
                    ghost: true
                  },
                  on: {
                    'click': () => {
                      this.edit(params.row)
                    }
                  }
                },
                [
                  h('Icon', {
                    props: {
                      type: 'ios-create',
                      size: 18,
                      color: '#515A6E'
                    }
                  })
                ]
              )
            },
            (h, params, vm) => {
              return h(
                'Button',
                {
                  props: {
                    type: 'text',
                    ghost: true
                  },
                  on: {
                    'click': () => {
                      this.delModalShow = true
                      this.currentItem = params.row
                    }
                  }
                },
                [
                  h('Icon', {
                    props: {
                      type: 'md-trash',
                      size: 18,
                      color: '#ED4014'
                    }
                  })
                ]
              )
            }
          ]
        }
      ],
      items: [],
      itemDrawer: {
        show: false,
        draggable: true,
        position: 'right',
        width: 800,
        minWidth: 600,
        title: 'Create',
        resouceDs: []
      },
      groupDrawer: {
        show: false,
        draggable: false,
        position: 'right',
        width: 300,
        minWidth: 300,
        title: 'Group',
        groupDs: []
      },
      delModalShow: false,
      confirm_loading: false,

      extendTable: {
        configTableCols: [
          { type: 'selection', width: 60, align: 'center' },
          { title: '字段名称', key: 'key', width: 120, sortable: true },
          { title: '显示名称', key: 'title', sortable: true, editable: true }
        ],
        configTableRows: [
          { key: 'extend1', title: '扩展字段1', _checked: true },
          { key: 'extend2', title: '扩展字段2' },
          { key: 'extend3', title: '扩展字段3' },
          { key: 'extend4', title: '扩展字段4' },
          { key: 'extend5', title: '扩展字段5' }
        ],
        cols: [{ type: 'index', width: 50, align: 'center' },
          { title: '排序', slot: 'orderIndex', width: 50 },
          { title: 'KEY', slot: 'key' },
          { title: 'Value', slot: 'value' }],
        rows: [{
          key: '王小明',
          value: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          key: '张小刚',
          value: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }],
        loading: true,
        editIndex: -1 // 当前聚焦的输入框的行数

      },
      currentItem: {},
      currentActiveTabIndex: 0

    }
  },
  computed: { },
  mounted () {
    getRoleList().then(res => {
      this.items = res.data
    })
    getResouceList().then(res => {
      this.itemDrawer.resouceDs = res.data
    })

    getGroupList().then(res => {
      this.groupDrawer.groupDs = res.data
    })
    this.itemDrawer.title = this.$t('create')

    this.selectChange(this.extendTable.configTableRows.filter(x => x._checked === true))
  },
  methods: {
    // 主表格双击事件
    dblclick (item) {
      this.edit(item)
    },
    // 编辑
    edit (item) {
      this.itemDrawer.title = this.$t('edit')
      // this.itemDrawer.item = item
      this.currentItem = item
      this.itemDrawer.show = true
    },
    // 创建
    create () {
      this.itemDrawer.title = this.$t('create')
      // this.itemDrawer.item = {}
      this.currentItem = {}
      this.itemDrawer.show = true
    },
    // 删除事件
    del () {
      this.delModalShow = true
      this.confirm_loading = true
      setTimeout(() => {
        this.delModalShow = false
        this.confirm_loading = false
        this.$Notice.success({
          title: '删除成功',
          desc: this.currentItem.code + ' ' + this.currentItem.title
        })
      }, 2000)
    },
    // 属性窗口TAB切换事件
    tabClick (index) {
      this.currentActiveTabIndex = index
      if (index === 1) {
        if (this.extendTable.loading) {
          this.getChildList()
        }
      }
    },
    // 抽屉显示隐藏状态改变事件
    propDrawerVisibleChange (isVisible) {
      // alert(item)
      if (isVisible && this.currentActiveTabIndex) {
        this.getChildList()
      } else if (!isVisible) {
        this.extendTable.loading = true
      }
    },

    getChildList () {
      this.extendTable.loading = true
      setTimeout(() => {
        this.extendTable.loading = false
      }, 2000)
    },
    // 扩展字段复选改变事件
    selectChange (items) {
      let extCols = []
      items.forEach(element => {
        extCols.push({ title: element.title, slot: element.key })
      })
      extCols.push({
        title: '操作',
        slot: 'action',
        width: 120
      })
      let cols = [{ type: 'index', width: 50, align: 'center' },
        { title: '排序', slot: 'orderIndex' },
        { title: 'KEY', slot: 'key' },
        { title: 'Value', slot: 'value' }]
      this.extendTable.cols = []
      this.extendTable.cols = [...cols, ...extCols]
      // console.log(items)
    },

    // 字典条目编辑状态
    handleEdit (row, index) {
      this.extendTable.editIndex = index
    },
    // 字典条目查看状态
    handleSave (index) {
      this.extendTable.editIndex = -1
    }
  }
}
</script>

<style lang="less">
.drawerFooter{ text-align: right}
.mainRooter{ margin:-10px;}
</style>

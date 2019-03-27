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
      :scrollable="true">
    <Tabs>
       <TabPane :label="$t('general')" icon="ios-paper-outline">

         <div>
          <Form :model="currentItem" :label-width="80">
            <Row :gutter="32">
                <i-col span="24">
                  <FormItem label="编码">
                    <i-Input v-model="currentItem.code" placeholder="Enter something..." ></i-Input>
                  </FormItem>
              </i-col>
            </Row>
            <Row :gutter="32">
                <i-col span="24">
                  <FormItem label="名称">
                    <i-Input v-model="currentItem.title" placeholder="Enter something..." ></i-Input>
                  </FormItem>
              </i-col>
            </Row>
            <Row :gutter="32">
                <i-col span="24">
                  <FormItem label="数据归岗">
                    <i-Input v-model="currentItem.group" readonly placeholder="Enter something..." >
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
          </Form>
         </div>
      </TabPane>
      <TabPane :label="$t('prop_user_role')" icon="md-list">
          <div style="padding-left:15px;">
            <Tree :data="itemDrawer.resouceDs" show-checkbox on-select-change="handleSelect"></Tree>
          </div>
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
import { getUserList, getResouceList, getGroupList } from '@/api/data'
export default {
  name: 'drag_drawer_page',
  components: {
    Tables,
    DragDrawer
  },
  data () {
    return {
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '用户名', key: 'userName', sortable: true },
        { title: '真实姓名', key: 'realName', sortable: true },
        { title: '昵称', key: 'nickName', sortable: true },
        { title: '电话', key: 'tel', sortable: true },
        { title: '邮箱', key: 'email', sortable: true },
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
        width: 600,
        minWidth: 600,
        title: 'Create',
        item: {},
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
      currentItem: {}

    }
  },
  computed: { },
  mounted () {
    getUserList().then(res => {
      this.items = res.data
    })
    getResouceList().then(res => {
      this.itemDrawer.resouceDs = res.data
    })

    getGroupList().then(res => {
      this.groupDrawer.groupDs = res.data
    })
    this.itemDrawer.title = this.$t('create')
  },
  methods: {
    dblclick (item) {
      this.edit(item)
    },
    edit (item) {
      this.itemDrawer.title = this.$t('edit')
      // this.itemDrawer.item = item
      this.currentItem = item
      this.itemDrawer.show = true
    },
    create () {
      this.itemDrawer.title = this.$t('create')
      // this.itemDrawer.item = {}
      this.currentItem = {}
      this.itemDrawer.show = true
    },
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
    }
  }
}
</script>

<style lang="less">
.drawerFooter{ text-align: right}
.mainRooter{ margin:-10px;}
</style>

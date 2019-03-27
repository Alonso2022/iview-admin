<template>
    <div class="mainRooter">

        <Table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="index">
                <span>{{ index+1 }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="value">
                <Input type="text" v-model="editValue" v-if="editIndex === index" />
                <span v-else>{{ row.value }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                    <Button @click="handleSave(index)" shape="circle" icon="md-checkmark" type="info" title="保存"></Button>
                    <Button @click="editIndex = -1" shape="circle" icon="md-close" type="default" title="取消"></Button>
                </div>
                <div v-else>
                    <Button @click="handleEdit(row, index)" shape="circle" icon="ios-create" type="primary" title="创建"></Button>
                    <Button  v-if="row.type !== 'SYSTEM'"  @click="editIndex = -1" shape="circle" icon="md-close" type="error" title="取消"></Button>
                </div>
            </template>
        </Table>
    </div>
</template>

<script>
export default {
  components: { },
  data () {
    return {
      columns: [
        {
          title: '#',
          width: 40,
          slot: 'index'
        },
        {
          title: '配置项',
          key: 'code',
          width: 150,
          fixed: 'left',
          sortable: true
        },
        {
          title: '类型',
          key: 'type',
          width: 100,
          sortable: true,
          filters: [
            {
              label: '系统',
              value: 'SYSTEM'
            },
            {
              label: '岗位',
              value: 'POSITION'
            },
            {
              label: '用户',
              value: 'USER'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.type.toUpperCase() === value.toUpperCase()
          }
        },
        {
          title: '目标',
          key: 'targetId',
          width: 100,
          sortable: true
        },
        {
          title: '值',
          slot: 'value'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '操作',
          slot: 'action',
          fixed: 'right',
          width: 120,
          className: 'action-column'
        }
      ],
      data: [
        {
          code: 'LANGUAGE',
          type: 'SYSTEM',
          targetId: 'system',
          value: 'ZH',
          description: '系统默认语言'
        },
        {
          code: 'ENABLE_LOG',
          type: 'POSITION',
          targetId: 'system',
          value: '1',
          description: '是否启用系统操作日志，如为1则启用'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editValue: '' // 第四列输入框
    }
  },
  methods: {
    handleEdit (row, index) {
      this.editValue = row.value
      this.editIndex = index
    },
    handleSave (index) {
      this.data[index].value = this.editValue
      this.editIndex = -1
    },
    getBirthday (birthday) {
      const date = new Date(parseInt(birthday))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang="less">
    .mainRooter{ margin:-10px;}
    .ivu-table td.action-column{
        text-align: center;
        padding: 0px;
        color: #fff;
        .ivu-btn{
            margin-right: 2px;
        }
    }
</style>

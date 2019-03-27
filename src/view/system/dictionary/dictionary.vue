<template>
    <div class="mainRooter">
    <Row :gutter="10">
      <i-col :md="24" :lg="6" style="margin-bottom: 10px;">
          <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>

      </i-col>
      <i-col :md="24" :lg="18" style="margin-bottom: 10px;">
          <Button @click="handleSearch" class="search-btn" type="primary" icon="ios-search">搜索</Button>
          <Button @click="handleSearch" class="search-btn" style="margin-left:10px;" type="default" icon="ios-search">高级搜索</Button>
          <Button @click="onDelete" class="search-btn" style="float:right; margin-left:10px;" type="error" icon="md-close">删除</Button>
          <Button @click="onCreate" class="search-btn" style="float:right" type="primary" icon="md-add">添加</Button>
      </i-col>
    </Row>

        <Table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="index">
                <span>{{ index+1 }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="title">
                <Input type="text" v-model="editTitle" v-if="editIndex === index" />
                <span v-else>{{ row.title }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                    <Button @click="handleSave(index)" shape="circle" icon="md-checkmark" type="info" title="保存"></Button>
                    <Button @click="editIndex = -1" shape="circle" icon="md-close" type="default" title="取消"></Button>
                </div>
                <div v-else>
                    <Button @click="handleEdit(row, index)" shape="circle" icon="ios-create" type="primary"  title="编辑"></Button>
                    <Button @click="editIndex = -1" shape="circle" icon="md-close" type="error" title="删除"></Button>
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
          title: '标识',
          key: 'code',
          width: 150,
          fixed: 'left',
          sortable: true
        },
        {
          title: '名称',
          key: 'title',
          sortable: true
        },
        {
          title: '描述',
          key: 'description',
          sortable: false
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
          code: 'DATA_CONTRONL_POINT',
          title: '数据控制点',
          description: '启用数据控制的功能点'
        },
        {
          code: 'ENABLE_LOG',
          title: 'POSITION',
          description: '1'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editTitle: '' // 第四列输入框
    }
  },
  methods: {
    handleEdit (row, index) {
      this.editTitle = row.value
      this.editIndex = index
    },
    handleSave (index) {
      this.data[index].title = this.editTitle
      this.editIndex = -1
    }
  }
}
</script>

<style lang="less" scoped>
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

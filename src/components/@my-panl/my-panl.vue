<template>
    <span>
        <i-button @click="onBtn" :class="btnClass" :type="type" :icon="icon">{{this.buttonTitle}}</i-button>
        <Drawer
            v-if="displayMode==='drawer'"
            v-model="displayPanl"
            placement="right"
            :title="panlTitle"
            :width="panlWidth"
            :mask-closable="true"
            :draggable ='true'
            :class-name="className"
            >

            <slot>

            </slot>

            <div class="demo-drawer-footer" v-if="footerHide===false" >
              <i-button type="primary" @click="onOk">{{ this.okTitle }}</i-button>
              <i-button style="margin-left: 8px" @click="onCancel">{{ this.cancelTitle }}</i-button>
            </div>
        </Drawer>

        <Modal
            v-if="displayMode==='modal'"
            v-model="displayPanl"
            fullscreen
            :title="panlTitle"
            :ok-text="okTitle"
            :cancel-text="cancelTitle"
            :class-name="className"
            :footer-hide="footerHide"

            >
            <slot>

            </slot>
            <div slot="footer" v-if="footerHide===false" >
              <i-button type="primary" @click="onOk">{{ this.okTitle }}</i-button>
              <i-button style="margin-left: 8px" @click="onCancel">{{ this.cancelTitle }}</i-button>
            </div>
        </Modal>
    </span>
</template>
<script>
export default {
  name: 'MyPanl',
  props: {
    // 显示模式 drawer || modal
    displayMode: {
      type: [String],
      default: 'drawer'
    },
    // 按钮文本
    buttonTitle: {
      type: [String],
      default: '标题'
    },
    // Panl标题
    panlTitle: {
      type: [String],
      default: '标题'
    },
    // Panl宽
    panlWidth: {
      type: [Number],
      default: 500
    },
    btnClass: {
      type: [String],
      default: ''
    },
    type: {
      type: [String],
      default: 'primary'
    },
    icon: {
      type: [String],
      default: 'md-alert'
    },
    okTitle: {
      type: [String],
      default: '提交'
    },
    cancelTitle: {
      type: [String],
      default: '取消'
    },
    className: {
      type: [String],
      default: ''
    },
    footerHide: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      key: '',
      displayPanl: false
    }
  },
  methods: {
    // 打开搜索面板
    openPanl () {
      this.displayPanl = true
    },
    // 关闭搜索面板
    closePanl () {
      this.displayPanl = false
    },
    onBtn () {
      this.$emit('onClickBefore')
      this.openPanl()
    },
    // 数据提交
    onOk () {
      this.$emit('onOk')
    },
    // 取消
    onCancel () {
      this.$emit('onCancel')
      this.closePanl()
    }
  }
}
</script>
<style lang="less">
    .ivu-drawer-body{
      position:static;
      padding-bottom: 50px;
      .demo-drawer-footer{
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          border-top: 1px solid #e8e8e8;
          padding: 10px 16px;
          text-align: right;
          background: #fff;
      }
    }
</style>

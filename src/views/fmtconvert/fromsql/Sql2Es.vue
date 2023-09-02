<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" @change="onTabChange">
      <a-tab-pane key="1" tab="配置">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="输入">
            <Codemirror ref="originCmRef" v-model:value="formState.origin" :options="cmOptions" :height="400" border
                        @change="onJsonChange"/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">确定</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="预览">
        <Codemirror v-model:value="result" :options="resultCmOptions" :height="800" border/>
      </a-tab-pane>
      <a-back-top/>
    </a-tabs>
    <div style="color: orangered">{{ parseError }}</div>
  </a-card>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import useCmConfig from "@/composables/useCmConfig";
 import {convert} from "@/lib/elasql/index.js"


export default defineComponent({
  setup() {
    const activeKey = ref('1');
    const tabPosition = ref('right');
    const formState = reactive({
      // 也用 json 名, 虽然 json schema, 格式上还是个 json
      origin: "select * from t_table where id between 100 and 110 and user_name like 'zhang%' and age < 30",
      tpl: '',
    });

    const parseError = ref(undefined);

    function onTabChange(currKey) {
      if (currKey == '2') {
        getResult();
      }
    }

    const onSubmit = () => {
      // console.log('submit!', toRaw(formState));
      getResult();
      activeKey.value = '2';
    };

    //代码提示需要覆盖 hintOptions, 但, 效果有点诡异, 按 t, 自动 TABLE 上屏, 不给选择的机会
    const {cmRef: originCmRef, cmOptions} = useCmConfig({
      theme: 'idea',
      mode: 'text/x-sql',
      lineWrapping: true,
    });
    const {cmOptions: resultCmOptions} = useCmConfig({
      mode: 'application/json',
      autofocus: true,
    })

    const onJsonChange = (evt) => {
      // console.log('onJsonChange', evt);
      // 每次修改, 都假设正确了, 将上次的 error 清空
      parseError.value = undefined;
    }

    /*
     * 结果:
     * [
     *  {path: key 路径, content: 内容 (java bean)}
     * ]
     */
    const result = ref('');

    function getResult() {

      try {
        let r = convert(formState.origin);
        // console.log("es", r)
        result.value = JSON.stringify(r, null, 2)
      } catch (e) {
        parseError.value = e.message;
        // activeKey 强行置回到 1
        activeKey.value = '1';
        throw e;
      }
    }

    /**
     * 解决锚点跳转后URL改变问题, hash模式下跳转有问题.
     * [Antd的anchor组件点击锚点导致路由发生变化_天猫精灵998的博客-CSDN博客_a-anchor](https://blog.csdn.net/weixin_43487782/article/details/108873639)
     */
    function onAnchorClick(e, link) {
      // 阻止点击的默认事件修改路由
      e.preventDefault();
    }

    const anchorTargetContainerRef = ref<HTMLElement | null>(null)

    function getAnchorTargetContainer() {
      console.log(anchorTargetContainerRef);
      return anchorTargetContainerRef.value;
    }

    return {
      activeKey,
      tabPosition,
      formState,
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      parseError,
      originCmRef,
      cmOptions,
      resultCmOptions,
      onTabChange,
      onSubmit,
      onJsonChange,
      result,
      onAnchorClick,
      anchorTargetContainerRef,
      getAnchorTargetContainer,
    }
  },
})

</script>

<style scoped>
/deep/ .CodeMirror {
  font-family: Arial, monospace;
  font-size: 16px;
}
</style>
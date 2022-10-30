<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" @change="onTabChange">
      <a-tab-pane key="1" tab="配置">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="JSON Schema">
            <Codemirror ref="jsonCmRef" v-model:value="formState.json" :options="cmOptions" :height="400" border @change="onJsonChange" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">确定</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="预览" >
        <!--<a-anchor style="text-align: left; float: left">-->
        <div class="anchor-container">
          <a-anchor :target-offset="40">
            <a-anchor-link v-for="item in result" :key="item.path"
                           :href="'#' + item.path"
                           :title="item.path" @click="onAnchorClick" />
          </a-anchor>
        </div>
        <a-row>
          <a-col v-for="item in result" :key="item.path" :xl="12" :md="24" >
            <a-card :bordered="false">
              <template v-slot:title><a style="height: 32px; font-weight: bold" :id="item.path">{{ item.path }}</a>
              </template>
              <Codemirror v-model:value="item.content" :options="jbCmOptions" :height="600" border/>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-back-top />
    </a-tabs>
    <div style="color: orangered">{{ parseError }}</div>
  </a-card>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRaw} from 'vue';
import {DemoJsonSchema} from "@/db/demodata";
import useCmConfig from "@/composables/useCmConfig";
import {jsonSchema2JavaBean} from "@/util";

export default defineComponent({
  setup() {
    const activeKey = ref('1');
    const tabPosition = ref('right');
    const formState = reactive({
      // 也用 json 名, 虽然 json schema, 格式上还是个 json
      json: DemoJsonSchema,
      tpl: '',
      isJavadocComment: '1',
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

    const {cmRef: jsonCmRef, cmOptions} = useCmConfig({theme:'idea'});
    const {cmOptions: jbCmOptions} = useCmConfig({
      mode: 'text/x-java',
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
    const result = ref([]);

    function getResult() {

      try {
        result.value = jsonSchema2JavaBean(formState.json);
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

    const anchorTargetContainerRef = ref<HTMLElement|null>(null)
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
      jsonCmRef,
      cmOptions,
      jbCmOptions,
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
  >>> .ant-anchor {
    display: flex;
    flex-wrap: wrap;
    flex-flow: wrap;
  }
  /*隐藏锚点菜单的小点*/
  >>> .ant-anchor-ink-ball.visible {
    display: none;
  }
</style>
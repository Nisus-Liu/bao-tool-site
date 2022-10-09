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
      <a-tab-pane key="2" tab="预览">
        <!--<Codemirror v-model:value="result" :options="cmOptions" :height="800" border />-->
        <div v-for="item in result" :key="item.path">
          {{item.path}}
          ---
          {{item.content}}
        </div>
      </a-tab-pane>
    </a-tabs>
    <div style="color: orangered">{{ parseError }}</div>
  </a-card>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRaw} from 'vue';
import {DemoJson1} from "@/db/demodata";
import useCmConfig from "@/composables/useCmConfig";
import {jsonSchema2JavaBean} from "@/util";


export default defineComponent({
  setup() {
    const activeKey = ref('1');
    const tabPosition = ref('right');
    const formState = reactive({
      // 也用 json 名, 虽然 json schema, 格式上还是个 json
      json: DemoJson1,
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

    const {cmRef: jsonCmRef, cmOptions} = useCmConfig();

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

      result.value = jsonSchema2JavaBean(formState.json);
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
      onTabChange,
      onSubmit,
      onJsonChange,
      result,
    }
  },
})

</script>

<style scoped>

</style>
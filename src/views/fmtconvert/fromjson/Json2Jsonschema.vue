<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" @change="onTabChange">
      <a-tab-pane key="1" tab="配置">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="JSON">
            <Codemirror ref="jsonCmRef" v-model:value="formState.json" :options="cmOptions" :height="400" border @change="onJsonChange" />
          </a-form-item>
          <!--<template v-if="toggleSearchStatus">
            <a-form-item label="模板">
              <Codemirror v-model:value="formState.tpl" :options="cmOptions" :height="200" border />
            </a-form-item>
          </template>-->
          <a-form-item label="选项">
            <a-checkbox-group v-model:value="formState.options" :options="optionsConfig">
              <template #label="{ label, tooltip }">
                <template v-if="tooltip">
                  <a-tooltip :title="tooltip">
                    {{ label }}
                  </a-tooltip>
                </template>
                <template v-else>
                  {{ label }}
                </template>
              </template>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <!--<a @click="handleToggleSearch" style="margin-right: 8px">
              {{ toggleSearchStatus ? '收起' : '展开' }}
              &lt;!&ndash;<a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>&ndash;&gt;
              <DownOutlined v-if="toggleSearchStatus"/><UpOutlined v-else />
            </a>-->
            <a-button type="primary" @click="onSubmit">确定</a-button>
            <!--<a-button style="margin-left: 10px">Cancel</a-button>-->
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="预览">
        <Codemirror v-model:value="result" :options="cmOptions" :height="800" border />
      </a-tab-pane>
    </a-tabs>
    <div style="color: orangered">{{ parseError }}</div>
    <!--<Codemirror
        v-model:value="code"
        :options="cmOptions"
        border
        placeholder="test placeholder"
        :height="200"
        @change="onCodeChange"
    />-->
  </a-card>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRaw} from 'vue';
import ipcRenderWrap from "@/ipc/ipc_render_wrap";
import {IpcChannel} from "@/ipc/ipc_channel";
import {JsonParser, ParseContext} from "bao-json";
import {json2JavaBean, json2Jsonschema} from "@/util/render";
import Codemirror from "codemirror-editor-vue3";
import {DemoJson1} from "@/db/demodata";
import useCmConfig from "@/composables/useCmConfig";
import {Option, Options} from "@/type";


export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const activeKey = ref('1');
    const tabPosition = ref('right');
    const result = ref('');
    const formState = reactive({
      json: DemoJson1,
      tpl: '',
      options: [Option.ValueAsMock],
    });

    const optionsConfig = [
      {value: Option.ValueAsMock, label: '值候补Mock', tooltip: 'mock字段空时, 值作为候补'},
    ]

    const parseError = ref(undefined);

    function getResult() {
      const parser = new JsonParser(formState.json);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let context: ParseContext = undefined;
      try {
        context = parser.parse();
      } catch (e) {
        parseError.value = e.message;
        // activeKey 强行置回到 1
        activeKey.value = '1';
        throw e;
      }
      console.log("----> context: ", context)

      const scobj = json2Jsonschema(context, new Options(formState.options));
      result.value = JSON.stringify(scobj, null, 2);
    }

    function onTabChange(currKey) {
      if (currKey == '2') {
        getResult();
      }
    }

    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
      getResult();
      activeKey.value = '2';
    };

    const {cmRef: jsonCmRef, cmOptions} = useCmConfig({
      mode: 'application/json',
      theme: 'xq-light',
    });

    const onJsonChange = (evt) => {
      // console.log('onJsonChange', evt);
      // 每次修改, 都假设正确了, 将上次的 error 清空
      parseError.value = undefined;
    }

    // -- 表单选项 展开-收起 --
    const toggleSearchStatus = ref(false);

    function handleToggleSearch() {
      toggleSearchStatus.value = !toggleSearchStatus.value;
    }

    return {
      activeKey,
      tabPosition,
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      formState,
      result,
      parseError,
      onSubmit,
      onTabChange,
      jsonCmRef,
      cmOptions,
      onJsonChange,
      toggleSearchStatus,
      handleToggleSearch,
      optionsConfig,
    };
  },
});
</script>

<style scoped>

</style>
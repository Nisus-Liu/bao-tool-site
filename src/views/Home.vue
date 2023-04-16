<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <n-card content-style="display: flex">
      <n-card style="text-align: left;" :bordered="false">
        <span>Baotool 旨在为广大程序员提供各种必备、好用、有趣的工具。</span>
        <n-list>
          <n-list-item>
            <template #prefix>
              <n-icon color="green">
                <CheckBoxDone/>
              </n-icon>
            </template>
            <span>格式转换：json转java对象，json转json schema等</span>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-icon color="grey">
                <CheckBoxTodo/>
              </n-icon>
            </template>
            <span>代码生成</span>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-icon color="grey">
                <CheckBoxTodo/>
              </n-icon>
            </template>
            <span>工具推荐</span>
          </n-list-item>
        </n-list>
      </n-card>
      <div style="width: 440px;float: right">
        <img src="../assets/payee/wechat.jpg" align="top" class="payqr"/>
        <img src="../assets/payee/alipay.jpg" align="top" class="payqr"/>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
//@ts-ignore
import {Checkbox as CheckBoxDone} from '@vicons/ionicons5'
//@ts-ignore
import {Checkbox as CheckBoxTodo} from '@vicons/carbon'


export default defineComponent({
  name: 'Home',
  components: {
    CheckBoxDone,CheckBoxTodo
  },
  methods: {}
});
</script>
<style>
.payqr {
  width: 200px;
  height: 200px;
  margin: 10px;
}
</style>

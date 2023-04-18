<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <n-card content-style="display: flex" style="height: 100vh">
      <n-card style="text-align: left;" :bordered="false">
        <div style="margin-bottom: 1rem">
          <span style="font-weight: bold">Baotool（宝兔）</span>
          <span>旨在为广大程序员提供各种必备、好用、有趣的工具。</span>
        </div>
        <n-list>
          <n-list-item>
            <template #prefix>
              <n-icon color="green">
                <CheckBoxDone/>
              </n-icon>
            </template>
            <span>格式转换：json转java对象，json转json schema等
              <!--<i>（能处理注释，
                <a href="https://www.npmjs.com/package/bao-json?activeTab=readme">bao-json - npm</a>&nbsp;
                <a href="https://github.com/wtgroup/bao-json">bao-json - github</a>
                ）</i>-->
              <i>
                （能处理注释
                <a target="_blank" href="https://github.com/wtgroup/bao-json"><img
                    src="https://img.shields.io/github/stars/wtgroup/bao-json.svg?style=social" alt="" title=""/></a>
                <a target="_blank" href="https://www.npmjs.com/package/bao-json"><img
                    src="https://img.shields.io/npm/v/bao-json" alt="npm" title=""/></a>
                ）
              </i>
            </span>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-icon color="grey">
                <CheckBoxTodo/>
              </n-icon>
            </template>
            <span>代码生成：我们都很懒的</span>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-icon color="grey">
                <CheckBoxTodo/>
              </n-icon>
            </template>
            <span>工具推荐：推荐好用工具，助你效率提升、工作舒心</span>
          </n-list-item>
          <n-list-item>
            <template #prefix>
              <n-icon color="grey">
                <CheckBoxTodo/>
              </n-icon>
            </template>
            <span>工具类库：Easyweb，简化 Java Web 开发的类库和 Springboot 启动器</span>
          </n-list-item>
        </n-list>
        <div style="color: #5c6065; font-style: italic; margin-top: 1rem">
          <span>名称由来：‘Bao’（宝），韦小宝之宝，创建项目时正在重温《鹿鼎记》，亦有宝物、宝器之意，和英文 Tool（工具）合并后得到 “Baotool”，谐音 <span
              style="font-weight: bold">“宝兔"</span>。</span>
        </div>
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
    CheckBoxDone, CheckBoxTodo
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

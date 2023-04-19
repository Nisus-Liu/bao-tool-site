<template>
  <!--<n-scrollbar style="max-height: 100vh">-->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="banner" v-model:collapsed="collapsed" collapsible>
        <div class="logo">
          <!--<span>BAO</span>-->
        </div>
        <n-menu mode="horizontal" :options="menuOptions" />
        <!--<a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
          <a-menu-item key="home">
            <router-link to="/home">Home</router-link>
          </a-menu-item>
          <a-sub-menu key="fromJson">
            &lt;!&ndash;<pie-chart-outlined />&ndash;&gt;
            <template #title>From JSON</template>
            <a-menu-item key="json2javabean">
              <router-link to="/json2javabean">To JavaBean</router-link>
            </a-menu-item>
            <a-menu-item key="json2jsonschema">
              <router-link to="/json2jsonschema">To JsonSchema</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="fromJsonSchema">
            <template #title>From JSON Schema</template>
            <a-menu-item key="jsonSchema2JavaBean">
              <router-link to="/jsonSchema2JavaBean">To JavaBean</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="about">
            &lt;!&ndash;<desktop-outlined />&ndash;&gt;
            <router-link to="/about">About</router-link>
          </a-menu-item>
        </a-menu>-->
      </a-layout-header>
      <div class="postionfixdiv"></div>
      <!--<a-layout>-->
      <!--<a-layout-header style="background: #fff; padding: 0" />-->
      <a-layout-content>
        <router-view/>
      </a-layout-content>
      <!--</a-layout>-->
      <a-layout-footer>
        © 2023 Baotool Project. All Rights Reserved.
      </a-layout-footer>
    </a-layout>
  <!--</n-scrollbar>-->
</template>

<script lang="ts">
import {ref} from 'vue';
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { h } from 'vue'

const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'Home',
                // path: '/home',
                // params: {
                //   lang: 'zh-CN'
                // }
              }
            },
            { default: () => 'Home' }
        ),
    key: 'Home',
    // icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'FmtConvert',
              }
            },
            { default: () => '格式转换' }
        ),
    key: 'FmtConvert',
    // icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
        // h(
        //     RouterLink,
        //     {
        //       to: {
        //         name: 'Easyweb',
        //       }
        //     },
        //     { default: () => 'Easyweb' }
        // ),
        h(
            'a',
            {
              href: 'https://nisus-liu.gitee.io/easyweb-document',
              target: '_blank',
              rel: 'noopenner noreferrer'
            },
            'Easyweb'
        ),
    key: 'Easyweb',
    // icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                path: '/about'
              }
            },
            { default: () => 'About' }
        ),
    key: 'About',
    // icon: renderIcon(WorkIcon)
  }
]

export default {
  name: "BasicLayout",
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['home']),
      menuOptions,
    };
  },
}
</script>

<style lang="scss" scoped>
$bannerHeight: 3rem;
$bannerBackground: #ffffff;

.ant-layout-header {
  height: $bannerHeight;
  background: $bannerBackground;
}

.ant-layout-header .ant-menu {
  height: $bannerHeight;
  line-height: $bannerHeight;
}

.banner {
  //background: url("../../img/banner.png") center center;
  background-size: auto;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  width: 100%;
  box-shadow: 0 0px 1px #bfbfbf;

  //:deep(.n-menu-item-content-header a) {
  //.n-menu.n-menu--horizontal .n-menu-item-content .n-menu-item-content-header a {
    //color: var(--color-white)!important;
    //color: #fff !important;
  //}
}

.logo {
  float: left;
  width: 120px;
  height: $bannerHeight;
  line-height: $bannerHeight;
  margin: 0 2rem;
  /*background: rgba(255, 255, 255, 0.3);*/
  background: url("../../img/logo2.png") center center no-repeat;
  background-size: 100%;

  span {
    color: #e1e1e1;
    font-weight: bold;
  }
}

.postionfixdiv {
  height: $bannerHeight;
  display: block;
  position: relative;
}



//.site-layout .site-layout-background {
//  background: #fff;
//}
//
//[data-theme='dark'] .site-layout .site-layout-background {
//  background: #141414;
//}
</style>
<template>
  <n-layout has-sider>
    <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="4"
        :width="240"
        :show-collapsed-content="false"
        show-trigger="arrow-circle"
        content-style="padding: 2rem;"
        bordered
    >
      <n-menu mode="vertical" :options="menuOptions"/>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <router-view/>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import {defineComponent, h} from "vue";
import type {MenuOption} from 'naive-ui'
import {RouterLink} from "vue-router";


export default defineComponent({
  // props: {
  // },
  setup(props, context) {

    const menuOptions: MenuOption[] = [
      {
        type: 'group',
        label: 'From JSON',
        key: 'FromJson',
        children: [
          {
            label: () =>
                h(
                    RouterLink,
                    {
                      to: {
                        name: 'Json2JavaBean',
                      }
                    },
                    {default: () => 'To JavaBean'}
                ),
            key: 'Json2JavaBean'
          },
          {
            label: () =>
                h(
                    RouterLink,
                    {
                      to: {
                        name: 'Json2Jsonschema'
                      }
                    },
                    {default: () => 'To Jsonschema'}
                ),
            key: 'Json2Jsonschema'
          },
        ]
      },
      {
        type: 'group',
        label: 'From JSON Schema',
        key: 'FromJsonSchema',
        children: [
          {
            label: () =>
                h(
                    RouterLink,
                    {
                      to: {
                        name: 'JsonSchema2JavaBean',
                      }
                    },
                    {default: () => 'To JavaBean'}
                ),
            key: 'JsonSchema2JavaBean'
          },
        ]
      },
    ]

    return {
      menuOptions,
    }
  }
});
</script>

<style scoped>

</style>
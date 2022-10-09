<template>
  <div>JSON schema ---> java bean --- {{abc}}</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRaw} from 'vue';


export default defineComponent({
  setup() {
    return {
      abc: "aaaabbcc"
    }
  },
})

</script>

<style scoped>

</style>
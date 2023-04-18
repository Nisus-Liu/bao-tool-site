<template>
  <div>
    <iframe src="https://wtgroup.gitee.io/yongheui-site/" id="easyweb-iframe" scrolling="no" frameborder="0" style="position:absolute;top:3rem;left: 0;right:0;bottom:0;"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted(){
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe(){
      const mobsf = document.getElementById('easyweb-iframe');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
    }

    changeMobsfIframe()

    window.onresize = function(){
      changeMobsfIframe()
    }
  }
}
</script>
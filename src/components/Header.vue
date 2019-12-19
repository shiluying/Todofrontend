<template>
  <div class="container el-row" style="height: fit-content;background-color: azure;">
    <div  style="float: left">
      <h1 id="appname">{{appname}}</h1>
    </div>
    <div class="userinfo" style="float: right;padding-right: 5%;">
      <br/>
      <p>{{username}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      appname: 'Todofrontend',
      username: '石露颖'
    }
  }
}
</script>

<style scoped>

</style>

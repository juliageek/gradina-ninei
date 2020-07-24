<template>
  <div class="layout">
    <header class="header">
      <SearchArea></SearchArea>
    </header>
    <NavBar></NavBar>
    <slot/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import SearchArea from "../components/Search";

export default {
  name: 'Default',
  components: { NavBar, SearchArea }
}
</script>


<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  margin: 0 auto;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

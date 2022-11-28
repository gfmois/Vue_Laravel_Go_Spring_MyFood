<script>
import { RouterView } from 'vue-router'
import {Header, Footer} from './components/layout'

export default {
    components: {
        Header,
        Footer
    }
}
</script>

<template>
  <Header/>
  <main>
    <RouterView />
  </main>
  <Footer/>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
}
body {
  background-color: #fdecda;
}

body::-webkit-scrollbar { display: none; }

main {
  min-height: calc(100vh - 16vh);
}
</style>

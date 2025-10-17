
<script>
import Navbar from './Navbar/Navbar.vue'
export default {
  components: { Navbar },
}
</script>
<template>
  <div class="overflow-hidden">
    <Navbar></Navbar>
    <router-view></router-view>
    <aside>
      <Advantages />
      <Feedback />
    </aside>


    <Footer />
  </div>
</template>




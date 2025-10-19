
<script>
import Navbar from './navbar/Navbar.vue'
import Advantages from './components/Footer/Advantages.vue'
import Feedback from './components/Footer/Feedback.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  components: { Navbar, Advantages, Feedback, Footer },
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




<script>
import Search from './Search.vue'
import Burger from './Burger.vue'
export default {
  components: { Search, Burger },
}

</script>

<template>
  <div>
    <header class="header">
      <div class="center header-wrap">
        <div class="center header_left">

          <Search />
        </div>
        <div class="header-right">
          <Burger />
          <Registration />
          <Bascet />

        </div>
      </div>
    </header>
  </div>
</template>



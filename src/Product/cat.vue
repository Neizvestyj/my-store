<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
name: 'cat',
setup() {
const store = useStore();
const catalogProduct=computed(()=>{
return store.getters.catalogProduct;
});
return{catalogProduct,};
}
};
</script>
<template>
<div>
<div class="card-block">
 <figure 
v-for="card in  catalogProduct" 
:key="card.id"

class="item-card">
 <img  class="item-card__image" :src="card.image" alt="">

<div class="item-card__overlay"> 
</div>


<figcaption class="item-card__description">
<a href="#" class="item-card__link">                                    <h4 class="item-card__description_title">ELLERY X M'O CAPSULE</h4>
                                    <p class="item-card__description_text">Known for her sculptural takes on                                       traditional                           
tailoring,                                  Australian                                   arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
 </a>
<p class="item-card_price">$ {{card.price}}</p>
</figcaption>
</figure>
</div>
</div>

</template>
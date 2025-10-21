<script>
import { ref,computed,onMounted,onBeforeUnmount} from 'vue';
import { useStore } from 'vuex';
import filterProduct from './filterProduct.vue';
import textProduct from './textProduct.vue';
import Swiper from 'swiper';
export default {
name: 'cardSlider',
components:{
filterProduct,textProduct},
setup() {
const store = useStore();
const swiper=ref(null);
const current=ref(0);
const filteredCards=computed(()=>{
return store.getters.cards;
    });
const card=computed(()=>{
return filteredCards.value[current.value] || {};
    });
  
onMounted(()=>{
const el = swiper.value.$refs.mySwiper;
    // Инициализация Swiper (тач/перелистывание включены по умолчанию)
    swiper.value = new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: false,
      grabCursor: true,
      threshold: 20,
      touchRatio: 1,
      simulateTouch: true,
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev')
      },
      on: {
        slideChange: () => {
          const idx = (swiper.value.realIndex !== undefined) ? swiper.value.realIndex : swiper.value.activeIndex;
current.value = idx;

          //this.$emit("change-card", this.card);
          //передаем к родителю
        }
      }
    });
    // начальный индекс
current.value = swiper.realIndex.value !== undefined ?swiper.value.realIndex : swiper.value.activeIndex;
    // this.$emit("change-card", this.card);
  });

onBeforeUnmount(()=>{
if(swiper.value && typeof swiper.value.destroy === 'function') {
swiper.value.destroy(true, true);
swiper.value = null;
    }
  });

const goNext=()=>{
  if (swiper.value) swiper.value.slideNext();
    };
    const goPrev=()=>{
      if (swiper.value) swiper.value.slidePrev();
    };
    // page — 0-based индекс
    const goToPageSlider=(page)=>{
      if (!swiper.value || !filteredCards.value.length) return;
const safePage = Math.max(0, Math.min(page,filteredCards.value.length - 1));
swiper.value.slideTo(safePage);
    };
return{
swiper,
current,
filteredCards,
card,
goNext,
goPrev,
goToPageSlider,
};
},
};
</script>
  <template>
  <div>
    <div>
<div class="swiper-container" ref="mySwiper">
<div class="swiper-wrapper">
<div class="swiper-slide" v-for="(s, i) in filteredCards" :key="i">
<img  class="item-card__image" :src="s.image" alt="">
</div>

</div>

      <!-- Пагинация и стрелки -->
<div class="swiper-pagination"></div>
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>
</div>

 <div class="controls" style="margin-top:12px;">
        <button @click="goPrev">Prev</button>
        <button @click="goNext">Next</button>
        <button @click="goToPageSlider(0)">To first</button>
        <span>Current: {{ current + 1 }} / {{ filteredCards.length }}</span>
      </div>
    </div>
<textProduct :card="card"></textProduct>
    
    
    </div>
</template>
<script>
alert('promoProduct')
import { computed } from 'vue';
import { useStore } from 'vuex';
import cardSlider from './cardSlider.vue';
import cat from './cat.vue';
export default {
    name: 'promoProduct',
    components: { cardSlider, cat },
    setup() {
        const store = useStore(); // Используем Vuex Store
        const cards = computed(() => {
            return store.getters.sliderCatalog;
        });

        return {
            cards,
        };
    },
};
</script>

<template>
    <div>

        <div class="promo-mini center">
            <div class="heading-left">NEW ARRIVALS </div>
            <div class="heading-right">
                <a class="promo-mini-home" href="index.html">HOME /</a>
                <a class="promo-mimi-men" href="#">MEN /</a>
                <a class="promo-mini-arrivals" href="#"><span class="arrivals">NEW ARRIVALS</span></a>
            </div>
        </div>

        <cardSlider :cards="cards"></cardSlider>
        <cat></cat>

    </div>
</template>
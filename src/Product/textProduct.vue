<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import filterProduct from './filterProduct.vue';

export default {
    name: 'textProduct',
    components: { filterProduct },
    props: {
        card: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const store = useStore();
        const grandTotal = computed(() => {
            return store.state.sum
        });

        return {
            grandTotal,
            card: props.card,
        };
    },
};
</script>

<template>
    <div>
        <div class="about wrap">
            <div class="center wrap center-about">
                <h1 class="center-about-h1">WOMEN COLLECTION</h1>
            </div>
            <div class="center-line">
                <img src="img/linepink.svg" alt="linepink"> </img>
            </div>
            <div>
                <h2 class="center-about-h2">MOSCHINO CHEAP AND CHIC</h2>
            </div>
            <div>
                <p class="center-about-p">Compellingly actualize fully researched processes before proactive
                    outsourcing.
                    Progressively syndicate
                    collaborative architectures before cutting-edge services. Completely visualize parallel core
                    competencies rather than exceptional portals. </p>
            </div>
            <div>
                <p class="sale561">$ {{ grandTotal }}</p>
            </div>
            <hr class="hr">

            <filter-product :card="card"></filter-product>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: "pagination",
    setup() {
        const store = useStore();

        const count = ref(1);

        const totalPages = computed(() => {
            return store.getters.totalPages;
        });

        const currentPage = computed(() => {
            return store.state.currentPage;
        });

        const goToPage = (pageNumber) => {
            if (pageNumber >= 1 && pageNumber <= totalPages.value) {
                store.dispatch('goToPage', pageNumber);
            }
        };
        return {
            store,
            count,
            goToPage,
            totalPages,
            currentPage,
        };
    },
};

</script>
<template>
    <div>
        <nav class="botton">
            <div class="botton-block center">
                <div class="button-page">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="button-left but-but but-size but-cursor"><i
                            class="fas fa-chevron-left aria-hidden"></i></button>
                    <div class="button-page-num">
                        <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                            :class="{ colorRed: currentPage === page }" class="but-1 but-but but-size but-cursor">{{ page
                            }}</button>

                        <div class="botton-20 but-but but-size">
                            <p class="pages-dash but-cursor">.....</p>
                            <button class="but-20 but-but but-size but-cursor ">20</button>
                        </div>
                    </div>
                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="button-right but-but but-size but-cursor "><i class="fas fa-chevron-right"></i></button>


                </div>
            </div>

        </nav>
    </div>
</template>
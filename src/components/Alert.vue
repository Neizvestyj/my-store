<script>
alert('alert')
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
export default {
    name: "Alert",
    setup() {
        const store = useStore();
        // Используем ref для доступа к элементу
        const alertRef = ref(null);
        const isValid = computed(() => {
            return store.state.isValid;
        });
        const closed = () => {
            //store.dispatch("hideAlert");
            store.commit('setIsValid', false);
            alertRef.value.classList.remove("show");
            // Используем реф для доступа к DOM элементу
        };
        watch(isValid, (newValue) => {
            if (newValue) {
                console.log(isValid.value);
                setTimeout(() => {
                    closed(); console.log("Скрываем алерт через 2 секунды");

                }, 6000);
            }
        });
        return {
            isValid,
            closed,
            alertRef
        };
    },
};


</script>
   
<template>
    <div @click="closed" v-if="isValid" class="alert" :class="{ show: isValid }">
        <p class="alert-title">Сообщение отправлено </p>
    </div>
</template >
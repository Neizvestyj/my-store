<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'Search',
    setup() {
const store = useStore(); // Используем Vuex Store

const searchText = ref(""); // Создаем реактивную переменную для поиска
const flag = ref(false); // Создаем флаг, если необходимо
const changeSearchFlag = (event) => {
event.preventDefault();
flag.value = !flag.value;
        };

const submit = (event) => {
event.preventDefault();
            store.dispatch('searchCards', searchText.value); 
// Отправляем действие в Store
flag.value = false; 
// Сбрасываем флаг
searchText.value = ""; 
// Очищаем поле ввода
        };

const stopPropagation = (event) => {            event.stopPropagation(); // Остановим всплытие события
        };
return {
            searchText,
            flag,
            changeSearchFlag,
            submit,
            stopPropagation,
        };
    },
};


</script>


<template>
    <div>
        <form class="my-form" @submit="submit" @click="stopPropagation">
            <input v-model.trim=searchText class="my-input" type="text" placeholder="Искать здесь...">
            <button class="my-button" type="submit"></button>
        </form>
    </div>
</template>
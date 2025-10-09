// src/store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cards: [], // загружает async fetchCards начальный массив карточек
            filteredCards: [],
        };
    },
    mutations: {
        setCards(state, products) {//вызывается в fetchCards 
            console.log("Products set in state:", products);
            state.cards = products; // Устанавливаем карточки в состояние
            state.filteredCards = products; // Устанавливаем также фильтрованные карточки по умолчанию
            state.filteredCatalog = products; // Устанавливаем каталог
        },
        searchCards(state, searchText) {
            if (searchText.trim() === "") {
                state.filteredCards = state.cards; // Если пусто, показываем все карты
            } else {
                // Иначе фильтруем по вхождению строки
                state.filteredCards = state.cards.filter(t => t.name.toLowerCase().includes(searchText.toLowerCase())
                );
                state.filteredCatalog = state.cards.filter(t => t.name.toLowerCase().includes(searchText.toLowerCase())
                );
            }
        },
    },
    actions: {
        async fetchCards({ commit }) {
            try {
                console.log('data');
                const response = await fetch('https://raw.githubusercontent.com/Neizvestyj/cardShop/master/data.json');
                // Укажите URL вашего API
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log('data');
                console.log(data);
                commit('setCards', data.products);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                alert("error")
            }
        },
        searchCards({ commit }, searchText) {
            commit('searchCards', searchText); // вызываем мутацию
        },
    },
    getters: {

        cards: state => state.cards,
        filteredCards: state => state.filteredCards,
    },
});
store.dispatch('fetchCards');
// Экспортируем Store по умолчанию
export default store;

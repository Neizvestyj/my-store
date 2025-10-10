// src/store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cards: [], // загружает async fetchCards начальный массив карточек
            filteredCards: [],// Фильтрованные карточки
            filteredCatalog: [],// Каталог карточек
            isOpen: false,//флаг для бургера 
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
        toggleMenu(state) {
            state.isOpen = !state.isOpen;
        },
        closeMenu(state) {
            state.isOpen = false;
        },
    },
    actions: {
        async fetchCards({ commit }) {
            try {
                console.log('data');
                const response = await fetch('https://raw.githubusercontent.com/Neizvestyj/cardShop/master/data.json');

                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                commit('setCards', data.products);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                alert("Ошибка при загрузке данных");
            }
        },

        searchCards({ commit }, searchText) {
            commit('searchCards', searchText);
        },

        onOutside({ commit }, menu) {
            const outsideClickHandler = (event) => {
                //Провереяем не был ли клик в меню
                if (!menu || !menu.contains(event.target)) {
                    commit("closeMenu");
                    commit("closeColor");
                    document.removeEventListener("click", outsideClickHandler)
                }
            };
            document.addEventListener("click", outsideClickHandler);
        },
        clearOutsideListener({ commit }) {
            //document.removeEventListener("click",outsideClickHandler);
        },
        toggleMenu({ commit }) {
            commit("toggleMenu"); // Вызов мутации для переключения состояния
        },
        closeMenu({ commit }) {
            commit("closeMenu"); // Вызов мутации для переключения состояния
        },
    },
    getters: {
        cards: state => state.cards,
        filteredCards: state => state.filteredCards,
        filteredCatalog: state => state.filteredCatalog,
    },
});
store.dispatch('fetchCards');
// Экспортируем Store по умолчанию
export default store;

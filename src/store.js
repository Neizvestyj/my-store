// src/store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cards: [], // загружает async fetchCards начальный массив карточек
            filteredCards: [],// Фильтрованные карточки
            filteredCatalog: [],// Каталог карточек
            cart: [],
            isOpen: false,//флаг для бургера 
            isValid: false,//флаг для карт
            sum: 0,
            //компонент pagination
            currentPage: 1,
            itemsPerPage: 2,
            currentImage: 0,
            // компонент Product
            sliderPage: 1,
            sliderItemsPerPage: 1,

        };
    },
    mutations: {
        //компонент Search
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
        //компонент Burger
        toggleMenu(state) {
            state.isOpen = !state.isOpen;
        },
        closeMenu(state) {
            state.isOpen = false;
        },

        //компонент Cart
        del(state, idDel) {
            const cardToRemove = state.cart.find(c => c.id === idDel);
            if (cardToRemove) {
                state.sum -= cardToRemove.price;
            }
            state.cart = state.cart.filter(c => c.id !== idDel);
        },
        buy(state) {
            state.sum = 0;
            state.cart = [];
            console.log("Clearing cart");
        },
        clear(state) {
            state.cart = [];
            console.log("Clearing cart");
        },
        increaseQuantity(state, { quantity, currentImage }) {
            const card = state.cart.find(item => item.id === currentImage);
            if (card) {
                //state.sum -= card.price * card.quantity;
                card.quantity = quantity;
                state.sum += card.price  //card.quantity;

            }
        },
        decreaseQuantity(state, { quantity, currentImage }) {
            const card = state.cart.find(item => item.id === currentImage);
            if (card) {
                //state.sum -= card.price * card.quantity;
                card.quantity = quantity;
                state.sum += card.price  //card.quantity;
            }
        },
        //компонент Promo
        add(state, payload) {
            const { currentImage, color, size, quantity } = payload;
            if (currentImage == null) {
                console.error("currentImage is null");
                return;
            }
            const productToAdd = state.filteredCards.find(item => item.id === currentImage);

            // Проверка найденного продукта
            if (!productToAdd) {
                console.error(`Product with id ${currentImage} not found in state.cards`);
                return; // Если продукт не найден, выходим из функции
            }

            const existingProduct = state.cart.find(item => item.id === productToAdd.id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
                state.sum += existingProduct.price * quantity; // Увеличиваем сумму на стоимость добавленного объема
            } else {
                const newProduct = { ...productToAdd, quantity, color, size };
                state.cart.push(newProduct);
                state.sum += newProduct.price * newProduct.quantity; // Увеличиваем сумму на стоимость нового продукта
            }
        },

        //фильтрация в Catalog
        //компонент navFilter
        sortFilteredCards(state, { filter, priceRanges }) {
            let filteredProducts = state.cards;
            // Фильтрация по диапазонам цены
            if (priceRanges.length > 0) {
                filteredProducts = filteredProducts.filter(item => {
                    return priceRanges.some(range => {
                        if (range === "$0 - $50") return item.price <= 50;
                        if (range === "$50 - $100") return item.price > 50 && item.price <= 100;
                        if (range === "$100 - $200") return item.price > 100 && item.price <= 200;
                        if (range === "Over $200") return item.price > 200;
                        return false;
                    });
                });
            }
            // Фильтрация по трендам
            if (filter === "trending") {
                filteredProducts = filteredProducts.filter(t => t.trending === true);
            }
            state.filteredCatalog = filteredProducts;
        },

        //компонент pagination
        setCurrentPage(state, page) {
            state.currentPage = page;
        },

        //компонент Footer/Feedback
        login(state) {
            alert("Сообщение отправлено ");
        },
        //компонент Alert
        setIsValid(state, value) {
            state.isValid = value
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
        //компонент Promo 
        add({ commit }, payLoad) {
            commit("add", payLoad)
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
        //компонент Cart
        del({ commit }, idDel) {
            commit("del", idDel)
        },
        buy({ commit }) {
            commit("buy")
        },
        clear({ commit }) {
            commit("clear")
        },
        increaseQuantity({ commit }, { quantity, currentImage }) {
            commit("increaseQuantity", { quantity, currentImage })
        },
        decreaseQuantity({ commit }, payload) {
            commit("decreaseQuantity", payload);
        },
        sortItems({ commit }, { filter, priceRanges }) {
            commit("sortFilteredCards", { filter, priceRanges })
        },
        sortCheckbox({ commit }, { filter, priceRanges }) {
            commit("sortFilteredCards", { filter, priceRanges }); // Используем новую мутацию
        },
        //компонент pagination
        goToPage({ commit }, page) {
            commit('setCurrentPage', page);
        },

        //компонент Footer/Feedback
        login({ commit }) {
            commit("login")
        },
        //компонент Alert
        hideAlert({ commit }) {
            commit("setIsValid", false)
        },
        setIsValid({ commit }) {
            commit("setIsValid", false)
        },

    },
    getters: {
        cards: state => state.cards,
        filteredCards: state => state.filteredCards,
        filteredCatalog: state => state.filteredCatalog,
        //компонент pagination
        totalPages(state) {
            return Math.ceil(state.filteredCatalog.length / state.itemsPerPage);
        },
        paginatedCatalog(state) {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.filteredCatalog.slice(start, end + 1);
        },
        //компонент Product
        sliderCatalog(state) {
            const start = (state.sliderPage - 1) * state.sliderItemsPerPage;
            const end = start + state.sliderItemsPerPage;
            return state.filteredCatalog.slice(start, end);
        },
    },
});
store.dispatch('fetchCards');
// Экспортируем Store по умолчанию
export default store;

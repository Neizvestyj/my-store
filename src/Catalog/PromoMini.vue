
<script setup>
alert("promomini")

import { ref, computed } from 'vue';
import { useStore } from '../store';
import navFilter from './navFilter.vue';
import catalogBlock from './catalogBlock.vue';
import pagination from './pagination.vue';
</script>
<template>
    <div>

        <div class="promo-mini center">
            <div class="heading-left">NEW ARRIVALS </div>
            <div class="heading-right">
                <a class="promo-mini-home" href="#">HOME /</a>
                <a class="promo-mimi-men" href="#">MEN /</a>
                <a class="promo-mini-arrivals" href="#"><span class="arrivals">NEW ARRIVALS</span></a>
            </div>
        </div>
        <nav-filter></nav-filter>
        <catalog-block></catalog-block>
        <pagination></pagination>
    </div>
</template>


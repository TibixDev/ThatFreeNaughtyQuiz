<template>
    <Header/>
    <div>
        <router-view></router-view>
    </div>
    <Footer/>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');

body {
    @apply bg-neutral-900 text-white text-xl;
    /* font-family: 'Poppins', sans-serif; */
    font-family: "Neucha", cursive;
    font-optical-sizing: auto;
    font-style: normal;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #c75b02
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #b04f00;
}
</style>
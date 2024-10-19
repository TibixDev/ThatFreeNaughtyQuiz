<template>
    <div class="py-12 bg-orange-400 mb-12">
        <div class="flex flex-col items-center justify-center gap-6 px-12">
            <h1 class="text-6xl">❤️</h1>
            <h1 class="text-6xl font-bold text-white text-center">Find Something New to Try Tonight!</h1>
            <p class="text-2xl text-white text-center">Discover your shared sexual desires without the fear of embarrassment😳</p>
        </div>
    </div>
    <div class="px-8 py-12 bg-neutral-800 container mx-auto rounded-lg mb-10">
        <h2 class="font-semibold text-orange-400 text-4xl mb-10 text-center">Get Started</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div id="your-info" class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-3xl font-bold mb-6 text-orange-400">Your Info</h2>
                <label for="your-name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                    type="text"
                    name="your-name"
                    id="your-name"
                    v-model="state.p1.name"
                    placeholder="Enter your name"
                    class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                >
                <label class="block text-sm font-medium text-gray-700 mb-1">Your Gender</label>
                <div class="flex gap-4">
                    <button
                        @click="state.p1.gender = 'male'"
                        class="generic-hover"
                        :class="['flex-1 py-2 px-4 rounded-md font-semibold', state.p1.gender === 'male' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700']"
                    >
                        Male
                    </button>
                    <button
                        @click="state.p1.gender = 'female'"
                        class="generic-hover"
                        :class="['flex-1 py-2 px-4 rounded-md font-semibold', state.p1.gender === 'female' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700']"
                    >
                        Female
                    </button>
                </div>
                <label class="block text-sm font-medium text-gray-700 mt-3 mb-1">Your Color</label>
                <div class="flex gap-2 mb-4">
                    <button
                        v-for="color in availableColors"
                        :key="color"
                        @click="selectColor('p1', color)"
                        class="w-8 h-8 rounded-full border-4 generic-hover generic-disabled disabled:opacity-30"
                        :class="[state.p1.color === color ? 'border-black/20 animate-pulse scale-125' : 'border-transparent']"
                        :style="{ backgroundColor: color }"
                        :disabled="state.p2.color === color"
                    ></button>
                </div>
            </div>
            <div id="partner-info" class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-3xl font-bold mb-6 text-orange-400">Partner's Info</h2>
                <label for="partner-name" class="block text-sm font-medium text-gray-700 mb-1">Partner's Name</label>
                <input
                    type="text"
                    name="partner-name"
                    id="partner-name"
                    v-model="state.p2.name"
                    placeholder="Enter partner's name"
                    class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
                >
                <label class="block text-sm font-medium text-gray-700 mb-1">Partner's Gender</label>
                <div class="flex gap-4">
                    <button
                        @click="state.p2.gender = 'male'"
                        class="generic-hover"
                        :class="['flex-1 py-2 px-4 rounded-md font-semibold', state.p2.gender === 'male' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700']"
                    >
                        Male
                    </button>
                    <button
                        @click="state.p2.gender = 'female'"
                        class="generic-hover"
                        :class="['flex-1 py-2 px-4 rounded-md font-semibold', state.p2.gender === 'female' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700']"
                    >
                        Female
                    </button>
                </div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Partner's Color</label>
                <div class="flex gap-2 mb-4">
                    <button
                        v-for="color in availableColors"
                        :key="color"
                        @click="selectColor('p2', color)"
                        class="w-8 h-8 rounded-full border-4 generic-hover generic-disabled disabled:opacity-30"
                        :class="[state.p2.color === color ? 'border-black/20 animate-pulse scale-125' : 'border-transparent']"
                        :style="{ backgroundColor: color }"
                        :disabled="state.p1.color === color"
                    ></button>
                </div>
            </div>
        </div>
        <div class="mt-10 flex items-center justify-center">
            <button
                @click="startQuiz"
                class="bg-orange-400 hover:bg-orange-500 text-white text-3xl font-bold py-6 px-36 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
                Go!
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuizStore } from "../store/quizstore";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const $router = useRouter();
const store = useQuizStore();
const { state, activePlayer } = storeToRefs(store);

const availableColors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];

// Reset quiz data on entry
onMounted(() => {
    state.value.p1.quizData = null;
    state.value.p2.quizData = null;
})

function selectColor(player: 'p1' | 'p2', color: string) {
    state.value[player].color = color;
}

function startQuiz() {
    activePlayer.value = "p1";
    $router.push("/quiz");
}
</script>

<style scoped>

</style>

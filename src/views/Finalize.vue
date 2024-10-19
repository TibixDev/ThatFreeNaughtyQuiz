<template>
    <div>
        <div class="py-12 bg-orange-400 mb-12">
            <div class="flex flex-col items-center justify-center gap-6 px-12">
                <h1 class="text-6xl">✍️</h1>
                <h1 class="text-6xl font-semibold text-center">Finalize your quiz</h1>
                <p class="text-2xl text-white text-center">Discover new things with your partner</p>
            </div>
        </div>
        <div class="container mx-auto px-4 py-8">
            <div v-if="!bothPlayersCompleted" class="bg-neutral-800 rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-2xl font-semibold mb-4">{{ state.p1.name }}'s Quiz Completed!</h2>
                <p class="mb-6">Choose how you want to proceed:</p>
                <div class="flex flex-row gap-4">
                    <button @click="copyLink"
                        class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
                        Copy Link for Partner
                    </button>
                    <button @click="continueLocally"
                        class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
                        Continue Locally
                    </button>
                </div>
            </div>

            <div v-else>
                <h2 class="text-4xl font-semibold mb-6">Quiz Results</h2>
                <div class="flex flex-row justify-between mb-8">
                    <span class="block sm:hidden text-2xl font-bold" :style="{ color: state.p1.color }">{{ state.p1.name }}</span>
                    <span class="block sm:hidden text-2xl font-bold" :style="{ color: state.p2.color }">{{ state.p2.name }}</span>
                </div>
                <div v-for="(category, categoryKey) in categories" :key="categoryKey" class="mb-8">
                    <h3 class="text-2xl font-semibold text-orange-400 mb-4">{{ category.title }}</h3>
                    <div class="bg-neutral-800 rounded-lg shadow-lg p-2 sm:p-6">
                        <div v-for="question in getCategoryQuestions(categoryKey)" :key="question.id"
                            class="mb-4 pb-4 border-b-2 border-neutral-600/50 last:border-b-0">
                            <p class="font-medium mb-2 text-2xl">{{ question.maleQuestion }}</p>
                            <div class="flex justify-center sm:justify-between items-center w-full">
                                <span class="hidden sm:block" :style="{ color: state.p1.color }">{{ state.p1.name }}</span>
                                <div class="answers flex flex-row gap-4">
                                    <button v-for="answer in [1, 2, 3, 4, 5]" :key="answer"
                                        :class="['px-3 sm:px-6 md:px-8 lg:px-10 py-1 rounded-md', { 'border-orange-400 border-2': !hasColor(question.id, answer, 'p1', 'p2') }]"
                                        :style="getButtonStyle(question.id, answer, 'p1', 'p2')" disabled>
                                        {{ getAnswerEmoji(answer) }}
                                    </button>
                                </div>
                                <span class="hidden sm:block" :style="{ color: state.p2.color }">{{ state.p2.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="copyLink"
                    class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg
                    transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 mx-auto block">
                    Copy Results Link
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useQuizStore } from "@/store/quizstore";
import { questions, categories, Question } from "../utils/questions";
import { compressAndEncode } from "../utils/crypto"

const $router = useRouter();
const store = useQuizStore();
const { state, activePlayer } = storeToRefs(store);

const bothPlayersCompleted = computed(() => state.value.p1.quizData && state.value.p2.quizData);

onMounted(() => {
    if (!state.value.p1.quizData) $router.push("/");
});

function copyLink() {
    const encodedState = compressAndEncode(state.value);
    const link = `${window.location.origin}/shared?state=${encodedState}`;
    navigator.clipboard.writeText(link).then(() => {
        alert("Link copied to clipboard!");
    });
}

function continueLocally() {
    activePlayer.value = "p2";
    $router.push("/quiz");
}

function getCategoryQuestions(category: string): Question[] {
    return questions.filter(q => q.category === category);
}

function getAnswerEmoji(answer: number): string {
    const emojis = ["", "🤮", "😕", "🤷", "😀", "😍"];
    return emojis[answer] || "";
}

function hasColor(questionId: number, answer: number, player1: string, player2: string): boolean {
    const p1Answer = state.value[player1].quizData[questionId];
    const p2Answer = state.value[player2].quizData[questionId];
    return p1Answer === answer || p2Answer === answer;
}

function getButtonStyle(questionId: number, answer: number, player1: string, player2: string): object {
    const p1Answer = state.value[player1].quizData[questionId];
    const p2Answer = state.value[player2].quizData[questionId];
    const p1Color = state.value[player1].color;
    const p2Color = state.value[player2].color;

    if (p1Answer === p2Answer && p1Answer === answer) {
        return {
            background: `linear-gradient(to right, ${p1Color}, ${p2Color})`,
            color: 'white',
            border: '0px solid #00000033'
        };
    } else if (p1Answer === answer) {
        return { backgroundColor: p1Color, color: 'white', border: '2px solid #00000033' };
    } else if (p2Answer === answer) {
        return { backgroundColor: p2Color, color: 'white', border: '2px solid #00000033' };
    }

    return {};
}
</script>

<template>
    <div v-if="activePlayer">
        <div id="category" class="flex flex-col items-center bg-orange-300 py-16">
            <h1 class="text-4xl mb-3 font-semibold">{{ currentCategory.title }}</h1>
            <p>{{ currentCategory.punchline }}</p>
        </div>
        <div id="questions" class="p-3 container mx-auto mt-3">
            <p class="text-gray-300">{{ currentCategory.description }}</p>
            <h2 class="mt-6 mb-2 text-3xl font-semibold">Questions ({{ categoryQuestions.length }})</h2>
            <div class="progress w-full h-6 bg-neutral-600 my-4 rounded-md relative">
                <p class="text-sm font-bold z-[100] absolute left-3 top-[50%] translate-y-[-50%]">{{ currentCategoryIdx + 1 }} of {{ Object.keys(categories).length }}</p>
                <div
                    class="absolute left-0 top-0 h-full bg-red-500 rounded-md z-0"
                    :style="`width: ${((currentCategoryIdx + 1 ) / Object.keys(categories).length) * 100}%`"
                >
                </div>

            </div>
            <div class="flex flex-col gap-5 p-2">
                <button 
                    class="bg-orange-500 generic-hover py-0.5 rounded-lg" 
                    @click="debugFill"
                    v-show="showDebugFill"
                >Debug Fill</button>
                <div
                    v-for="question, k of categoryQuestions"
                    :key="k"
                    class="flex flex-col lg:flex-row justify-between items-center pb-5 px-2"
                    :class="{ 'border-b-2 border-neutral-600/50': k !== categoryQuestions.length - 1 }"
                >
                    <h3 class="question mb-6 lg:mb-0">
                        {{
                            (state[activePlayer].gender == "male" ? question.maleQuestion : question.femaleQuestion)
                                .replace("your partner", state[activePlayer == "p1" ? "p2" : "p1"].name)
                        }}
                    </h3>
                    <div class="answers flex flex-row gap-4">
                        <button
                            @click="setAnswer(question, 1)"
                            class="border-orange-400 border-2 px-3 sm:px-6 md:px-8 lg:px-10 py-1 rounded-md generic-hover"
                            :class="{ 'bg-orange-400': questionMapping[question.id] == 1 }"
                            :disabled="questionMapping[question.id] == 1"
                            title="EW!"
                        >🤮</button>
                        <button
                            @click="setAnswer(question, 2)"
                            class="border-orange-400 border-2 px-3 sm:px-6 md:px-8 lg:px-10 py-1 rounded-md generic-hover"
                            :class="{ 'bg-orange-400': questionMapping[question.id] == 2 }"
                            :disabled="questionMapping[question.id] == 2"
                            title="No"
                        >😕</button>
                        <button
                            @click="setAnswer(question, 3)"
                            class="border-orange-400 border-2 px-3 sm:px-6 md:px-8 lg:px-10 py-1 rounded-md generic-hover"
                            :class="{ 'bg-orange-400': questionMapping[question.id] == 3 }"
                            :disabled="questionMapping[question.id] == 3"
                            title="If partner wants to"
                        >🤷</button>
                        <button
                            @click="setAnswer(question, 4)"
                            class="border-orange-400 border-2 px-3 sm:px-6 md:px-8 lg:px-10 py-1 rounded-md generic-hover"
                            :class="{ 'bg-orange-400': questionMapping[question.id] == 4 }"
                            :disabled="questionMapping[question.id] == 4"
                            title="Yes"
                        >😀</button>
                        <button
                            @click="setAnswer(question, 5)"
                            class="border-orange-400 border-2 px-3 sm:px-6 md:px-8 lg:px-10 py-1 rounded-md generic-hover"
                            :class="{ 'bg-orange-400': questionMapping[question.id] == 5 }"
                            :disabled="questionMapping[question.id] == 5"
                            title="OH YES!"
                        >😍</button>
                    </div>
                </div>
                <div id="question-footer" class="mt-2 flex flex-row gap-2">
                    <button
                        class="px-4 py-1 rounded-lg generic-hover bg-orange-500 flex flex-row items-center gap-2 generic-disabled"
                        @click="prevPage()"
                        id="prev-page-btn"
                        :disabled="currentCategoryIdx === 0"
                    >
                        <svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M1.75 3a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5A.75.75 0 0 1 1.75 3m8.47.72a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75a.75.75 0 0 1 0-1.5h7.69l-2.22-2.22a.75.75 0 0 1 0-1.06"/></svg>
                        Back
                    </button>
                    <button
                        class="px-4 py-1 rounded-lg generic-hover bg-orange-500 flex flex-row items-center gap-2 generic-disabled"
                        @click="nextPage()"
                        id="next-page-btn"
                        v-if="currentCategoryIdx !== Object.keys(categories).length - 1"
                        :disabled="
                            isCategoryUnfilled
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M1.75 3a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5A.75.75 0 0 1 1.75 3m8.47.72a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75a.75.75 0 0 1 0-1.5h7.69l-2.22-2.22a.75.75 0 0 1 0-1.06"/></svg>
                        Save and Continue
                    </button>
                    <button
                        class="px-4 py-1 rounded-lg generic-hover bg-orange-500 flex flex-row items-center gap-2 generic-disabled"
                        @click="finishQuiz()"
                        id="finish-quiz-btn"
                        v-else
                        :disabled="
                            isCategoryUnfilled
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/></svg>
                        Finish Quiz
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { questions, categories, Question } from "../utils/questions";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quizstore";
import { storeToRefs } from "pinia";

const $router = useRouter();
const store = useQuizStore();
const { state, activePlayer } = storeToRefs(store);

onMounted(() => {
    if (!activePlayer.value) $router.push("/");
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
});

const currentCategoryIdx = ref(0);
const currentCategory = computed(() => categories[Object.keys(categories)[currentCategoryIdx.value]]);
const categoryQuestions = computed(() => {
    return questions.filter(f => f.category === Object.keys(categories)[currentCategoryIdx.value])
})

const questionMapping = reactive<Record<number, number>>({})
const isCategoryUnfilled = computed(() => {
    return questions
        .filter(q => q.category == Object.keys(categories)[currentCategoryIdx.value])
        .map(q => Object.keys(questionMapping).includes(String(q.id)))
        .some(q => q === false)
})

const showDebugFill = ref(false);

function setAnswer(question: Question, answer: number) {
    questionMapping[question.id] = answer;
    console.log(questionMapping[question.id])
}

function prevPage() {
    if (currentCategoryIdx.value === 0) return;
    currentCategoryIdx.value--;
    window.scrollTo(0, 0);
}

function nextPage() {
    if (currentCategoryIdx.value === Object.keys(categories).length - 1) return;
    currentCategoryIdx.value++;
    window.scrollTo(0, 0);
}

function debugFill() {
    [...document.querySelectorAll("button")].filter(b => b.title == "Yes").map(b => b.click());
    nextTick(() => {
        (document.querySelector("#next-page-btn") as HTMLButtonElement).click();
    })
}

function finishQuiz() {
    console.log(activePlayer.value)
    state.value[activePlayer.value!].quizData = JSON.parse(JSON.stringify(questionMapping));
    $router.push("/finalize")
}

const pressedKeys = reactive(new Set());

function handleKeyDown(event: KeyboardEvent) {
    pressedKeys.add(event.key.toLowerCase());
    if (pressedKeys.has('f') && pressedKeys.has('g')) {
        showDebugFill.value = true;
    }
}

function handleKeyUp(event: KeyboardEvent) {
    pressedKeys.delete(event.key.toLowerCase());
    if (!pressedKeys.has('f') || !pressedKeys.has('g')) {
        showDebugFill.value = false;
    }
}
</script>

<style scoped>

</style>

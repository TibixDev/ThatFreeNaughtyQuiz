<template>
    <!-- No UI needed -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useQuizStore, QuizGameState } from '@/store/quizstore';
import { decodeAndDecompress } from '@/utils/crypto';

const route = useRoute();
const router = useRouter();
const store = useQuizStore();
const { state, activePlayer } = storeToRefs(store);

onMounted(() => {
    const encodedState = route.query.state as string;

    if (!encodedState) {
        router.push('/');
        return;
    }

    try {
        const decodedState = decodeAndDecompress(encodedState) as QuizGameState;

        // Validate the state
        if (decodedState.magic !== 'tsq' || !decodedState.p1 || !decodedState.p2) {
            throw new Error('Invalid state');
        }

        // Update the store state
        // Update the store state properties individually
        Object.keys(decodedState).forEach(key => {
            if (key in state.value) {
                state.value[key as any] = decodedState[key];
            }
        });
        console.log(state.value)

        // Check quiz completion status and redirect accordingly
        if (state.value.p1.quizData && state.value.p2.quizData) {
            router.push('/finalize');
        } else if (state.value.p1.quizData) {
            activePlayer.value = 'p2';
            router.push('/quiz');
        } else {
            throw new Error('Invalid quiz completion status');
        }
    } catch (error) {
        console.error('Error processing state:', error);
        router.push('/');
    }
});
</script>

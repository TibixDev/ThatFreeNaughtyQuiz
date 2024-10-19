import { defineStore } from "pinia"
import { reactive, ref } from "vue";

type Gender = "male" | "female";
type Player = "p1" | "p2";

export type QuizGameState = {
    magic: "tsq",
    p1: {
        name: string,
        gender: Gender,
        color: string,
        quizData: Record<number, number> | null
    },
    p2: {
        name: string,
        gender: Gender,
        color: string,
        quizData: Record<number, number> | null
    }
}

export const useQuizStore = defineStore('quizstore', () => {
    const state = reactive<QuizGameState>({
        magic: "tsq",
        p1: {
            name: "John",
            gender: "male",
            quizData: null,
            color: "#3a86ff"
        },
        p2: {
            name: "Jane",
            gender: "female",
            quizData: null,
            color: "#ff006e"
        },
    })

    const activePlayer = ref<Player | null>(null);
  
    return { state, activePlayer }
})
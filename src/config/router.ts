import { RouterOptions, createRouter, createWebHistory } from "vue-router";

export type vRoute = RouterOptions["routes"][number];

export const routes: vRoute[] = [
  { path: "/", name: "Home", component: () => import("@/views/Home.vue") },
  { path: "/finalize", name: "Finalize", component: () => import("@/views/Finalize.vue") },
  { path: "/quiz", name: "Quiz", component: () => import("@/views/Quiz.vue") },
  { path: "/shared", name: "Shared", component: () => import("@/views/Shared.vue") },

];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

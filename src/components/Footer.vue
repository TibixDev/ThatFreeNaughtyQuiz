<template>
  <footer class="bg-neutral-800 py-12 mt-12">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start mb-4">
            <img src="/logo.png" alt="ThatFreeNaughtyQuiz" class="h-16 w-16 select-none mr-4">
            <h2 class="text-3xl font-bold text-orange-400 translate-y-1">ThatFreeNaughtyQuiz</h2>
          </div>
          <p class="text-white text-xl mb-2">Explore your desires safely and privately.</p>
          <p class="text-gray-400">© {{ new Date().getFullYear() }} ThatFreeNaughtyQuiz. All rights reserved.</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-2xl font-bold text-orange-400 mb-4">Your Privacy Matters</h3>
          <p class="text-gray-700 text-lg">
            All your data is stored locally in your browser. We guarantee your privacy - nothing is sent to our servers.
          </p>
          <div class="mt-4 flex items-center justify-center md:justify-start">
            <span class="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              100% Private
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

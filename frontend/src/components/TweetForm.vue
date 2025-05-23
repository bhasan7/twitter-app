<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { Tweet } from '../types/tweet'

const emit = defineEmits<{
  (e: 'tweet-created'): void
  (e: 'error', message: string): void
}>()

const newTweet = ref({
  author: '',
  content: ''
})
const loading = ref(false)
const remainingChars = ref(280)

const handleSubmit = async () => {
  try {
    loading.value = true
    emit('error', '') 

    if (!newTweet.value.author.trim()) {
      emit('error', 'Author name cannot be empty')
      return
    }
    if (!newTweet.value.content.trim()) {
      emit('error', 'Tweet content cannot be empty')
      return
    }
    
    await axios.post('http://localhost:3000/api/tweet', newTweet.value)
    newTweet.value.content = ''
    remainingChars.value = 280
    emit('tweet-created')
  } catch (err) {
    if (err.response?.data?.error) {

      const validationErrors = err.response.data.error
      if (Array.isArray(validationErrors)) {
        emit('error', validationErrors.map(e => e.message).join(', '))
      } else {
        emit('error', 'Failed to create tweet. Please check your input.')
      }
    } else {
      emit('error', 'Failed to create tweet. Please try again.')
    }
    console.error(err)
  } finally {
    loading.value = false
  }
}

const updateRemainingChars = () => {
  remainingChars.value = 280 - newTweet.value.content.length
}
</script>

<template>
  <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-xl p-8 mb-10 border border-blue-200">
    <form @submit.prevent="handleSubmit" class="space-y-6">

      <div>
        <label for="author" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-3">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold uppercase"
            aria-hidden="true"
          >
            {{ newTweet.author ? newTweet.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??' }}
          </div>
          <span>Your Name</span>
        </label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9.994 9.994 0 0112 15c2.21 0 4.243.716 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <input
            type="text"
            id="author"
            v-model="newTweet.author"
            required
            placeholder="e.g. John Doe"
            class="w-full pl-12 pr-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div>
        <label for="content" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>What's happening?</span>
        </label>
        <textarea
          id="content"
          v-model="newTweet.content"
          @input="updateRemainingChars"
          required
          :maxlength="280"
          rows="4"
          placeholder="Share your thoughts..."
          class="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        ></textarea>
        <p class="mt-2 text-sm" :class="remainingChars < 0 ? 'text-red-500' : 'text-blue-600'">
          {{ remainingChars }} characters remaining
        </p>
      </div>

      <button
        type="submit"
        :disabled="loading || remainingChars < 0"
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Posting...' : 'Tweet' }}
      </button>
    </form>

    <div v-if="error" class="mt-4">
      <ErrorMessage :message="error" />
    </div>
  </div>
</template>


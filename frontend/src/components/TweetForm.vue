<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { Tweet } from '../types/tweet'

const emit = defineEmits<{
  (e: 'tweet-created'): void
}>()

const newTweet = ref({
  author: '',
  content: ''
})
const loading = ref(false)
const error = ref('')
const remainingChars = ref(280)

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    await axios.post('http://localhost:3000/api/tweet', newTweet.value)
    newTweet.value.content = ''
    remainingChars.value = 280
    emit('tweet-created')
  } catch (err) {
    error.value = 'Failed to create tweet, check the input fields please.'
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
  <div class="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200">
    <form @submit.prevent="handleSubmit" class="space-y-6">

      <div>
        <label for="author" class="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          id="author"
          v-model="newTweet.author"
          required
          placeholder="e.g. John Doe"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label for="content" class="block text-sm font-semibold text-gray-700 mb-1">What's happening?</label>
        <textarea
          id="content"
          v-model="newTweet.content"
          @input="updateRemainingChars"
          required
          :maxlength="280"
          rows="4"
          placeholder="Share your thoughts with the world..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        ></textarea>
        <p class="mt-2 text-sm" :class="remainingChars < 0 ? 'text-red-500' : 'text-gray-500'">
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

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
  <div class="bg-white rounded-lg shadow p-6 mb-8">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">Your Name</label>
        <input
          type="text"
          id="author"
          v-model="newTweet.author"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">What's happening?</label>
        <textarea
          id="content"
          v-model="newTweet.content"
          @input="updateRemainingChars"
          required
          :maxlength="280"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
        <p class="mt-1 text-sm text-gray-500" :class="{ 'text-red-500': remainingChars < 0 }">
          {{ remainingChars }} characters remaining
        </p>
      </div>
      <button
        type="submit"
        :disabled="loading || remainingChars < 0"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {{ loading ? 'Posting...' : 'Tweet' }}
      </button>
    </form>
  </div>
  <ErrorMessage :message="error" />
</template>

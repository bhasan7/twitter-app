<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TweetFeed from './components/TweetFeed.vue'

interface Tweet {
  id: number
  author: string
  content: string
  createdAt: string
}

const tweets = ref<Tweet[]>([])
const newTweet = ref({
  author: '',
  content: ''
})
const loading = ref(false)
const error = ref('')
const remainingChars = ref(280)

const fetchTweets = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:3000/api/tweets')
    tweets.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch tweets'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    await axios.post('http://localhost:3000/api/tweet', newTweet.value)
    newTweet.value.content = ''
    remainingChars.value = 280
    await fetchTweets()
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

onMounted(fetchTweets)
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">NEWS FEED PAGE</h1>
      <!-- Tweet Form -->
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
      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
      <!-- Tweet Feed -->
      <TweetFeed :tweets="tweets" :loading="loading" />
    </div>
  </div>
</template>


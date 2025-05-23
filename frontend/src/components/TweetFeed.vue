<script setup lang="ts">
import type { Tweet } from '../types/tweet'

defineProps<{
  tweets: Tweet[]
  loading: boolean
}>()
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading && !tweets.length" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto"></div>
    </div>

    <div v-else-if="!tweets.length" class="text-center py-12 text-gray-500">
      No tweets yet. Be the first to tweet!
    </div>

    <div
      v-else
      v-for="tweet in tweets"
      :key="tweet.id"
      class="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
    >
      <div class="flex items-start space-x-4">

        <div
          class="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold uppercase select-none"
          aria-hidden="true"
        >
          {{ tweet.author ? tweet.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??' }}
        </div>

        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">{{ tweet.author }}</h3>
            <p class="text-sm text-gray-400">
              {{ new Date(tweet.createdAt).toLocaleString('en-GB', { 
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
              }) }}
            </p>
          </div>
          <p class="mt-3 text-gray-700 whitespace-pre-line overflow-wrap-anywhere break-all">{{ tweet.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

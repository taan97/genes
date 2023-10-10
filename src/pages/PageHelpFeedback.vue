<template>
  <BaseHeader :title="$t('PageMore.HelpFeedback')" />

  <div class="p-5 flex flex-col gap-4">
    <h2 class="text-size-5 font-bold">{{ $t('PageHelpFeedback.Help') }}</h2>
    <router-link
      :to="{ name: 'PageTutorialVideos' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="help-video"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageHelpFeedback.TutorialVideos') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <h2 class="text-size-5 font-bold pt-7">
      {{ $t('PageHelpFeedback.Feedback') }}
    </h2>

    <router-link
      :to="{ name: 'PageSystemFeedback' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="feedback"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageHelpFeedback.SystemFeedback') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>
  </div>
</template>

<script setup></script>

<style scoped></style>

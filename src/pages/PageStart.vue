<template>
  <BackgroundAnimation />

  <LanguageSelector
    class="relative px-3 py-4 w-min ml-auto flex gap-2 animate-[slideFromLeft_0.5s_ease-in-out_0.5s_backwards]"
  />

  <BaseIcon
    name="logo"
    class="relative mx-auto mt-16 mb-4 animate-[growFromBottom_1s_ease-in-out]"
    min-height="354px"
  />

  <router-link
    :to="{ name: 'PageSignIn' }"
    class="relative bg-black-1 rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center w-[18rem] mx-auto animate-[slideFromRight_0.5s_ease-in-out_1s_backwards]"
  >
    <BaseIcon
      name="login"
      class="fill-orange-1 absolute top-0 bottom-0 my-auto left-3"
    />
    <span class="text-orange-1 text-size-5 font-bold">
      {{ $t('PageStart.SignIn') }}
    </span>
  </router-link>

  <div class="divider animate-[grow_0.5s_ease-in-out_1.5s_backwards]">
    {{ $t('PageStart.Or') }}
  </div>

  <router-link
    :to="{ name: 'PageSignUpForm' }"
    class="relative bg-black-1 rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center w-[18rem] mx-auto mb-10 animate-[slideFromLeft_0.5s_ease-in-out_2s_backwards]"
  >
    <BaseIcon
      name="signup"
      class="fill-orange-1 absolute top-0 bottom-0 my-auto left-3"
    />
    <span class="text-orange-1 text-size-5 font-bold">
      {{ $t('PageStart.CreateAccount') }}
    </span>
  </router-link>
</template>

<script setup></script>

<style scoped>
.divider {
  position: relative;
  margin-inline: auto;
  margin-block: 1rem;
}
.divider:before {
  left: 40px;
}
.divider:after {
  right: 40px;
}
.divider:before,
.divider:after {
  content: '';
  top: 50%;
  height: 2px;
  width: 110px;
  position: absolute;
  background-color: var(--root-black-1);
}
</style>

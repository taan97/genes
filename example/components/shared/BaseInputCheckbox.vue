<template>
  <van-checkbox shape="square">
    <slot></slot>
  </van-checkbox>
</template>

<script setup></script>

<style scoped>
.van-checkbox {
  align-items: start;
}
.van-checkbox > :deep(.van-checkbox__label) {
  color: white;
}

.van-checkbox > :deep(.van-checkbox__icon) {
  margin-top: 4px;
  height: 13px;
  font-size: 9px;
  padding: 0.2px;
  border: 1px solid var(--root-orange-v-1);
  border-radius: 3px;
  width: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-checkbox > :deep(.van-checkbox__label) {
  margin-left: 1rem;
}

.van-checkbox :deep(.van-checkbox__icon--checked > .van-icon) {
  background-color: var(--root-orange-v-1);
}

.van-checkbox :deep(.van-badge__wrapper) {
  border: none;
  border-radius: 2px;
}

.van-checkbox :deep(.van-badge__wrapper::before) {
  display: none;
}
</style>

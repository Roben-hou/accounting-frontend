<template>
  <div v-for="item in records" :key="item.id">
    {{ item.title }}-{{ item.amount }}-{{ item.type }}-{{ item.category }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Record } from "@/types";
import { getRecords } from "@/api";

const records = ref<Record[]>([]);

onMounted(async () => {
  records.value = await getRecords();
});
</script>

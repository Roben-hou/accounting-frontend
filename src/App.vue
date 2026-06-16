<template>
  <div v-for="item in records" :key="item.id">
    {{ item.title }}-{{ item.amount }}-{{ item.type }}-{{ item.category }}
  </div>
  <form>
    <input type="text" v-model="form.title" />
    <input type="number" v-model="form.amount" />
    <select v-model="form.type">
      <option value="income">收入</option>
      <option value="expense">支出</option>
    </select>
    <input type="text" v-model="form.category" />
    <button type="submit" @click="handleSubmit">提交</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Record } from "@/types";
import { getRecords, createRecord } from "@/api";

const records = ref<Record[]>([]);
const form = ref<Omit<Record, "id" | "created_at">>({
  title: "",
  amount: 0,
  type: "income" as "income" | "expense",
  category: "",
});

const handleSubmit = async () => {
  await createRecord(form.value);
  records.value = await getRecords();
};

onMounted(async () => {
  records.value = await getRecords();
});
</script>

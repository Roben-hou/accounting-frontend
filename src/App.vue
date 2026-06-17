<template>
  <form>
    <input type="text" v-model="form.title" />
    <input type="number" v-model="form.amount" />
    <select v-model="form.type">
      <option value="income">收入</option>
      <option value="expense">支出</option></select
    ><br />
    <input type="text" v-model="form.category" />
    <button type="submit" @click="handleSubmit">提交</button>
  </form>
  <v-data-table :headers="headers" :items="records">
    <template v-slot:item.type="{ value }">
      <v-chip :color="value === 'income' ? 'green' : 'red'" size="small">
        {{ value === "income" ? "收入" : "支出" }}
      </v-chip>
    </template>
    <template v-slot:item.created_at="{ value }">
      {{ formatDate(value) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon icon="mdi-delete" size="small" @click="handleDelete(item.id)"></v-icon>
    </template>
  </v-data-table>
  <div>
    <span>总收入: {{ stats.income }}</span>
    <span>总支出: {{ stats.expense }}</span>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import type { Record, stat } from "@/types";
import { getRecords, createRecord, deleteRecord, getStats } from "@/api";

const records = ref<Record[]>([]);
const form = ref<Omit<Record, "id" | "created_at">>({
  title: "",
  amount: 0,
  type: "income" as "income" | "expense",
  category: "",
});
const formatDate = (dateStr: string) => {
  return dayjs(dateStr).format("YYYY-MM-DD-HH");
};
const headers = [
  { title: "标题", key: "title" },
  { title: "金额", key: "amount" },
  { title: "类型", key: "type" },
  { title: "分类", key: "category" },
  { title: "创建时间", key: "created_at" },
  { title: "操作", key: "actions", sortable: false },
];

const stats = ref<stat>({ income: 0, expense: 0 });

const handleSubmit = async () => {
  await createRecord(form.value);
  records.value = await getRecords();
  stats.value = await getStats();
};
const handleDelete = async (id: number) => {
  await deleteRecord(id);
  records.value = await getRecords();
  stats.value = await getStats();
};

onMounted(async () => {
  records.value = await getRecords();
  stats.value = await getStats();
});
</script>

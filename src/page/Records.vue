<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="form.title" label="标题"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="form.amount" label="金额" type="number"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select v-model="form.type" :items="[
            { title: '收入', value: 'income' },
            { title: '支出', value: 'expense' },
          ]" label="类型"></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="form.category" label="分类"></v-text-field>
        </v-col>
        <v-col cols="1" align-self="center">
          <v-btn color="primary" @click="handleSubmit">提交</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
  <v-row class="mb-4">
    <v-col cols="6">
      <v-card color="green-darken-3">
        <v-card-text> 总收入: {{ stats.income }} </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card color="red-darken-3">
        <v-card-text> 总支出: {{ stats.expense }} </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
const isSubmiting = ref<boolean>(false);
const handleSubmit = async () => {
  if (isSubmiting.value) return
  isSubmiting.value = true
  try {
    await createRecord(form.value);
    form.value = {
      title: "",
      amount: 0,
      type: "income",
      category: "",
    };
    records.value = await getRecords();
    stats.value = await getStats();
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isSubmiting.value = false;
  }

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
<style scoped lang="scss">
$primary: #1976d2;

.stats-card {
  border-radius: 12px;

  &:hover {
    opacity: 0.9;
  }
}
</style>

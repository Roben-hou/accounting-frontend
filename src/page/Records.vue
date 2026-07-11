<template>
  <v-data-table :headers="headers" :items="records">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>记账记录</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon icon="mdi-plus" size="small" @click="openEditDialog(null)"></v-icon>
      </v-toolbar>
    </template>
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
      <v-icon icon="mdi-pencil" size="small" class="mr-2" @click="openEditDialog(item)"
        :style="{ marginLeft: '8px' }"></v-icon>
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
  <!-- 表单弹窗 -->
  <RecordFormDialog v-model="showDialog" :editing-record="editingRecord" @saved="handleSaved"></RecordFormDialog>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import type { Record, stat } from "@/types";
import { getRecords, deleteRecord, getStats } from "@/api";
import RecordFormDialog from "@/components/RecordFormDialog.vue";

const records = ref<Record[]>([]);
const stats = ref<stat>({ income: 0, expense: 0 });
const showDialog = ref(false);
const editingRecord = ref<Record | null>(null);

const formatDate = (dateStr: string) => dayjs(dateStr).format("YYYY-MM-DD-HH");

const headers = [
  { title: "标题", key: "title" },
  { title: "金额", key: "amount" },
  { title: "类型", key: "type" },
  { title: "分类", key: "category" },
  { title: "创建时间", key: "created_at" },
  { title: "操作", key: "actions", sortable: false },
];

const openEditDialog = (record: Record | null) => {
  editingRecord.value = record;
  showDialog.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await deleteRecord(id);
    records.value = await getRecords();
    stats.value = await getStats();
  } catch (e) {
    console.log(e);
  }
};

const handleSaved = async () => {
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

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <div class="d-flex align-center">
          <v-btn
            icon="mdi-arrow-left"
            variant="text"
            density="comfortable"
            class="ml-n3 mr-1"
            @click="router.back()"
          ></v-btn>
          <h2 class="text-h5 font-weight-bold">{{ family?.name }}</h2>
        </div>
        <p class="text-subtitle-1 text-grey" style="padding-left: 36px">
          角色：{{ family?.role === "owner" ? "管理员" : "成员" }}
        </p>
      </div>
      <v-btn v-if="family?.role === 'owner'" color="primary" @click="showInviteDialog = true"> 邀请成员 </v-btn>
    </div>

    <v-dialog v-model="showInviteDialog" max-width="400">
      <v-card>
        <v-card-title>邀请成员</v-card-title>
        <v-card-text>
          <v-text-field v-model="inviteForm.username" label="用户名"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :loading="isInviting" :disabled="isInviting" @click="handleInvite"> 发送邀请 </v-btn>
          <v-btn variant="text" @click="showInviteDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="records">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>记账记录</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon icon="mdi-plus" class="mr-8" @click="openEditDialog(null)"></v-icon>
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
        <v-icon
          icon="mdi-pencil"
          size="small"
          class="mr-2"
          @click="openEditDialog(item)"
          :style="{ marginLeft: '8px' }"
        ></v-icon>
      </template>
    </v-data-table>
    <!-- 表单弹窗 -->
    <RecordFormDialog
      v-model="showDialog"
      :editing-record="editingRecord"
      :family-id="familyId"
      @saved="handleSaved"
    ></RecordFormDialog>
  </v-container>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMyFamilies, inviteToFamily, getRecords, deleteRecord } from "@/api";
import type { Record } from "@/types";
import RecordFormDialog from "@/components/RecordFormDialog.vue";

const route = useRoute();
const router = useRouter();
const familyId = Number(route.params.id);
const records = ref<Record[]>([]);
const family = ref<{ id: number; name: string; role: string } | null>(null);
const showInviteDialog = ref(false);
const inviteForm = ref({ username: "" });
const isInviting = ref(false);

const showDialog = ref(false);
const editingRecord = ref<Record | null>(null);

const formatDate = (dateStr: string) => dayjs(dateStr).format("YYYY-MM-DD-HH");
const headers = [
  { title: "创建人", key: "username" },
  { title: "标题", key: "title" },
  { title: "金额", key: "amount" },
  { title: "类型", key: "type" },
  { title: "分类", key: "category" },
  { title: "创建时间", key: "created_at" },
  { title: "操作", key: "actions", sortable: false },
];

const fetchRecords = async () => {
  try {
    records.value = await getRecords({ familyId });
  } catch (e) {
    console.error(e);
  }
};

const openEditDialog = (record: Record | null) => {
  editingRecord.value = record;
  showDialog.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await deleteRecord(id);
    await fetchRecords();
  } catch (e) {
    console.error(e);
  }
};

const handleSaved = async () => {
  await fetchRecords();
};

onMounted(async () => {
  const families = (await getMyFamilies()) ?? [];
  family.value = families.find((f) => f.id === familyId) ?? null;
  await fetchRecords();
});

const handleInvite = async () => {
  if (isInviting.value) return;
  isInviting.value = true;
  try {
    await inviteToFamily(familyId, inviteForm.value);
    inviteForm.value = { username: "" };
    showInviteDialog.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    isInviting.value = false;
  }
};
</script>

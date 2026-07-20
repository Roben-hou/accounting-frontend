<template>
  <v-toolbar flat>
    <v-toolbar-title>家庭记账</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" prepend-icon="mdi-email" to="/invitation"> 收件箱 </v-btn>
    <v-icon icon="mdi-plus" class="mr-8" @click="showCreateDialog = true"></v-icon>
  </v-toolbar>

  <v-list v-if="families.length">
    <v-list-item
      v-for="family in families"
      :key="family.id"
      :title="family.name"
      @click="router.push(`/family/${family.id}`)"
    />
  </v-list>
  <div v-else>还没有加入任何家庭</div>

  <!-- 创建家庭弹窗 -->
  <v-dialog v-model="showCreateDialog" max-width="400">
    <v-card>
      <v-card-title>创建家庭</v-card-title>
      <v-card-text>
        <v-text-field v-model="form.name" label="家庭名称"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :loading="isSubmitting" :disabled="isSubmitting" @click="handleCreate"> 创建 </v-btn>
        <v-btn variant="text" @click="showCreateDialog = false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMyFamilies, createFamily } from "@/api";
import type { Family } from "@/types";
const router = useRouter();

const families = ref<Family[]>([]);
const showCreateDialog = ref(false);
const form = ref({ name: "" });
const isSubmitting = ref(false);

const fetchFamilies = async () => {
  families.value = await getMyFamilies();
};

const handleCreate = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    await createFamily(form.value);
    form.value = { name: "" };
    showCreateDialog.value = false;
    await fetchFamilies();
  } catch (e) {
    console.log(e);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchFamilies);
</script>

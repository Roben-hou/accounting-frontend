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
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMyFamilies, inviteToFamily } from "@/api";

const route = useRoute();
const router = useRouter();
const familyId = Number(route.params.id);

const family = ref<{ id: number; name: string; role: string } | null>(null);
const showInviteDialog = ref(false);
const inviteForm = ref({ username: "" });
const isInviting = ref(false);

onMounted(async () => {
  const families = (await getMyFamilies()) ?? [];
  family.value = families.find((f) => f.id === familyId) ?? null;
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

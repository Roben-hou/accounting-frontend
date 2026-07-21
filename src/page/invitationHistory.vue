<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <div class="d-flex align-center">
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          density="comfortable"
          class="ml-n3 mr-1"
          @click="router.back()"
        ></v-btn>
        <h2 class="text-h5 font-weight-bold">请求历史</h2>
      </div>
    </div>

    <v-list v-if="historyInvitations.length">
      <v-list-item
        v-for="invitation in historyInvitations"
        :key="invitation.id"
        :title="invitation.family_name"
        :subtitle="invitation.type === 'apply' ? '加入申请' : '家庭邀请'"
      >
        <template #prepend>
          <v-avatar :color="invitation.type === 'apply' ? 'primary' : 'secondary'">
            <v-icon>{{ invitation.type === "apply" ? "mdi-account-plus" : "mdi-email-outline" }}</v-icon>
          </v-avatar>
        </template>
        <template #append>
          <div class="d-flex align-center">
            <v-chip
              :color="
                invitation.status === 'accepted' ? 'success' : invitation.status === 'rejected' ? 'error' : 'default'
              "
              size="small"
              class="font-weight-medium"
            >
              {{ invitation.status === "accepted" ? "已接受" : invitation.status === "rejected" ? "已拒绝" : "待处理" }}
            </v-chip>
          </div>
        </template>
      </v-list-item>
    </v-list>
    <div v-else class="text-grey text-subtitle-1 text-center py-4">暂无历史请求</div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getMyInvitations } from "@/api";
import type { FamilyInvitation } from "@/types";
import { useRouter } from "vue-router";

const invitations = ref<FamilyInvitation[]>([]);
const router = useRouter();

const historyInvitations = computed(() => invitations.value.filter((item) => item.status !== "pending"));

const fetchInvitations = async () => {
  invitations.value = await getMyInvitations();
};

onMounted(async () => {
  await fetchInvitations();
});
</script>

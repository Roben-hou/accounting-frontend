<template>
  <v-navigation-drawer permanent>
    <v-list-subheader class="top-subheader">
      <div class="brand-container">
        <div v-html="logo" class="logo"></div>
        <span class="brand-text">Mosaic</span>
      </div>
    </v-list-subheader>
    <v-list>
      <v-list-item to="/" title="概览"></v-list-item>
      <v-list-item to="/records" title="记账记录"></v-list-item>
      <v-list-item to="/family" title="家庭记账"></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar color="primary">{{ username.charAt(0) }}</v-avatar>
        </template>
        <v-list-item-title>{{ username }}</v-list-item-title>
        <template v-slot:append>
          <v-btn icon="mdi-logout" variant="text" @click="handleLogout"></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg?raw";
import { userAuthStore } from '@/stores/auth'

const router = useRouter();
const authStore = userAuthStore()
const username = computed(() => authStore.username || '未登录')

const handleLogout = () => {
  authStore.clearToken();
  router.push("/auth/login");
};
</script>

<style scoped lang="scss">
.top-subheader {
  height: auto !important;
  padding: 16px !important;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.logo {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

:deep(.logo svg) {
  width: 100%;
  height: auto;
  display: block;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>

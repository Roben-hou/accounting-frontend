<template>
  <v-app>
    <v-app-bar title="记账系统"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item to="/" title="记账记录"></v-list-item>
      </v-list>
      <v-list>
        <v-list-item @click="handleLogout" title="退出登录"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

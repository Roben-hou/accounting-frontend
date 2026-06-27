<template>
  <v-card max-width="400" class="card">
    <v-card-text>
      <v-text-field v-model="form.username" label="用户名"></v-text-field>
      <v-text-field v-model="form.password" label="密码" type="password"></v-text-field>
      <v-btn color="primary" block @click="handleLogin">登录</v-btn>
      <v-btn variant="text" block @click="router.push('/auth/register')">没有账号？去注册</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api";
import { userAuthStore } from "@/stores/auth";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
const authStore = userAuthStore();
const handleLogin = async () => {
  const res = await login(form.value);
  authStore.setToken(res.token);
  router.push("/records");
};
</script>

<style scoped lang="scss">
.card {
  margin: auto;
  width: 80%;
  padding: 20px;
}
</style>

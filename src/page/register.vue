<template>
  <v-card max-width="400" class="card">
    <v-card-text>
      <v-text-field v-model="form.username" label="用户名"></v-text-field>
      <v-text-field v-model="form.password" label="密码" type="password"></v-text-field>
      <v-btn color="primary" block @click="handleRegister">注册</v-btn>
      <v-btn variant="text" block @click="router.push('/auth/login')">已有账号?去登录</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});

const handleRegister = async () => {
  await register(form.value);
  router.push("/auth/login");
};
</script>

<style scoped lang="scss">
.card {
  margin: auto;
  width: 80%;
  padding: 20px;
}
</style>

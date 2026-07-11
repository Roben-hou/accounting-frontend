<template>
  <v-card max-width="400" class="card">
    <v-card-text>
      <v-text-field v-model="form.username" label="用户名"></v-text-field>
      <v-text-field v-model="form.password" label="密码" type="password"></v-text-field>
      <v-btn color="primary" block @click="handleLogin" :loading="isSubmiting" :disabled="isSubmiting">登录</v-btn>
      <v-btn variant="text" block @click="router.push('/auth/register')">没有账号？去注册</v-btn>
    </v-card-text>
    <v-snackbar v-model="showError" color="error" timeout="3000" location="top">{{ errorMessage }}</v-snackbar>
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
const isSubmiting = ref<boolean>(false)
const errorMessage = ref<string>("")
const showError = ref<boolean>(false)
const authStore = userAuthStore();

const handleLogin = async () => {
  if (isSubmiting.value) return;
  isSubmiting.value = true
  errorMessage.value = ""
  try {
    const res = await login(form.value);
    authStore.setToken(res.token);
    router.push("/records");
  }
  catch (e) {
    errorMessage.value = "登录失败";
    showError.value = true
  }
  finally {
    isSubmiting.value = false;
  }
};
</script>

<style scoped lang="scss">
.card {
  margin: auto;
  width: 80%;
  padding: 20px;
}
</style>

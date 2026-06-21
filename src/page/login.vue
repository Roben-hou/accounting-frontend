<template>
  <v-card max-width="400" class="mx-auto mt-10">
    <v-card-text>
      <v-text-field v-model="form.username" label="用户名"></v-text-field>
      <v-text-field v-model="form.password" label="密码" type="password"></v-text-field>
      <v-btn color="primary" block @click="handleLogin">登录</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});

const handleLogin = async () => {
  const res = await login(form.value);
  localStorage.setItem("token", res.token);
  router.push("/records");
};
</script>

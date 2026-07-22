<template>
  <v-dialog v-model="modelValue">
    <v-card>
      <v-form ref="formRef" @submit.prevent="handleChangeRecord">
        <v-text-field v-model="form.title" label="标题" :rules="titleRules"></v-text-field>
        <v-text-field v-model="form.amount" label="金额" type="number" :rules="amountRules"></v-text-field>
        <v-select
          v-model="form.type"
          :items="[
            { title: '收入', value: 'income' },
            { title: '支出', value: 'expense' },
          ]"
          label="类型"
        ></v-select>
        <v-text-field v-model="form.category" label="分类" :rules="categoryRules"></v-text-field>
        <v-card-actions>
          <v-btn color="primary" :loading="isSubmitting" :disabled="isSubmitting" type="submit">提交</v-btn>
          <v-btn variant="text" @click="modelValue = false">取消</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import type { Record } from "@/types";
import { createRecord, updateRecord } from "@/api";

const props = defineProps<{
  editingRecord: Record | null;
  familyId?: number;
}>();
const emit = defineEmits<{ saved: [] }>();
const modelValue = defineModel<boolean>();

const formRef = ref<any>(null);
type RecordForm = Pick<Record, "title" | "amount" | "type" | "category" | "family_id">;

const form = ref<RecordForm>({
  title: "",
  amount: 0,
  type: "income",
  category: "",
  family_id: undefined,
});

const required = (value: any) => (value ?? "").trim().length > 0 || "此字段为必填";
const titleRules = [required, (value: string) => (value.trim().length <= 50 ? true : "标题长度不能超过50个字符")];
const amountRules = [
  (value: unknown) => (value !== "" && value !== null && value !== undefined) || "请输入金额",
  (value: unknown) => Number.isFinite(Number(value)) || "金额格式不正确",
  (value: unknown) => Number(value) > 0 || "金额必须大于 0",
  (value: unknown) => /^\d+(\.\d{1,2})?$/.test(String(value)) || "金额最多保留两位小数",
];
const categoryRules = [required, (value: string) => (value.trim().length <= 20 ? true : "分类长度不能超过20个字符")];

watch(modelValue, async (isOpen) => {
  if (isOpen) {
    if (props.editingRecord) {
      form.value = {
        title: props.editingRecord.title,
        amount: props.editingRecord.amount,
        type: props.editingRecord.type,
        category: props.editingRecord.category,
        family_id: props.editingRecord.family_id,
      };
    }
  } else {
    form.value = { title: "", amount: 0, type: "income", category: "", family_id: props.familyId };
  }
  await nextTick();
  formRef.value?.resetValidation();
});

const isSubmitting = ref(false);
const handleChangeRecord = async () => {
  const result = await formRef.value?.validate();

  if (!result?.valid) {
    return;
  }
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const payload: RecordForm = {
      title: form.value.title.trim(),
      amount: Number(form.value.amount),
      type: form.value.type,
      category: form.value.category.trim(),
      family_id: props.familyId ?? form.value.family_id,
    };
    if (props.editingRecord) {
      await updateRecord(props.editingRecord.id, payload);
    } else {
      await createRecord(payload);
    }
    emit("saved");
    modelValue.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
    <v-dialog v-model="modelValue">
        <v-card>
            <v-card-text>
                <v-text-field v-model="form.title" label="标题"></v-text-field>
                <v-text-field v-model="form.amount" label="金额" type="number"></v-text-field>
                <v-select v-model="form.type" :items="[
                    { title: '收入', value: 'income' },
                    { title: '支出', value: 'expense' },
                ]" label="类型"></v-select>
                <v-text-field v-model="form.category" label="分类"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" :loading="isSubmiting" :disabled="isSubmiting"
                    @click="handleChangeRecord">提交</v-btn>
                <v-btn variant="text" @click="modelValue = false">取消</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Record } from "@/types";
import { createRecord, updateRecord } from "@/api";

const props = defineProps<{
    editingRecord: Record | null;
    familyId?: number;
}>();
const emit = defineEmits<{ saved: [] }>();
const modelValue = defineModel<boolean>();

const form = ref<Omit<Record, "id" | "created_at">>({
    title: "",
    amount: 0,
    type: "income",
    category: "",
    family_id: undefined,
});

watch(() => props.editingRecord, (newRecord) => {
    if (newRecord) {
        form.value = { ...newRecord };
    } else {
        form.value = { title: "", amount: 0, type: "income", category: "", family_id: props.familyId };
    }
}, { immediate: true });

const isSubmiting = ref(false);
const handleChangeRecord = async () => {
    if (isSubmiting.value) return;
    isSubmiting.value = true;
    try {
        if (props.editingRecord) {
            await updateRecord(props.editingRecord.id, form.value);
        } else {
            await createRecord(form.value);
        }
        emit("saved");
        modelValue.value = false;
    } catch (e) {
        console.log(e);
    } finally {
        isSubmiting.value = false;
    }
};
</script>

import request from "@/utils/request";
import type { Record } from "@/types";

export function getRecords():Promise<Record[]> {
  return request.get('/records')
}
export function createRecord(data: Omit<Record,'id' | 'created_at'>) {
  return request.post('/records/create', data)
}
export function deleteRecord(id: number) {
  return request.delete(`/records/${id}`)
}
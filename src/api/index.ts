import request from "@/utils/request";
import type { Record } from "@/types";

export function getRecords() {
  return request.get('/records')
}
export function createRecord(data: Record) {
  return request.post('/records/create', data)
}
export function deleteRecord(id: number) {
  return request.delete(`/records/${id}`)
}
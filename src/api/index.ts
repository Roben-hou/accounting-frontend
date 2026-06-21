import request from "@/utils/request";
import type { Record, stat } from "@/types";

export function getRecords():Promise<Record[]> {
  return request.get('/records')
}
export function createRecord(data: Omit<Record,'id' | 'created_at'>) {
  return request.post('/records/create', data)
}
export function deleteRecord(id: number) {
  return request.delete(`/records/${id}`)
}
export function getStats(): Promise<stat> {
  return request.get('/records/stats')
}
export function login(data: {username:string,password:string}):Promise<{token:string}> {
  return request.post('/auth/login', data)
}
export function register(data: {username:string,password:string}):Promise<{token:string}> {
  return request.post('/auth/register', data)
}
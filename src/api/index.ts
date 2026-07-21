import request from "@/utils/request";
import type { Record, stat, Family, FamilyInvitation} from "@/types";

export function getRecords(params?: { familyId?: number }):Promise<Record[]> {
  return request.get('/records', { params })
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
export function updateRecord(id: number, data: Partial<Omit<Record,'id'>>) {
  return request.put(`/records/${id}`, data)
}
export function getMyFamilies():Promise<Family[]> {
  return request.get('/family/my')
}
export function createFamily(data: {name:string}) {
  return request.post('/family/create', data)
}
export function inviteToFamily(familyId: number, data: {username:string}) {
  return request.post(`/family/invite/send/${familyId}`, data)
}
export function getMyInvitations():Promise<FamilyInvitation[]> {
  return request.get('/family/invitations')
}
export function acceptFamilyInvitation(invitationId: number) {
  return request.put(`/family/acceptInvite/${invitationId}`)
}
export function rejectFamilyInvitation(invitationId: number) {
  return request.put(`/family/reject/${invitationId}`)
}
export function acceptJoinRequest(invitationId: number) {
  return request.put(`/family/accept/${invitationId}`)
}
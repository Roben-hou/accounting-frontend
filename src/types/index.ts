export interface Record {
  id: number
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
  created_at: string
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
export interface stat {
  income: number
  expense: number
}

export interface Family {
  id: number
  name: string
  role: "owner" | "member"
}

export interface FamilyInvitation {
  id: number
  family_id: number
  user_id: number
  username: string
  family_name: string
  status: "pending" | "accepted" | "rejected"
  type: "invite" | "apply"
  created_at: string
}

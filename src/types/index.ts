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
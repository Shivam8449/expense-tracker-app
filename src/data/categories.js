import { 
  Utensils, 
  ShoppingBag, 
  Car, 
  Home, 
  Heart, 
  Gamepad2, 
  Receipt, 
  MoreHorizontal,
  Wallet,
  Plane,
  Coffee,
  Dumbbell,
  Wifi,
  Music,
  GraduationCap,
  Gift
} from 'lucide-react'

export const CATEGORIES = [
  { id: 'food', name: 'Food', icon: Utensils, color: '#f97316' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#3b82f6' },
  { id: 'transport', name: 'Transport', icon: Car, color: '#8b5cf6' },
  { id: 'rent', name: 'Rent', icon: Home, color: '#06b6d4' },
  { id: 'health', name: 'Health', icon: Heart, color: '#ec4899' },
  { id: 'leisure', name: 'Leisure', icon: Gamepad2, color: '#22c55e' },
  { id: 'bills', name: 'Bills', icon: Receipt, color: '#eab308' },
  { id: 'other', name: 'Other', icon: MoreHorizontal, color: '#6b7280' }
]

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', icon: Wallet, color: '#22c55e' },
  { id: 'freelance', name: 'Freelance', icon: Coffee, color: '#3b82f6' },
  { id: 'investment', name: 'Investment', icon: GraduationCap, color: '#8b5cf6' },
  { id: 'gift', name: 'Gift', icon: Gift, color: '#ec4899' },
  { id: 'other', name: 'Other', icon: MoreHorizontal, color: '#6b7280' }
]

export const getCategoryById = (id, type = 'expense') => {
  const categories = type === 'income' ? INCOME_CATEGORIES : CATEGORIES
  return categories.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}

export const ALL_FILTER_CATEGORIES = [
  { id: 'all', name: 'All' },
  ...CATEGORIES
]

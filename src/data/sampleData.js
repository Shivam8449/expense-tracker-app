export const sampleTransactions = [
  {
    id: '1',
    name: 'Apple Store',
    category: 'shopping',
    type: 'expense',
    amount: 1299.00,
    date: new Date().toISOString().split('T')[0],
    note: 'New MacBook Pro',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Monthly Salary',
    category: 'salary',
    type: 'income',
    amount: 6500.00,
    date: new Date().toISOString().split('T')[0],
    note: 'May salary',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'The Monocle Cafe',
    category: 'food',
    type: 'expense',
    amount: 42.50,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    note: 'Dinner with friends',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Lufthansa Airlines',
    category: 'transport',
    type: 'expense',
    amount: 840.00,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    note: 'Flight to Berlin',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Whole Foods Market',
    category: 'food',
    type: 'expense',
    amount: 84.20,
    date: new Date().toISOString().split('T')[0],
    note: 'Weekly groceries',
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Uber Central',
    category: 'transport',
    type: 'expense',
    amount: 12.50,
    date: new Date().toISOString().split('T')[0],
    note: 'Ride to office',
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Blue Bottle Coffee',
    category: 'food',
    type: 'expense',
    amount: 6.75,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    note: 'Morning coffee',
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Verizon Wireless',
    category: 'bills',
    type: 'expense',
    amount: 95.00,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    note: 'Monthly phone bill',
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Equinox Membership',
    category: 'health',
    type: 'expense',
    amount: 180.00,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    note: 'Gym membership',
    createdAt: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Amazon Prime',
    category: 'shopping',
    type: 'expense',
    amount: 14.99,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    note: 'Annual subscription',
    createdAt: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Freelance Project',
    category: 'freelance',
    type: 'income',
    amount: 1900.00,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    note: 'Website redesign',
    createdAt: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Rent Payment',
    category: 'rent',
    type: 'expense',
    amount: 2200.00,
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    note: 'May rent',
    createdAt: new Date().toISOString()
  },
  {
    id: '13',
    name: 'Netflix',
    category: 'leisure',
    type: 'expense',
    amount: 15.99,
    date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
    note: 'Monthly subscription',
    createdAt: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Electric Bill',
    category: 'bills',
    type: 'expense',
    amount: 120.00,
    date: new Date(Date.now() - 432000000).toISOString().split('T')[0],
    note: 'April electric',
    createdAt: new Date().toISOString()
  }
]

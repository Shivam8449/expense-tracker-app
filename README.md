# Financial Serenity

Financial Serenity is a responsive expense tracker built with React and Vite. It helps users record income and expenses, review recent activity, filter transactions, and view simple spending analytics.

## Features

- Dashboard with total balance, income, expenses, and recent transactions
- Add, edit, and delete transactions
- Expense and income categories with icons
- Search and category filters for transactions
- Monthly spending breakdown with charts
- Six-month spending trend
- Local data persistence using `localStorage`
- Responsive layout for mobile, tablet, and desktop screens

## Tech Stack

- React 19
- Vite
- React Router DOM
- Recharts
- Lucide React icons
- date-fns

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    BottomNavigation/
    Header/
    TransactionCard/
  context/
    TransactionContext.jsx
  data/
    categories.js
    sampleData.js
  pages/
    AddTransaction/
    Analytics/
    Dashboard/
    Transactions/
  styles/
    App.css
    global.css
  utils/
    helpers.js
```

## How It Works

Transaction state is managed in `TransactionContext.jsx`. On the first visit, the app loads sample transactions. After that, transactions are saved to the browser's `localStorage`, so user changes remain available after refreshing the page.

The app uses React Router DOM for page navigation. `App.jsx` defines routes for the dashboard, transactions, history, and analytics screens. The bottom navigation updates the current route, while the add/edit transaction form remains a modal on top of the current screen.

## Routes

```text
/               Dashboard
/transactions   Transactions
/history        History
/analytics      Analytics
```

## Notes

- The app currently stores data locally in the browser only.
- Currency formatting is set to USD in `src/utils/helpers.js`.
- Sample data is defined in `src/data/sampleData.js`.

# 🧾 Reservation Table App

A **TypeScript + React** application for displaying and managing reservation data using **Material UI (MUI)**.  
Reservation data is computed dynamically by combining two separate JSON sources (e.g. product assignments and charges), and presented in a clean interface.

---

## 🚀 Features Overview

### 🔙 Backend Logic
- ✅ **Data merging** — combines two JSON sources into unified reservation entries.
- 🔍 **Filtering by product name** (case-insensitive).
- ↕️ **Sorting** by:
  - `reservation_uuid`
  - `number_of_active_purchases`
  - `sum_of_active_charges`
- 🔃 **Order**: ascending (`asc`) / descending (`desc`).
- 📄 **Pagination** with customizable page size (`limit`: 10 / 20 / 50).
- 🔐 **Validation & error handling**:
  - Invalid filters (e.g. symbols) trigger server-side errors.
  - Server returns descriptive messages on failure.

---

### 🖥️ Frontend UI (MUI-Based)
- 🎨 **Theming**:
  - Manual theme toggle (light/dark).
  - Respects system preference (`prefers-color-scheme`) by default.
- 🕵️ **Debounced search** input (500ms delay to reduce API load).
- 📑 **Paginated results** via MUI `<Pagination>` component.
- 🔄 **Scrollable table** with sticky headers and full-height layout.
- 🧩 **Dynamic controls**:
  - Filter input with a clear ("X") button.
  - Select dropdowns for sort field, order, and result limit.
- ✂️ **Copy to clipboard** icon next to product name.
- 🟩🟥 **Color indicators**:
  - Active products = **green**
  - Cancelled/deleted = **red**
- 🧱 **Sticky table headers** styled in gray for clarity.

---

### 🧪 Error Handling
- Server errors (e.g. invalid filters or request issues) are:
  - Logged in the console.
  - Shown to the user in a non-blocking way.
- On error, the table clears and fallback UI is shown.

---

### 🗂️ Project Structure

All table-related logic is modular and split under:



---

### ⚙️ Technologies Used

- **React** with **TypeScript**
- **Material UI (MUI)** for UI components
- **Express.js** (mock backend or middleware)
- **Vite** (or CRA) for bundling
- **LocalStorage** for theme preference
- **CSS custom properties** (`:root`) and media queries

---




## ⚙️ Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development and hot module reload (HMR)
- [Material UI (MUI)](https://mui.com/) for UI components
- [ESLint](https://eslint.org/) with basic TypeScript and React rules

To run locally:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build


## 👨‍💻 Author

  Built by Danie Ehrlich as side project.# reservation-table-app

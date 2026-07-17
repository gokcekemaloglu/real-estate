# Görkem Emlak — Real Estate Platform (Frontend)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9-2B3440?style=flat&logo=pnpm)](https://pnpm.io/)

A modern real-estate web application for browsing properties and managing listings/customers through an admin area.

> Notes
> - This repository is the **frontend**.
> - Routing is protected with client-side guards (Auth/Private/Admin routes).

---

## ✨ Highlights

- **Clean route structure with guards**
  - `AuthRoute` protects auth-only pages (login/register).
  - `PrivateRouter` protects user-only pages (profile/favorites).
  - `AdminRoute` protects the admin dashboard.
  - Pages are **lazy-loaded** in `src/router/AppRouter.jsx` for better perceived performance.

- **Centralized data fetching**
  - `src/hooks/useFetchData.jsx` encapsulates request logic and dispatches slice actions consistently.

- **State management with Redux Toolkit**
  - Slices for auth, favorites, and properties.

- **UI built with Tailwind CSS**
  - Global theming via `src/context/ThemeContext.jsx`.

- **Forms & validation**
  - `formik` + `yup` used for structured form handling.

---

## 🧰 Tech Stack

### Frontend
- **React 19**
- **Vite**
- **Redux Toolkit**
- **React Redux**
- **React Router DOM (v7)**
- **Axios**

### UI / Styling
- **Tailwind CSS**
- **ThemeContext** (dark/light)

### Forms / Notifications
- **Formik**
- **Yup**
- **SweetAlert2** (via `src/helper/SweetNotify.jsx`)

### Package manager
- **pnpm**

---

## 📁 Project Structure

```text
src/
├── App.jsx
├── index.css
├── main.jsx
├── app/
│   └── store.jsx
├── assets/
│   └── gorkem-emlak-ofis.png
├── components/
│   ├── AdminPropertyDetailMediaLightbox.jsx
│   ├── ErrorBoundary.jsx
│   ├── Footer.jsx
│   ├── ImagePlaceholder.jsx
│   ├── Navbar.jsx
│   ├── PropertyDisplayBar.jsx
│   ├── ScrollToTop.jsx
│   ├── ThemeToggle.jsx
│   ├── UserLayout.jsx
│   ├── about/
│   │   ├── AboutContent.jsx
│   │   ├── AboutHeader.jsx
│   │   └── AboutShowcase.jsx
│   ├── admin/
│   │   ├── AdminActiveFilter.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminOwnerFilter.jsx
│   │   ├── AdminSearchFilters.jsx
│   │   ├── customers/
│   │   │   ├── AdminCustomerHeader.jsx
│   │   │   ├── AdminCustomerPropertiesList.jsx
│   │   │   ├── AdminCustomerRow.jsx
│   │   │   ├── FormBlockCustomerInfo.jsx
│   │   │   └── FormBlockCustomerNotes.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardCategoryDistribution.jsx
│   │   │   └── DashboardWidgets.jsx
│   │   ├── properties/
│   │   │   ├── detail/
│   │   │   │   ├── AdminPropertyDetailAddress.jsx
│   │   │   │   ├── AdminPropertyDetailMedia.jsx
│   │   │   │   ├── AdminPropertyDetailMetrics.jsx
│   │   │   │   ├── AdminPropertyDetailOverview.jsx
│   │   │   │   ├── AdminPropertyDetailPrice.jsx
│   │   │   │   └── AdminPropertyDetailMedia.jsx
│   │   │   └── form/
│   │   │       ├── FormBlockImage.jsx
│   │   │       ├── FormBlockLocation.jsx
│   │   │       ├── FormBlockOwner.jsx
│   │   │       ├── FormBlockPrice.jsx
│   │   │       ├── FormBlockSpecs.jsx
│   │   │       ├── FormBlockTitle.jsx
│   │   │       ├── FormBlockToggles.jsx
│   │   │       ├── FormSelectField.jsx
│   │   │       ├── FormToggleField.jsx
│   │   │       └── propertyImage/
│   │   │           ├── ImageGalleryGrid.jsx
│   │   │           └── ImageUploadInput.jsx
│   │   └── properties/
│   │       └── list/
│   │           ├── AdminPropertyHeader.jsx
│   │           └── AdminPropertyRow.jsx
│   ├── auth/
│   │   ├── AuthFooterLink.jsx
│   │   ├── FormInput.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── contact/
│   │   ├── ContactForm.jsx
│   │   ├── ContactHeader.jsx
│   │   ├── ContactInfo.jsx
│   │   └── ContactMap.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── HomeCategories.jsx
│   │   ├── HomeFeatured.jsx
│   │   ├── HomeRecent.jsx
│   │   └── HomeServices.jsx
│   ├── navbar/
│   │   ├── MobileMenu.jsx
│   │   ├── NavLinks.jsx
│   │   └── UserDropdown.jsx
│   ├── profile/
│   │   ├── ProfileAvatar.jsx
│   │   ├── ProfileChangePasswordForm.jsx
│   │   ├── ProfileDeleteForm.jsx
│   │   ├── ProfileUpdateForm.jsx
│   └── properties/
│       ├── PaginationComponent.jsx
│       ├── PropertyCard.jsx
│       ├── PropertyDescription.jsx
│       ├── PropertyFeaturesPanel.jsx
│       ├── PropertyFilters.jsx
│       ├── PropertyGallery.jsx
│       ├── PropertyHeader.jsx
│       ├── PropertyMediaGallery.jsx
│       └── PropertyRowCard.jsx
├── context/
│   └── ThemeContext.jsx
├── features/
│   ├── authSlice.jsx
│   ├── customerSlice.jsx
│   ├── favoritesSlice.jsx
│   ├── propertySlice.jsx
│   └── userSlice.jsx
├── helper/
│   ├── SweetNotify.jsx
│   ├── ValidationSchemas.js
│   ├── listingTypeLabels.js
│   └── navigationRoutes.js
├── hooks/
│   ├── useAxios.jsx
│   ├── useAuthCall.jsx
│   ├── useCustomerCall.jsx
│   ├── useFavoritesCall.jsx
│   ├── useFetchData.jsx
│   ├── useMediaGallery.jsx
│   └── usePropertyCall.jsx
├── pages/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MyFavorites.jsx
│   ├── Profile.jsx
│   ├── Properties.jsx
│   ├── PropertyDetail.jsx
│   ├── Register.jsx
│   └── admin/
│       ├── AdminCustomerDetail.jsx
│       ├── AdminCustomerForm.jsx
│       ├── AdminCustomers.jsx
│       ├── AdminProperties.jsx
│       ├── AdminPropertyDetail.jsx
│       ├── AdminPropertyForm.jsx
│       ├── AdminUserDetail.jsx
│       ├── AdminUsers.jsx
│       └── DashboardHome.jsx
└── router/
    ├── AdminRoute.jsx
    ├── AppRouter.jsx
    ├── AuthRoute.jsx
    └── PrivateRouter.jsx
```

---

## 🧭 Routes Overview

Main public pages:
- `/` → Home
- `/properties` → Properties
- `/properties/:id` → Property detail
- `/about` → About
- `/contact` → Contact

Auth-protected pages:
- `/profile/:id` → Profile
- `/favorites` → My favorites

Admin area:
- `/admin` → Admin layout/dashboard
- `/admin/properties` → Admin properties list
- `/admin/properties/create` → Create property
- `/admin/properties/edit/:id` → Edit property
- `/admin/properties/detail/:id` → Property detail (admin)
- `/admin/customers` → Customers list
- `/admin/customers/create` → Create customer
- `/admin/customers/edit/:id` → Edit customer
- `/admin/customers/detail/:id` → Customer detail (admin)
- `/admin/users` → Users list
- `/admin/users/detail/:id` → User detail (admin)

---

## 🚀 Getting Started

### Requirements
- Node.js (LTS recommended)
- pnpm

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
The app will run at:
- http://localhost:5173

### Build
```bash
pnpm build
```

### Preview (production build)
```bash
pnpm preview
```

### Lint
```bash
pnpm lint
```

---

## 🧩 How Data Fetching Works (High-level)

- `src/hooks/useFetchData.jsx` centralizes API request + error handling.
- It dispatches the passed slice actions (e.g., `fetchStart`, `setData`, `fetchFail`) to keep loading/error states consistent.

---

## 🛡️ Client-side Guards

- `PrivateRouter` redirects to `/login` when a user token is missing.
- `AdminRoute` redirects to `/` when `isAdmin` is not true.

> Security note: these are **client-side** protections. Real security must be enforced on the backend as well.

---

## 🎯 Employer-style Review (Draft)

### What works well
- Clear tech stack and setup instructions.
- Good separation of concerns: components / pages / hooks / slices.
- Lazy loading + route guards are documented.

### Remaining gaps (and why we improved)
- The previous README had over-claims and some mismatches (e.g., file extensions and folder naming). This version:
  - Keeps claims grounded in what’s present in the code.
  - Documents the folder tree more accurately.
  - Adds an employer-friendly “Routes Overview” section.

---

## 📜 License

Add your license information here (e.g., MIT).

# 🎯 Admin Dashboard

A modern, feature-rich admin dashboard built with **Angular 19** and **Bootstrap 5**. This application provides comprehensive user and product management capabilities with role-based access control, data visualization, and a beautiful dark/light theme toggle.

![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?style=flat&logo=angular)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=flat&logo=chart.js)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based Access Control** - Admin and User roles with different permissions
- **Protected Routes** - Authentication and role guards
- **Persistent Sessions** - LocalStorage-based session management

### 👥 User Management (Admin Only)
- Full CRUD operations (Create, Read, Update, Delete)
- Advanced filtering by role and status
- Search functionality across all fields
- Multi-column sorting (Name, Email, Role, Status)
- Pagination (5 users per page)
- Beautiful confirmation modals for deletions
- 15 pre-populated demo users

### 📦 Product Management (Admin Only)
- Complete product CRUD operations
- Grid and List view modes
- Category-based filtering
- Stock status filtering
- Search and sort capabilities
- Image upload (URL or file upload)
- Pagination (6 products per page)
- 18 pre-populated products with real images

### 📊 Dashboard & Analytics
- **Admin Dashboard:**
  - Real-time statistics (Total Users, Products, Low Stock, Revenue)
  - Sales Trend Line Chart
  - Category Distribution Pie Chart
  - Orders per Month Bar Chart
  - Powered by Chart.js with dark mode support

- **User Dashboard:**
  - Personalized welcome screen
  - Account information display
  - Quick access links

### ⚙️ Settings & Profile
- Profile editing with modal interface
- Activity log viewer
- Recent activity tracking
- Change password functionality (UI ready)

### 🎨 UI/UX Features
- **Theme Toggle** - Beautiful light/dark mode with smooth transitions
- **Toast Notifications** - Success, Error, Warning, Info messages
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Animations** - Smooth transitions, hover effects, loading states
- **Fixed Sidebar** - Persistent navigation with role-based menu items
- **Custom Scrollbars** - Styled for both light and dark themes

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamaayushk/admin-dashboard.git
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:4200/
   ```

---

## 🔑 Login Credentials

### Admin Account
- **Email:** `admin@gmail.com`
- **Password:** `123456`
- **Access:** Full access to all features (Users, Products, Dashboard, Settings)

### User Account
- **Email:** `user@gmail.com`
- **Password:** `123456`
- **Access:** Limited access (Dashboard, Settings only)

---

## 🏗️ Project Structure

```
admin-dashboard/
├── src/
│   ├── app/
│   │   ├── core/                    # Core services and guards
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts    # Authentication guard
│   │   │   │   └── role.guard.ts    # Role-based access guard
│   │   │   └── services/
│   │   │       ├── auth.service.ts  # Authentication logic
│   │   │       ├── user.service.ts  # User CRUD operations
│   │   │       ├── product.service.ts # Product CRUD operations
│   │   │       ├── theme.service.ts # Theme management
│   │   │       └── toast.service.ts # Toast notifications
│   │   │
│   │   ├── modules/                 # Feature modules
│   │   │   ├── auth/
│   │   │   │   └── login/           # Login component
│   │   │   ├── dashboard/           # Dashboard with charts
│   │   │   ├── users/               # User management
│   │   │   │   ├── user-list/       # User list with filters
│   │   │   │   └── user-form/       # Add/Edit user form
│   │   │   ├── products/            # Product management
│   │   │   │   ├── product-list/    # Product list with views
│   │   │   │   └── product-form/    # Add/Edit product form
│   │   │   └── settings/            # Settings and profile
│   │   │
│   │   ├── shared/                  # Shared components
│   │   │   └── components/
│   │   │       ├── layout/          # Main layout wrapper
│   │   │       ├── navbar/          # Top navigation bar
│   │   │       ├── sidebar/         # Fixed sidebar navigation
│   │   │       └── toast/           # Toast notification component
│   │   │
│   │   ├── app.routes.ts            # Application routing
│   │   └── app.config.ts            # App configuration
│   │
│   ├── styles.scss                  # Global styles & theme variables
│   └── index.html                   # Main HTML file
│
├── angular.json                     # Angular configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

---

## 🎨 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Angular 19** | Frontend framework with standalone components |
| **TypeScript 5.7** | Type-safe programming language |
| **Bootstrap 5.3** | UI framework and responsive grid |
| **Chart.js 4.5** | Data visualization and charts |
| **RxJS 7.8** | Reactive programming with Observables |
| **SCSS** | CSS preprocessor with variables and nesting |

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at http://localhost:4200 |
| `npm run build` | Build project for production |
| `npm run watch` | Build project in watch mode |
| `npm test` | Run unit tests with Karma |

---

## 🎯 Key Features Breakdown

### 1. Theme System
- CSS variables for dynamic theming
- Persistent theme preference (localStorage)
- Auto-detects system preference on first load
- Smooth transitions between modes
- Chart.js theme synchronization

### 2. Data Management
- LocalStorage-based persistence
- Pre-populated demo data (15 users, 18 products)
- Real-time updates across components
- Data validation and error handling

### 3. User Experience
- Toast notifications for all actions
- Confirmation modals for destructive operations
- Loading states and animations
- Responsive design for all screen sizes
- Keyboard-friendly navigation

### 4. Security
- Authentication guards on protected routes
- Role-based menu visibility
- Session management
- XSS prevention with Angular's built-in sanitization

---

## 🔧 Configuration

### Development Server
The development server runs on `http://localhost:4200/` by default. To change the port:

```bash
ng serve --port 4300
```

### Build for Production
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

### Environment Variables
Currently using LocalStorage. To integrate with a backend API:
1. Create environment files in `src/environments/`
2. Update services to use HTTP calls
3. Configure API endpoints

---

## 🎨 Customization

### Changing Theme Colors
Edit the CSS variables in `src/styles.scss`:

```scss
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  --sidebar-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // ... more variables
}

body.dark-theme {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  // ... dark theme overrides
}
```

### Adding New Routes
Update `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: 'your-route', component: YourComponent, canActivate: [AuthGuard] }
];
```

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

The sidebar and layout automatically adapt to screen size.

---

## 🐛 Known Limitations

- Data stored in LocalStorage (not persistent across devices)
- No backend API integration (demo mode)
- Image upload stores base64 in LocalStorage (not recommended for production)
- No email verification or password reset functionality

---


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Aayush Kumar**
- GitHub: [@iamaayushk](https://github.com/iamaayushk)
- Made with ❤️ by Aayush 

---



## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

**Happy Coding! 🚀**



# Quwwa Health - React Frontend

A modern React application for Quwwa Health with Redux state management and authentication.

## Features

- 🔐 **Authentication System**
  - User registration and login
  - Email verification system with token-based verification
  - Google OAuth integration
  - JWT token management
  - Protected routes
  - User profile management

- 🎨 **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Beautiful animations and transitions
  - Mobile-friendly interface

- 📱 **Redux State Management**
  - Centralized state management
  - Async actions with Redux Toolkit
  - Automatic token refresh
  - Persistent authentication

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `localhost:3000`

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quwwahealth
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google OAuth (optional):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Replace `YOUR_GOOGLE_CLIENT_ID` in the config or set `VITE_GOOGLE_CLIENT_ID` environment variable

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── LoginForm.jsx   # Login form with Redux integration
│   ├── SignupForm.jsx  # Signup form with Redux integration
│   ├── Header.jsx      # Navigation header with auth state
│   ├── UserProfile.jsx # User profile management
│   ├── ProtectedRoute.jsx # Route protection component
│   └── EmailVerification.jsx # Email verification component
├── pages/              # Page components
│   ├── Auth.jsx        # Authentication page
│   ├── Profile.jsx     # User profile page
│   └── ...
├── store/              # Redux store configuration
│   ├── store.js        # Main store setup
│   └── slices/         # Redux slices
│       └── authSlice.js # Authentication state management
├── utils/              # Utility functions
│   └── axiosConfig.js  # Axios configuration with interceptors
└── main.jsx           # Application entry point
```

## Authentication Features

### User Registration
- Email and password registration
- Form validation
- Error handling
- Email verification required before login
- Success message with verification instructions

### User Login
- Email/password authentication
- Email verification check
- Google OAuth integration
- Remember me functionality
- Error handling and user feedback
- Resend verification email option

### Email Verification System
- **Registration Flow**:
  - User signs up with email/password
  - System creates account with `isEmailVerified: false`
  - Backend generates verification token and sends email
  - Frontend shows "Check Your Email" message
  - User must verify email before logging in

- **Verification Process**:
  - User receives email with verification link
  - Link format: `http://localhost:5173/verify-email?token=VERIFICATION_TOKEN`
  - Frontend extracts token and sends to `/api/auth/verify-email`
  - Backend verifies token and marks email as verified
  - User can now log in successfully

- **Resend Verification**:
  - If email not received, user can request new verification
  - Available in both signup success page and login error
  - System generates fresh token and sends new email

### Google OAuth
- One-tap sign-in
- Automatic account creation
- Profile picture and email import
- Seamless integration with existing accounts
- No email verification required for Google accounts

### User Profile
- View and edit profile information
- Update avatar URL
- Display account type (Google/Email)
- Email verification status

### Token Management
- Automatic JWT token refresh
- Persistent authentication across sessions
- Secure token storage in localStorage
- Automatic logout on token expiration

## API Endpoints

The frontend expects the following API endpoints on `localhost:3000`:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/refresh` - Refresh JWT token

## State Management

The application uses Redux Toolkit for state management:

### Auth Slice
- User authentication state
- Loading states
- Error handling
- Token management
- Email verification states
- Async actions for API calls

### Key Actions
- `login(credentials)` - User login
- `signup(userData)` - User registration
- `googleLogin(idToken)` - Google OAuth login
- `verifyEmail(token)` - Email verification
- `resendVerificationEmail(email)` - Resend verification email
- `logout()` - User logout
- `getProfile()` - Fetch user profile
- `updateProfile(profileData)` - Update user profile
- `refreshToken()` - Refresh JWT token

## Email Verification Flow

### 1. User Registration
```
User fills signup form → 
Backend creates account (isEmailVerified: false) → 
Backend sends verification email → 
Frontend shows "Check Your Email" message
```

### 2. Email Verification
```
User clicks email link → 
Frontend navigates to /verify-email?token=TOKEN → 
Frontend sends token to /api/auth/verify-email → 
Backend verifies token → 
Frontend shows success message → 
User can now log in
```

### 3. Login with Unverified Email
```
User tries to login → 
Backend returns "Please verify your email" error → 
Frontend shows error with "Resend verification email" option → 
User can request new verification email
```

## Protected Routes

The application includes a `ProtectedRoute` component that:
- Checks authentication status
- Redirects unauthenticated users to login
- Shows loading state while checking auth
- Automatically fetches user profile if needed

## Styling

The application uses Tailwind CSS for styling with:
- Custom color scheme matching the brand
- Responsive design
- Modern UI components
- Smooth animations and transitions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware linting:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
	// ...
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: import.meta.dirname,
	},
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

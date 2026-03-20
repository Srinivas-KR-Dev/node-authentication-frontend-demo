# Node Authentication Frontend

Simple React frontend built to demonstrate how the [Node-authentication-API](https://github.com/Srinivas-KR-Dev/Node-authentication-API) backend works in a real UI flow.

This frontend showcases:

- registration form with validation
- login form calling `/auth`
- access token handling with React context
- protected employee list page
- logout flow
- refresh-token based retry for expired access tokens

## Tech Stack

- React 19
- Vite 6
- React Router
- Axios
- React Context API
- ESLint

## Project Flow

1. Register a new user.
2. Review the registered user details page.
3. Login using the created account.
4. Access the protected employee list page.
5. Logout and clear the in-memory access token.

## Environment Setup

Create a `.env` file from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3500
```

## Run Locally

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Backend Connection

This frontend is designed to work with:

- [Node-authentication-API](https://github.com/Srinivas-KR-Dev/Node-authentication-API)

Make sure the backend is running on the API base URL before testing the UI.

## Example Demo Data

Example registered user details shown in the UI:

- Username: `alice_dev`
- Full Name: `Alice Johnson`
- Email: `alice@example.com`

Example employee details shown in the UI:

- John Doe - Backend Developer
- Priya Sharma - HR Executive
- Arun Kumar - Sales Manager

## Author

Srinivas KR  
GitHub: [Srinivas-KR-Dev](https://github.com/Srinivas-KR-Dev)

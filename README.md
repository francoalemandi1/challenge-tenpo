# Tenpo Challenge

A modern web application built with Next.js, TypeScript, and a robust tech stack.

## Features

- Email/Password Authentication with cookie-based sessions
- Role-based User Permissions
- Responsive design (web and mobile)
- Public and private routing contexts
- Integration with public APIs
- Modern UI components with shadcn/ui
- Styling with Tailwind CSS
- Form handling with Conform and Zod
- End-to-end testing with Playwright
- Unit testing with Vitest

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Axios for API requests
- Zod for schema validation
- React Hook Form with Conform
- Playwright for E2E testing
- Vitest for unit testing
- ESLint and Prettier for code quality

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

- Run unit tests:
  ```bash
  npm run test
  ```
- Run E2E tests:
  ```bash
  npm run test:e2e
  ```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── services/          # API services and business logic
└── styles/            # Global styles and Tailwind config
```

## Authentication

The application uses a fake authentication system that:
- Accepts email and password
- Returns a mock JWT token
- Stores the token in memory using appropriate state management
- Includes token in subsequent API requests

## API Integration

The application connects to public APIs and implements:
- Axios instance configuration with interceptors
- Token management
- Error handling
- Request/response transformations

## Development

- Follow the code style enforced by ESLint and Prettier
- Run `npm run lint` to check for linting issues
- Run `npm run format` to format code with Prettier

## License

MIT

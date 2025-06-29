# Piano Lessons Frontend

A React application with authentication built using TanStack Router, TanStack Query, and Tailwind CSS.

## Features

- **Authentication System**: Complete login/register functionality
- **Protected Routes**: Automatic redirection for unauthenticated users
- **User Management**: Profile management and teacher/student roles
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support

## Setup

1. Install dependencies:
```bash
cd frontend
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Authentication Flow

### Registration
- Users can register with email, password, and optional profile information
- Teacher/student role selection during registration
- Password confirmation and validation
- Success message with redirect to login

### Login
- Email and password authentication
- JWT token storage in localStorage
- Automatic user data fetching after login
- Error handling for invalid credentials

### Protected Routes
- Dashboard and Teachers pages require authentication
- Automatic redirect to login for unauthenticated users
- Loading states during authentication checks

## API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`:

- **Authentication**: JWT-based authentication
- **User Management**: CRUD operations for user profiles
- **Teacher Listing**: Fetch and display available teachers

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx      # Login form component
│   │   ├── RegisterForm.tsx   # Registration form component
│   │   └── ProtectedRoute.tsx # Route protection wrapper
│   └── Header.tsx             # Navigation header
├── contexts/
│   └── AuthContext.tsx        # Authentication context provider
├── lib/
│   └── api.ts                 # API client functions
├── routes/
│   ├── __root.tsx             # Root route with providers
│   ├── index.tsx              # Home page
│   ├── login.tsx              # Login page
│   ├── register.tsx           # Registration page
│   ├── dashboard.tsx          # User dashboard
│   └── teachers.tsx           # Teachers listing
└── types/
    └── auth.ts                # TypeScript type definitions
```

## Usage

### For Users
1. Visit the homepage and click "Get Started" or "Sign In"
2. Register a new account or login with existing credentials
3. Access the dashboard to view your profile and available features
4. Browse teachers and contact them for lessons

### For Teachers
1. Register with the "I am a teacher" option checked
2. Complete your profile with bio and teaching information
3. Students can discover and contact you through the teachers listing

## Development

### Adding New Routes
1. Create a new file in `src/routes/` with the route name
2. Use the `createFileRoute` function from TanStack Router
3. Import and use the `ProtectedRoute` component for authenticated routes

### Styling
- Uses Tailwind CSS for styling
- Responsive design with mobile-first approach
- Consistent color scheme and component styling

### State Management
- Authentication state managed through React Context
- TanStack Query for server state management
- Local storage for token persistence

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Backend Requirements

Make sure the FastAPI backend is running with:
- Authentication endpoints at `/auth/*`
- CORS configured for `http://localhost:3000`
- JWT token authentication

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend has CORS configured for the frontend URL
2. **Authentication Errors**: Check that the backend is running and accessible
3. **Route Errors**: Verify that all route files are properly named and exported

### Development Tips

- Use the browser's developer tools to inspect network requests
- Check the console for authentication-related errors
- Verify that JWT tokens are being stored in localStorage

Welcome to your new TanStack app! 

# Getting Started

To run this application:

```bash
pnpm install
pnpm start  
```

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.


## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:


```bash
pnpm lint
pnpm format
pnpm check
```


## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpx shadcn@latest add button
```



## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).


## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

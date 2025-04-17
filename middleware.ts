import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be publicly accessible
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', // Make sign-in routes public
  '/sign-up(.*)', // Make sign-up routes public
  '/api/health', // Example public API route
  // Add any other public routes here, e.g., landing page, marketing pages
]);

export default clerkMiddleware((auth, req) => {
  // Protect routes that are not public
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

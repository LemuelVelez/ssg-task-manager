// pages/auth/error.tsx
const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl text-red-600">Authentication Failed</h1>
      <p className="mt-4">There was an error logging in. Please try again.</p>
    </div>
  );
};

export default ErrorPage;

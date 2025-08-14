import { Header } from '../components/Header';

export function NotFoundPage() {
  return (
    <>
      <title>404: Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header />

      <div className="not-found-message">
        Page Not Found
      </div>
    </>
  );
}
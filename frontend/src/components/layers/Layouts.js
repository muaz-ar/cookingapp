// components/Layout.js
import Navigation from "../navigation/Navigation.1";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

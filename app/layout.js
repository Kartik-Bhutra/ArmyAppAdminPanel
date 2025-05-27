import "@/styles/globals.css";

export const metadata = {
  title: "Army Admin Panel",
  description: "Administrative panel for Army application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

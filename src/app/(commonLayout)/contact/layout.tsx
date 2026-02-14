export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <h1>This is a contact layout</h1>
        {children}
      </body>
    </html>
  );
}
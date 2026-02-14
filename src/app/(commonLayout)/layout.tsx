import { Navbar1 } from "@/components/layout/navbar1";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        
            <Navbar1></Navbar1>
            {children}
          
      </body>
    </html>
  );
}
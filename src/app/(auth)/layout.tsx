import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen font-inter flex-center">
      <div className="flex w-full xl:large">
        {children}
        <div className="auth-asset xl:h-full">
          <Image
            src="/icons/auth-image.svg"
            width={450}
            height={500}
            alt="alt image"
          />
        </div>
      </div>
    </main>
  );
}

import { Inter } from 'next/font/google';
import './globals.css'; // Certifique-se de que este arquivo CSS contém as regras @font-face para Geist

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

// Se você tiver o CSS @font-face para Geist Mono no seu arquivo globals.css, não precisa importar de outro lugar aqui.

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-geist-mono antialiased`}>
                {children}
            </body>
        </html>
    );
}

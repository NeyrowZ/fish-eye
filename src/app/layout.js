import "./globals.css";

export const metadata = {
    title: "Fish Eye",
    description: "Site de photographes"
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
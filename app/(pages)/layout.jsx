import "@globals/globals.scss";
import fonts from "@globals/fonts";
import metadata from "@globals/metadata";

export { metadata };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={fonts}>{children}</body>
        </html>
    );
}

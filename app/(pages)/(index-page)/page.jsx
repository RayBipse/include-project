"use client";
import { useRef, useState } from "react";
import styles from "./page.module.scss";

import Map from "./_components/Map/Map";
import { PostButton, PostMenu } from "./_components/Post/Post";
import Gallery from "./_components/Gallery/Galley";

export default function Home() {
    const menuRef = useRef(null);
    const [area, setArea] = useState(0);
    const [galleryDisplay, setGalleryDisplay] = useState(false);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <PostButton menuRef={menuRef} />
            </header>
            <PostMenu menuRef={menuRef} />
            <Gallery galleryDisplay={galleryDisplay} area={area} setGalleryDisplay={setGalleryDisplay} />
            <Map menuRef={menuRef} setArea={setArea} setGalleryDisplay={setGalleryDisplay} />
        </main>
    );
}

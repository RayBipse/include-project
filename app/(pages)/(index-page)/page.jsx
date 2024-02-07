"use client";
import { useRef } from "react";
import styles from "./page.module.scss";

import SearchBar from "./_components/search/SearchBar";
import Map from "./_components/Map/Map";
import { PostButton, PostMenu } from "./_components/Post/Post";

export default function Home() {
    const menuRef = useRef(null);

    const handleCircleClick = (point) => {
        setShowPostPage(true);
    };
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                {/* <PostButton menuRef={menuRef} /> */}
                <SearchBar />
            </header>
            {/* <PostMenu menuRef={menuRef} /> */}
            <Map menuRef={menuRef} />
        </main>
    );
}

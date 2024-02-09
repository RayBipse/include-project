"use client";
import React from "react";
import styles from "./Gallery.module.scss";
import { useState, useEffect } from "react";

const Gallery = ({ area, galleryDisplay, setGalleryDisplay }) => {
    const handleClose = () => {
        setGalleryDisplay(false);
    };

    if (!galleryDisplay) {
        return <></>;
    }

    const [posts, setPosts] = useState([]);

    if (area != 0) {
        useEffect(() => {
            async function getPosts() {
                try {
                    let response = await fetch(`http://localhost:3000/api/posts?area=${area}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (response.ok) {
                        console.log("Posts fetched successfully");
                    } else {
                        console.error("Failed to fetched posts");
                    }
                    response = await response.json();
                    setPosts(response.data);
                } catch (error) {
                    console.error("An error occurred while fetching posts:", error);
                }
            }
            getPosts();
        }, []);
    }

    console.log(posts);

    return (
        <div className={styles.gallery}>
            <h1 className={styles.title}>Gallery</h1>
            <div className={styles.galleryItemWrapper}>
                {posts.map((post, index) => (
                    <div className={styles.galleryItem} key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <img src={post.imageData} alt={post.title} />
                    </div>
                ))}
            </div>
            <button className={styles.closeButton} onClick={handleClose}>
                Close
            </button>
        </div>
    );
};

export default Gallery;

"use client";
import { useState } from "react";
import styles from "./Post.module.scss";

export function PostButton({ menuRef }) {
    return (
        <div
            onClick={() => {
                menuRef.current.showModal();
            }}
            className={styles.postButton}
        >
            Upload post
        </div>
    );
}

export function PostMenu({ menuRef, onClose, selectedPoint }) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const onPost = async (data) => {
        try {
            console.log(data);
            const response = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Post created successfully");
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("An error occurred while creating the post:", error);
        }
    };

    return (
        <dialog id="post-dialog" className={styles.postMenu} ref={menuRef}>
            <h1 className={styles.modalTitle}>Upload post</h1>
            <section className={styles.modalInputs}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </section>
            <section className={styles.sectionButtons}>
                <button
                    onClick={() => {
                        menuRef.current.close();
                    }}
                >
                    Cancel
                </button>
                <button onClick={() => onPost({ title, description })}>Post!</button>
            </section>
        </dialog>
    );
}

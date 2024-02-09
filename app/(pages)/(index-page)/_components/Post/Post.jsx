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

export function PostMenu({ menuRef }) {
    const [title, setTitle] = useState("");
    const [area, setArea] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handlePost = async () => {
        if (image) {
            try {
                const imageData = await readFile(image);
                onPost({ title, description, area, imageData });
                menuRef.current.close();
            } catch (error) {
                console.error("Error reading image file", error);
            }
        } else {
            console.error("No image found");
        }
    };

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const onPost = async (data) => {
        try {
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
                <input type="file" onChange={handleImageChange} />
                <label>Area ID</label>
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
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
                <button onClick={() => handlePost()}>Post!</button>
            </section>
        </dialog>
    );
}

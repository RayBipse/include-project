"use client";
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
    return (
        <dialog id="post-dialog" className={styles.postMenu} ref={menuRef}>
            <h1>Upload post</h1>
            <section>
                <label>Title</label>
                <input type="text"></input>
                <label>Image</label>
                <input type="file"></input>
                <label>Description</label>
                <input type="text"></input>
            </section>
            <section>
                <button
                    onClick={() => {
                        menuRef.current.close();
                    }}
                >
                    Cancel
                </button>
                <button>Post!</button>
            </section>
        </dialog>
    );
}

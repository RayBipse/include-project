import styles from "./Post.module.scss";

export function PostButton() {
    return <div onClick="">Upload post</div>;
}

export function PostMenu() {
    return (
        <dialog id="post-dialog">
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
                <button>Cancel</button>
                <button>Post!</button>
            </section>
        </dialog>
    );
}

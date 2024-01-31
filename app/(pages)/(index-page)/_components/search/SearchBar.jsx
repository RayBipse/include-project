import styles from "./SearchBar.module.scss";

export default function SearchBar() {
    return (
        <div className={styles.searchBarWrapper}>
            <input type="text" className={styles.searchBar} name="Search Bar" id="search-bar" placeholder="Search here" />
        </div>
    );
}

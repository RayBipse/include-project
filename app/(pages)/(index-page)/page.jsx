import Map from "./_components/Map/Map";
import { PostButton } from "./_components/Post/Post";
import SearchBar from "./_components/search/SearchBar";

export default function Home() {
    return (
        <main>
            <header>
                <PostButton />
                <SearchBar />
            </header>
            <Map />
        </main>
    );
}

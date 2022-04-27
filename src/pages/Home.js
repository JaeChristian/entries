import PostEntry from "../components/PostEntry";
import ContentLayout from "../layouts/ContentLayout";

function Home() {
    return(
        <ContentLayout showNav={true}>
            <PostEntry/>
        </ContentLayout>
    );
}
export default Home;
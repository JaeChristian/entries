import PostEntry from "../components/PostEntry";
import ContentLayout from "../layouts/ContentLayout";
import { Navigate } from "react-router-dom";

function Home() {
    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    }
    console.log(localStorage.getItem("token"));
    return(
        <ContentLayout showNav={true}>
            <PostEntry/>
        </ContentLayout>
    );
}
export default Home;
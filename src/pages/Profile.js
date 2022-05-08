import PostEntry from "../components/PostEntry";
import ContentLayout from "../layouts/ContentLayout";
import { Navigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";

function Profile() {
    const thisUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));
    const {userId} = useParams();
    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    }
    console.log(localStorage.getItem("token"));
    return(
        <ContentLayout showNav={true} containerSize="container.lg">
            <ProfileHeader userId={userId}/>
        </ContentLayout>
    );
}
export default Profile;
import ContentLayout from "../layouts/ContentLayout";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import CategoryPanel from "../components/CategoryPanel";

function Home() {

   // Checks if JWT token exists, if not then redirect to login.
    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    }
    console.log(localStorage.getItem("token"));

    return(
        <>
            <CategoryPanel/>
            <ContentLayout showNav={true}>
                <Outlet/>
            </ContentLayout>
            
        </>
    );
}
export default Home;
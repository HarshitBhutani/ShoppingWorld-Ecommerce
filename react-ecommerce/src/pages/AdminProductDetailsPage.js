import AdminProductDetails from "../features/admin/components/AdminProductDetails";
import Navbar from "../features/navbar/Navbar";

function AdminProductDetailsPage(){
    return(
        <div>
            <Navbar>
                <AdminProductDetails></AdminProductDetails>
            </Navbar>
        </div>
    )
}
 
export default AdminProductDetailsPage;
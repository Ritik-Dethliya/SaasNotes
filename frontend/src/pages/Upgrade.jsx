import axios from "axios";
import { useParams } from "react-router-dom";

function Upgrade() {
    const {slug}=useParams()
    console.log(slug)
    const handleCheckout=async()=>{
        try {
            let token=localStorage.getItem("token")
            const res=await axios.post(`https://saasnotes.onrender.com/tenants/${slug}/upgrade`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(resizeBy.data.ok)
        } catch (error) {
            console.log(error)
        }
    }
    return (  
        <>
            <div className="updrade-container">
                <h1>Upgrade Notes Limit</h1>
                <h3>200$</h3>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </>
    );
}

export default Upgrade;
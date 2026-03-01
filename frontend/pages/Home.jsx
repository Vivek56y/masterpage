import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

function Home(){
const [loggedInUser,setloggedInUser]=useState(" ");
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const navigate=useNavigate();
useEffect(()=>{
    setloggedInUser(localStorage.getItem("loggedInUser"));
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data?.message || "Failed to fetch products");
                setProducts([]);
                return;
            }

            setProducts(Array.isArray(data?.products) ? data.products : []);
        } catch (err) {
            setError(err?.message || "Failed to fetch products");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
},[])

const handleLogout=(e)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
        navigate("/login");
    }, 1000);
}
return(
    <div>
        <h1>Products</h1>
        <p>Welcome {loggedInUser}</p>
        <button onClick={handleLogout}>Logout</button>

        {loading && <p>Loading products...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && products.length === 0 && <p>No products found</p>}

        {!loading && !error && products.length > 0 && (
            <div>
                {products.map((p) => (
                    <div key={p.id}>
                        <h3>{p.name}</h3>
                        <p>Category: {p.category}</p>
                        <p>Price: {p.price}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
)}
export default Home;
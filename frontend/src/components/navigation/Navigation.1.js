import Link from "next/link";

export default function Navigation() {
    return (
        <div>
            <nav style={{
                marginTop: "10px",
                display: "flex",
                gap: "2rem",
                backgroundColor: "#9ca3af",
                padding: "1rem"
            }}> 
                <Link className="link" style={{ fontSize: "20px", textDecoration: "none", color: "black" }} href="/">Home</Link>
                <Link className="link" style={{ fontSize: "20px", textDecoration: "none", color: "black" }} href="/add/page">Add Recepts</Link>
            </nav>
            <br></br>
        </div>
    );
}

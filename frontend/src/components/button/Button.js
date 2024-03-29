import Link from "next/link"; 

export default function Button(props) {
    return (
        <Link href={props.href}>
            <button style={{
            padding: "1rem",
            backgroundColor: "#a855f7"}}> {props.name}</button>
        </Link>
    );
};
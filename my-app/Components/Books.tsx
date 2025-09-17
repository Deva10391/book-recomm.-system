import { useEffect, useState } from "react";
import Show_books from "./Show_books";

function Books() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/get_books')
        .then((res) => res.json())
        .then((data) => setBooks(data));
    }, []);

    return (
        <Show_books elements={books}/>
    );
}

export default Books
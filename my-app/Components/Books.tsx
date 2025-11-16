import { useEffect, useState } from "react";
import Show_books from "./Show_books";

function Books() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/get_books')
        .then((res) => res.json())
        .then((data) => setBooks(data));
    }, []);

    return (
        <Show_books elements={books}/>
    );
}

export default Books
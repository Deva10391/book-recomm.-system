import { useEffect, useState } from "react";
import Book_comp from './Book_comp'

function Show_books({elements}) {
    const [books, setBooks] = useState([]);
    const [showRec, setShowRec]= useState(false);
    const [bookName, setBookName] = useState(null);

    useEffect(() => {
        setBooks(elements);
    }, [elements])

    async function getRecs (isbn) {
        setShowRec(true);
        try{
            const res = await fetch('http://127.0.0.1:8000/get_recs', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isbn }),
            });
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    return (
        <>
            <div style={{padding:"25px"}}>
                {showRec ? (
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <button
                        style={{
                            fontWeight:"bold",
                            width:"35px",
                            height:"35px",
                            marginRight: "10px",
                            borderRadius:"7.5px",
                            fontSize:"15px",
                            cursor:"pointer",
                        }}
                        onClick={() => {
                            setBooks(elements);
                            setShowRec(false);
                        }}
                        >
                            &lt;
                        </button>
                        <h3>after: {bookName}</h3>
                    </div>
                ):(
                    <div>
                        <h3>Please Pick</h3>
                    </div>
                )}
            </div>
            <div style={{justifyContent:"center", display:"flex", gap:"25px", flexWrap:"wrap"}}>
                {books.map((book, k) => (
                    <Book_comp
                    onClick={() => {
                        getRecs(book['ISBN']);
                        setBookName(book['Book-Title']);
                    }}
                    key={k}
                    book={book}
                    showDetails={!showRec}
                    />
                ))}
            </div>
        </>
    );
}

export default Show_books
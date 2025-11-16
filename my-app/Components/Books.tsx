import { useEffect, useState } from "react";
import Book_comp from './Book_comp'
import { changeBooks, loadRec, changeCurrBook } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

function Books() {
    const dispatch = useDispatch();
    const [showBack, setShowBack] = useState(false);
    const books = useSelector(state => state.recomm.books);
    const bookName = useSelector(state => state.recomm.curr_book);

    const load_all = () => {
        dispatch(loadRec(true));
        fetch('http://127.0.0.1:8000/get_books')
        .then((res) => res.json())
        .then((data) => {
            dispatch(changeBooks(data));
        });
        dispatch(loadRec(false));
    }

    useEffect(() => {
        setShowBack(false);
        load_all();
    }, []);

    async function getRecs (isbn) {
        setShowBack(true);
        dispatch(loadRec(true));
        try{
            const res = await fetch('http://127.0.0.1:8000/get_recs', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isbn }),
            });
            const data = await res.json();
            dispatch(changeBooks(data));
        } catch (err) {
            console.error(err);
            return [];
        } finally {
            dispatch(loadRec(false));
        }
    };

    return (
        <>
            <div style={{
                padding:"25px",
                }}>
                {showBack ? (
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        alignItems: "center",
                        }}>
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
                            setShowBack(false);
                            load_all();
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
                {Array.isArray(books) && books.map((book, k) => (
                    <Book_comp
                    onClick={() => {
                        getRecs(book['ISBN']);
                        dispatch(changeCurrBook(book['Book-Title']));
                        dispatch(loadRec(true));
                    }}
                    key={k}
                    book={book}
                    />
                ))}
            </div>
        </>
    );
}

export default Books
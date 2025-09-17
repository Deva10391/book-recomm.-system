function Book_comp({book, onClick, showDetails}) {

    return (
        <>
            <div
            onClick={onClick}
            style={{
                cursor:"pointer",
                textAlign:"center",
                paddingBottom:"25px",
                paddingLeft:"25px",
                paddingRight:"25px",
                width:"400px",
                border:"1px solid black",
                borderRadius:"10px"
            }}>
                <h3>{book['Book-Title']}</h3>
                {showDetails ? (
                    <>    
                        <hr />
                        <h4>by: {book['Book-Author']}</h4>
                        <span><i>{book.Publisher} <b>|</b> {book['Year-Of-Publication']}</i></span>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default Book_comp
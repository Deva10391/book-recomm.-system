export const changeBooks = (value) => ({
    type: "CHANGE_BOOKS",
    payload: value,
});

export const loadRec = (loading) => ({
    type: "LOADING",
    payload: loading,
});

export const changeCurrBook = (curr_book) => ({
    type: "CHANGE_BOOK",
    payload: curr_book,
});
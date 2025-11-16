const initialState = {
    books: [],
    loading: false,
    curr_book: null,
}

export default function counterReducer(state = initialState, action) {
    switch (action.type){
        case 'CHANGE_BOOKS':
            return {
                ... state,
                books: action.payload,
            };
        case 'LOADING':
            return {
                ... state,
                loading: action.payload,
            };
        case 'CHANGE_BOOK':
            return {
                ...state,
                curr_book: action.payload,
            }
        default:
            return state;
    }
};
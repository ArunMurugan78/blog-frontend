import { GET_USER, SET_LIKE, DEL_LIKE, SET_BOOKMARK, DEL_BOOKMARK } from "../action/actionTypes";
const initialState = {
    isAuthenticated: false,
    user: {
        username: null,
        bookmarked: null,
        liked: null,
        id: null,
        description: null
    },
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            console.log("[Action]", action);
            return {
                isAuthenticated: true,
                user: {
                    username: action.data.userName,
                    id: action.data._id,
                    bookmarked: action.data.bookmarked,
                    liked: action.data.liked,
                    description: action.data.description
                },
            };
        case SET_LIKE:

            return {
                ...state,
                user: {
                    ...state.user,
                    liked: [...state.user.liked, { postID: action.id }]
                }
            }
        case DEL_LIKE:

            return {
                ...state,
                user: {
                    ...state.user,
                    liked: state.user.liked.filter((obj) => obj.postID != action.id)
                },
            };
        case SET_BOOKMARK:

            return {
                ...state,
                user: {
                    ...state.user,
                    bookmarked: [...state.user.bookmarked, { postID: action.id }]
                }
            }
        case DEL_BOOKMARK:
            console.log("\n[Deleting the Bookmark]\n");
            return {
                ...state,
                user: {
                    ...state.user,
                    bookmarked: state.user.bookmarked.filter((obj) => obj.postID != action.id)
                },
            };
        default:
            return state;
    }
};


export default userReducer;
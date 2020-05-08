import {
    GET_USER,
    SET_LIKE,
    DEL_LIKE,
    SET_BOOKMARK,
    DEL_BOOKMARK,
} from "./actionTypes";
import axios from "axios";
export const saveUser = (data) => {
    if (!data) {
        return { type: "None" };
    }
    return {
        type: GET_USER,
        data: data,
    };
};
export const saveLike = (id, type) => {
    return {
        type: type,
        id: id,
    };
};
export const saveBookmark = (id, type) => {
    return {
        type: type,
        id: id,
    };
};
export const setBookmark = (id, type = SET_BOOKMARK) => {
    return async(dispatch) => {
        if (type == SET_BOOKMARK) {
            dispatch(saveBookmark(id, SET_BOOKMARK));
            try {
                await axios.post("/userdata/bookmarked/" + id);

            } catch {
                console.log(err);
            }
        } else {
            dispatch(saveBookmark(id, DEL_BOOKMARK));
            try {
                await axios.delete("/userdata/bookmarked/" + id);

            } catch {
                console.log(err);
            }
        }
    };
};
export const setLike = (id, type = SET_LIKE) => {
    return async(dispatch) => {
        dispatch(saveLike(id, SET_LIKE));
        if (type == SET_LIKE) {
            try {
                await axios.post("/userdata/liked/" + id);
            } catch (e) {
                console.log(e);
            }
        } else {
            dispatch(saveLike(id, DEL_LIKE));
            try {
                await axios.delete("/userdata/liked/" + id);
            } catch (e) {
                console.log(e);
            }
        }
    };
};
export const getUser = () => {
    return (dispatch) => {
        axios
            .get("/userdata")
            .then((res) => dispatch(saveUser(res.data)))
            .catch((err) => {
                console.log("[ERROR]", err);
            });
    };
};
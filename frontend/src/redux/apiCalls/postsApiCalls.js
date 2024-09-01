import { postActions } from "../slices/postSlice";

import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch Posts Based on Page Number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/post?pageNumber=${pageNumber}`);

      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Get Posts Count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      //axios is a light library that we can use it insted of featch
      const { data } = await request.get(`/api/post/count`);
      //the data is the payload for action
      dispatch(postActions.setPostsCount(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Fetch Posts Based on Category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/post?category=${category}`);
      dispatch(postActions.setPostsCate(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post(`/api/post`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearIsPostCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
      dispatch(postActions.clearLoading());
    }
  };
}
//Fetch Single Post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      //axios is a light library that we can use it insted of featch
      const { data } = await request.get(`/api/post/${postId}`);
      //the data is the payload for action
      dispatch(postActions.setPost(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Toggle like Post
export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/post/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      //the data is the payload for action
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Update Post Image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      //axios is a light library that we can use it insted of featch
      await request.put(`/api/post/update-image/${postId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-type": "multipart/form-data",
        },
      });
      toast.success("New Image Uploaded Successfully");
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Update Post
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    console.log(newPost);
    try {
      //axios is a light library that we can use it insted of featch
      const { data } = await request.put(`/api/post/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/post/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Get All Posts
export function getALLPosts() {
  return async (dispatch) => {
    try {
      //axios is a light library that we can use it insted of featch
      const { data } = await request.get(`/api/post`);
      //the data is the payload for action
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Fetch Posts by its owner
export function fetchPostsByOwner(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/post?userId=${userId}`);

      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };
}
//Get All Posts Admin

export function getALLPostsAdmin() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/post/admin`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      //the data is the payload for action
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Accept post

export function acceptPost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/post/accept/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.acceptPost(data));
      toast.success("The post accepted , it will be showen on the main page");
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error);
    }
  };
}

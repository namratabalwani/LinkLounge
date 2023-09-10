import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { SERVER_URL } from "../../constants.ts";

const PostsWidget = ({ isProfile = false }) => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data.post }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${SERVER_URL}/posts/${_id}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.post }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        post => (
          <PostWidget
            key={post._id}
            post={post}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
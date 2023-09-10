import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography, useTheme
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import { SERVER_URL } from "../../constants.ts";

const PostWidget = ({ post }) => {
    const dispatch = useDispatch();
    const [postUser, setPostUser] = useState(null);
    const [isComments, setIsComments] = useState(false);

    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const { _id, comments, description, likes, userId } = post;

    const getPostUser = async () => {
        const response = await fetch(`${SERVER_URL}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setPostUser(data.user);
    };

    useEffect(() => {
        getPostUser();
    }, []);

    const likeCount = Object.keys(likes).length;

    const { pallete } = useTheme();

    const main = pallete.neutral.main;
    const primary = pallete.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${SERVER_URL}/posts/${_id}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user._id })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

    if (!postUser) return null;

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={userId}
                name={postUser?.firstName}
                subtitle={""}
                userPicturePath={user?.picturePath}
            ></Friend>
            <Typography color={main} sx={{ mt: "1rem" }}> {description} </Typography>
            {post?.picturePath && (
                <img
                    width={"100%"}
                    height={"auto"}
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${SERVER_URL}/assets/${post?.picturePath}`}
                ></img>
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap={"1rem"}>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {likeCount > 0 ? (
                                <FavoriteOutlined sx={{ color: primary }}></FavoriteOutlined>
                            ) : (<FavoriteBorderOutlined></FavoriteBorderOutlined>)}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap={"0.3rem"}>
                        <IconButton onClick={() => {
                            setIsComments(!isComments)
                        }}>
                            <ChatBubbleOutlineOutlined>
                                <Typography>{comments.length}</Typography>
                            </ChatBubbleOutlineOutlined>
                        </IconButton>
                    </FlexBetween>

                </FlexBetween>

                <IconButton><ShareOutlined></ShareOutlined></IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt={"0.5rem"}>
                    {comments.map((comment, i) => (
                        <Box key={`${user?.firstName}-${i}`}>
                            <Divider></Divider>
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}> {comment}</Typography>
                        </Box>
                    ))}
                    <Divider></Divider>
                </Box>
            )}
        </WidgetWrapper>
    );
}

export default PostWidget;

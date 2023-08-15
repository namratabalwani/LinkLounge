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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostsWidget = ({ 
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    console.log("HEREEEE",
        postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
    );
    const [isComments , setIsComments ] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    // console.log("IN this page:" , likes);
    const isLiked = true;
    const likeCount = Object.keys(likes).length;

    const palette = useTheme();    
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async ()=> {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization : `Bearer ${token}`,
                "Content-Type" :"application/json"
            },
            body : JSON.stringify({userId : loggedInUserId})
        });
        const updatedPost = await response.json();
        dispatch(setPost({post : updatedPost}));
    }

    return (
        <WidgetWrapper m= "2rem 0">
            <Friend
                friendId = {postUserId}
                name = {name}
                subtitle = {""}
                userPicturePath = { userPicturePath}
            ></Friend>
            <Typography color={main} sx={{mt: "1rem"}}> {description} </Typography>
            {picturePath && (
                <img
                    width={"100%"}
                    height={"auto"}
                    alt="post"
                    style={{borderRadius: "0.75rem", marginTop: "0.75rem"}}
                    src={`http://localhost:3001/assests/${picturePath}`}
                ></img>
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap={"1rem"}>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{color: primary}}></FavoriteOutlined>
                            ):(<FavoriteBorderOutlined></FavoriteBorderOutlined>)}
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
                        <Box key={`${name}-${i}`}>
                            <Divider></Divider>
                            <Typography sx={{color:main, m: "0.5rem 0" , pl: "1rem"}}> {comment}</Typography>
                        </Box>
                    ))}
                    <Divider></Divider>
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostsWidget;

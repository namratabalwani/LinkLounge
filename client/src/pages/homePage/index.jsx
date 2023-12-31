import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostsWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return <Box>
        <Navbar></Navbar>
        <Box
            width={"100%"}
            padding={"2rem 6%"}
            display={isNonMobileScreens ? "flex" : "block"}
            gap={"0.5rem"}
            justifyContent={"space-between"}>
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget></UserWidget>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}>
                <MyPostWidget></MyPostWidget>
                <PostsWidget></PostsWidget>
            </Box>
            {isNonMobileScreens && (
                <Box flexBasis={"26%"}>
                </Box>
            )}
        </Box>
    </Box>;
}

export default HomePage;
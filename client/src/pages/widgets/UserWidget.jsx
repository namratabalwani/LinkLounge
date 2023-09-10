import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = () => {
    const { pallete } = useTheme();
    const navigate = useNavigate();

    const medium = pallete.neutral.medium;
    const main = pallete.neutral.main;

    const user = useSelector((state) => state.user);

    if (!user) {
        return null;
    }

    const {
        _id,
        firstName,
        lastName,
        viewedProfile,
        impressions,
        friends,
        picturePath,
        location,
        occupation
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1 rem"
                onClick={() => navigate(`/profile/${_id}`)}
            >
                <FlexBetween
                    gap={"1rem"}
                >
                    <UserImage image={picturePath}></UserImage>
                    <Box>
                        <Typography
                            variant="h4"
                            color={medium}

                            fontWeight={"500"}
                            sx={{
                                "&:hover": {
                                    color: pallete.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        > {firstName} {lastName}</Typography>
                        <Typography color={medium}>{friends} friends</Typography>
                    </Box>

                </FlexBetween>
                <ManageAccountsOutlined></ManageAccountsOutlined>
            </FlexBetween>
            <Divider></Divider>

            {/** Second Row */}
            <Box p="1rem 0">
                <Box display={"flex"} alignItems={"center"} gap={"1rem"} mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }}></LocationOnOutlined>
                    <Typography color={medium}> {location}</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"1rem"} >
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }}></WorkOutlineOutlined>
                    <Typography color={medium}> {occupation}</Typography>
                </Box>
            </Box>
            <Divider></Divider>
            {/**Third Row */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile?</Typography>
                    <Typography color={main} fontWeight={"500"}>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your posts</Typography>
                    <Typography color={main} fontWeight={"500"}>{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider></Divider>
            {/**Fourth Row */}
            <Box p="1rem 0">
                <Typography fontSize={"1rem"} color={main} fontWeight={"500"} mb="1rem">
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter"></img>
                        <Box>
                            <Typography color={main} fontWeight={"500"}>
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }}></EditOutlined>
                </FlexBetween>

                <FlexBetween gap="1rem" >
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="twitter"></img>
                        <Box>
                            <Typography color={main} fontWeight={"500"}>
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }}></EditOutlined>
                </FlexBetween>
            </Box>

        </WidgetWrapper>
    )
}

export default UserWidget;
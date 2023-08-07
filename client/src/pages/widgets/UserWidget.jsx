import {
    ManageAccountsOutlined,
    EditOutlined, 
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";

import {Box, Typography, Divider, useTheme} from "@mui/material";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath}) => {
    const [ user, setUser ] = useState(null);
    const {pallete} = useTheme();
    console.log("HIIIII");
    console.log("palllete ::",pallete);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = pallete.neutral.dark;
    const medium = pallete.neutral.medium;
    console.log(dark , medium);
    const main = pallete.neutral.main;

    console.log("userIS::",userId);
    const getUser = async () => {
        console.log("Token", token);
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers : {Authorization : `Bearer ${token}`},                
            }
        );
        const data = await response.json();
        console.log("DATA", data);
        setUser(data);
    };


    useEffect(() => {
        getUser();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }
    
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;
    const firstName1 = user.user.firstName;
const lastName2 = user.user.lastName;
    console.log("IDHAR");
    console.log(user.user.firstName, lastName2);
    console.log(user);
    return (
        <WidgetWrapper>
            {/* First row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1 rem"
                onClick={() => navigate(`/profile/${userId}`)}
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
                                        cursor:"pointer"
                                    }
                                }}
                            > {firstName1} {lastName2 }</Typography>
                            <Typography color={medium}>{friends} friends</Typography>
                        </Box>
                                         
                </FlexBetween>
                <ManageAccountsOutlined></ManageAccountsOutlined>   
                </FlexBetween>
                <Divider></Divider>

                {/** Second Row */}
                <Box p="1rem 0">
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"} mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{color: main}}></LocationOnOutlined>
                        <Typography color={medium}> {user.user.location}</Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"} >
                        <WorkOutlineOutlined fontSize="large" sx={{color: main}}></WorkOutlineOutlined>
                        <Typography color={medium}> {user.user.occupation}</Typography>
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
                    <EditOutlined sx={{color: main}}></EditOutlined>
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
                    <EditOutlined sx={{color: main}}></EditOutlined>
                </FlexBetween>
               </Box>
            
        </WidgetWrapper>
    )
}

export default UserWidget;
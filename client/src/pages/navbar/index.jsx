import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode, 
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";


const Navbar = () => {
    const [isMobileMenuToggled, setMobileMenuToggled ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.pallete.neutral.light;
    const dark = theme.pallete.neutral.dark;
    const background = theme.pallete.background.default;
    const primaryLight = theme.pallete.primary.light;
    const alt = theme.pallete.background.alt;

    const fullName = `${user.firstName } ${user.lastName}`;

    return <FlexBetween padding="1rem 6%" backgroundColor= {alt}>
        <FlexBetween gap ="1.75 rem">
            <Typography fontWeight="bold" 
            fontSize="clamp(1rem, 2rem, 2.25rem)" 
            color = "primary"
            onClick = {() => navigate("/home")}
            sx = {{
                "&hover" : {
                    color : primaryLight,
                    cursor : "pointer",
                },
            }
            }
            >Link Lounge</Typography>
            { isNonMobileScreens && (
                <FlexBetween backgroundColor= {neutralLight} 
                    borderRadius= "9px"
                    gap = "3rem"
                    padding = "0.1rem 1.5rem">
                        <InputBase placeholder="Search ..."></InputBase>
                        <IconButton>
                            <Search></Search>
                        </IconButton>
                </FlexBetween>
            )}

            {/*DESKTOP NAVBAR*/}
            { isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.pallete.mode === 'dark' ? 
                        (<DarkMode sx = {{fontSize :"25px"}}></DarkMode>
                        ):(<LightMode sx = {{ color: dark,  fontSize :"25px"}}></LightMode>)}
                    </IconButton>
                    <Message sx = {{fontSize :"25px"}}></Message>
                    <Notifications sx = {{fontSize :"25px"}}></Notifications>
                    <Help sx = {{fontSize :"25px"}}></Help>
                    <FormControl variant="standard" value = {fullName}>
                        <Select value={fullName}
                        sx ={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor : neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value= {fullName}>
                                <Typography value={fullName}></Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>

                        </Select>
                    </FormControl>
                </FlexBetween>) :
            (<IconButton onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu></Menu>
            </IconButton>)}

            {/**MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                    position="fixed"
                    right ="0"
                    bottom="0"
                    height="100%"
                    zIndex={"10"}
                    maxWidth={"500px"}
                    minWidth={"300px"}
                    backgroundColor={background}
                >
                     {/*CLOSE ICON*/}
                     <Box display={"flex"} justifyContent={"flex-end"} p="1rem">
                        <IconButton onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close></Close>
                        </IconButton>
                     </Box>

                     {/**MENU ITEMS */}
                     <FlexBetween display={"flex"} flexDirection={"column"} justifyContent={"center"} alignContent={"center"} gap="3rem">
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.pallete.mode === 'dark' ? 
                                (<DarkMode sx = {{fontSize :"25px"}}></DarkMode>
                                ):(<LightMode sx = {{ color: dark,  fontSize :"25px"}}></LightMode>)}
                            </IconButton>
                            <Message sx = {{fontSize :"25px"}}></Message>
                            <Notifications sx = {{fontSize :"25px"}}></Notifications>
                            <Help sx = {{fontSize :"25px"}}></Help>
                            <FormControl variant="standard" value = {fullName}>
                                <Select value={fullName}
                                sx ={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor : neutralLight
                                    }
                                }}
                                input={<InputBase/>}
                                >
                                    <MenuItem value= {fullName}>
                                        <Typography value={fullName}></Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>

                                </Select>
                            </FormControl>
                        </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    </FlexBetween>
        
    };
    

export default Navbar;
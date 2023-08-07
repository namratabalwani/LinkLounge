import {
    Box,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";

import Form from "./Form";
 
const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width = 1000px)");

    return <Box>
        <Box width="100%" backgroundColor={theme.pallete.background.alt} p="1rem 6%" textAlign={"center"}>
            <Typography fontWeight="bold" 
                fontSize="32px" 
                color = "primary">Link Lounge</Typography>
        </Box>
        <Box
            width={isNonMobileScreens ? "50%": "93%"}
            p = "2rem"
            m = "2rem auto"
            borderRadius={"1rem"}
            backgroundColor={theme.pallete.background.alt}
        >
            <Typography
                fontWeight={"500"} variant="h5" sx={{mb : "1.5rem"}}
            >
                Welcome to Link Lounge, the Social Media for Sociopaths!
            </Typography>
            <Form></Form>
        </Box>
    </Box>
    
    // return <div>Login Page</div>;
}

export default LoginPage;
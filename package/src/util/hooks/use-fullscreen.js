import {useMediaQuery, useTheme} from "@material-ui/core";

export const useFullscreen = (size) => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(size));
};

export default useFullscreen;

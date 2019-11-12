import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    type: "dark",
    primary: {
        light: '#ff9800',
        main: '#f57c00',
        dark: '#e65100',
        contrastText: '#fffff'
    },
    secondary: {
        light: '#42a5f5',
        main: '#1e88e5',
        dark: '#0d47a1',
        contrastText: '#fffff'
    }
};
const themeName = 'CommentSense';

export default createMuiTheme({ palette, themeName });

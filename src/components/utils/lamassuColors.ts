export const getColor = (theme: any, color: string | [string, string]) => {
    switch (color) {
    case "green":
        return [theme.palette.success.main, theme.palette.success.light];

    case "orange":
        return [theme.palette.warning.main, theme.palette.warning.light];

    case "red":
        return [theme.palette.error.main, theme.palette.error.light];

    case "blue":
        return [theme.palette.blue.main, theme.palette.blue.light];

    case "gray":
        return [theme.palette.text.main, theme.palette.background.lightContrast];

    default:
        if (color !== undefined) {
            return color;
        }
        return [theme.palette.text.main, theme.palette.background.lightContrast];
    }
};

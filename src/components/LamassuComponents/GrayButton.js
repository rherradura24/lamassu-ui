import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GrayButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.gray.light),
    backgroundColor: theme.palette.gray.light,
    '&:hover': {
      backgroundColor: theme.palette.gray.main,
    },
}));

  
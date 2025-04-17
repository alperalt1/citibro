import { Box, Button, CircularProgress } from "@mui/material";

type Props = {
    onClick: () => void;
    isLoading: boolean;
    text?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    isDisabled?: boolean;
  }
  
  export const LoadingButton = (props: Props) => {
    const {
      onClick,
      isLoading,
      width,
      height,
      text = "Aceptar",
      isDisabled = false,
    } = props;
  
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    }
  
    return (
      <Button
        onClick={() => handleClick()}
        variant="contained"
        color="primary"
        disabled={isDisabled ? isDisabled : isLoading}
        sx={{
          width: width ?? 'auto',
          height: height ?? 'auto'
        }}
      >
        {isLoading
          ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100% !important' }}
            >
              <CircularProgress size={20} sx={{ color: 'white !important' }} />
            </Box>
          )
          : text
        }
      </Button>
    );
  }
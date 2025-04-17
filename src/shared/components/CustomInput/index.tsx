import { Box, IconButton, TextField, TextFieldVariants, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import theme from "../../../assets/theme/MyTheme";

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onPressedIcon?: () => void;
  variant?: TextFieldVariants,
  type?: string,
  value?: string,
  label: string,
  id?: string,
  name?: string,
  isDisabled?: boolean,
  autoComplete?: string,
  accept?: string,
  multiline?: boolean,
  rows?: number,
  icon?: React.ReactNode,
  size?: 'large' | 'small',
  showIcon?: boolean,
  touched?: boolean,
  errorMessage?: string,
  height?: string,
  shrink?: boolean,
  required?: boolean,
  placeholder?: string,
}

export const CustomInput: React.FC<Props> = (props: Props) => {

  const {
    onChange,
    onBlur,
    onPressedIcon,
    variant = 'outlined',
    type = "text",
    value = "",
    label,
    id,
    name,
    isDisabled = false,
    autoComplete,
    accept = "",
    multiline = false,
    rows = 4,
    icon,
    showIcon = false,
    touched,
    errorMessage,
    height = "38px",
    shrink,
    required = false,
    placeholder = "",
  } = props;

  const [isVisibility, setIsVisibility] = useState<boolean>(type === "password");
  const [controlType, setcontrolType] = useState<string>(type);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event);
    }
  }

  const handleTypeChange = () => {
    setIsVisibility(!isVisibility);

    if (controlType == 'password') {
      setcontrolType('text');
    } else {
      setcontrolType(type);
    }
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(event);
    }
  }

  const handlePressedIcon = () => {
    if (onPressedIcon) {
      onPressedIcon();
    }
  }

  return (
    <Box>
      <TextField
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        variant={variant}
        type={controlType === 'number' ? 'text' : controlType}
        value={value}
        id={id}
        name={name}
        label={label}
        disabled={isDisabled}
        multiline={multiline}
        rows={rows}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        sx={{ 
          width: '100%',
            '& .MuiOutlinedInput-root': {
              height: height,
              padding: 0,
            },
            '& .MuiOutlinedInput-input': {
              height: `calc(${height} - 90%)`,
            },
            '& input::placeholder': {
              fontSize: "14px"
            }
        }}
        slotProps={{
          input: {
            inputProps: {
              accept: accept,
            },
            endAdornment: type == "password" && showIcon
              ? <IconButton
                sx={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)' }}
                onClick={handleTypeChange}
              >
                {isVisibility ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </IconButton>
              : icon && showIcon
                ? (
                  <IconButton
                    sx={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)' }}
                    onClick={handlePressedIcon}
                  >
                    {icon}
                  </IconButton>
                )
                : null
          },
          inputLabel: {
            sx: {
              top: variant === 'outlined'
                ? '-9px' 
                : variant === "filled"
                  ? '1px'
                  : '-2px',
              '&.MuiInputLabel-shrink': {
                top: '-1px', // Ajusta la posición cuando el label está flotante
              },
            },
            shrink: shrink,
          }
        }}
      />
      {touched && errorMessage 
        ? <Typography fontSize={12} color={theme.palette.error.main}>
            {errorMessage}
          </Typography>
        : null
      }
    </Box>
  );
}
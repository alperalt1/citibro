import { Autocomplete, Box, TextField, TextFieldVariants, Typography } from '@mui/material';
import theme from "../../../assets/theme/MyTheme";

export interface OptionType {
  value: string;
  label: string;
  [key: string]: any;
}

interface Props<T> {
  onChange?: (option: T | null) => void,
  onInputChange?: (value: string) => void,
  onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void,
  variant?: TextFieldVariants,
  options: T[];
  value?: T,
  disablePortal?: boolean,
  isDisabled?: boolean,
  label?: string,
  touched?: boolean,
  errorMessage?: string,
  id?: string,
  name?: string,
  height?: string,
  shrink?: boolean,
  placeholder?: string,
}

export const CustomSelect: React.FC<Props<OptionType>> = (props: Props<OptionType>) => {

  const {
    onChange,
    onBlur,
    variant = 'outlined',
    options,
    value,
    disablePortal = true,
    isDisabled = false,
    label = "Seleccione una opción",
    placeholder = "",
    touched,
    errorMessage,
    id,
    name,
    height = '38px',
    shrink,
  } = props;

  return (
    <Box>
      <Autocomplete
        // (event, newValue, reason, details)
        onChange={(_, newValue, __, ___) => {
          if (onChange) onChange(newValue);
        }}
        onBlur={onBlur}
        options={options}
        value={value || null}
        disablePortal={disablePortal}
        disabled={isDisabled}

        renderInput={(params) =>
          <TextField
            {...params}
            variant={variant}
            label={label}
            placeholder={placeholder}
            autoComplete="new-password"
            id={id}
            name={name}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                height: height,
                paddingLeft: '10px',
              },
              '& .MuiOutlinedInput-input': {
                height: `calc(${height} - 90%)`,
              },
              '& input::placeholder': {
                fontSize: "14px"
              }
            }}
            slotProps={{
              inputLabel: {
                shrink: shrink,
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
              }
            }}
          />
        }
      />
      {touched && errorMessage ? (
        <Typography fontSize={12} color={theme.palette.error.main}>
          {errorMessage}
        </Typography>
      ) : null}
    </Box>
  );
}

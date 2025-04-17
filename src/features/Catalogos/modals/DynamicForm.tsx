import { ChangeEvent } from "react";
import { IBaseRepository } from "../Interfaces/IBaseRepository";
import { DynamicDataForm, FormDynamicSchema } from "../Model/DynamicDataForm";
import { Box, Card, Checkbox, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CustomInput } from "../../../shared/components/CustomInput";
import { CustomSelect, OptionType } from "../../../shared/components/CustomSelect";

interface funcionalPropsDynamic<T, U> {
    repositoryInterface: IBaseRepository<T, U>;
    dataRenderValue: FormDynamicSchema<T, U>;
    formData: DynamicDataForm;
    errors: DynamicDataForm;
    handleChange: (name: string, value: string) => void;
    handleChangeBool: (name: string, value: boolean) => void;
    handleChangeSelectDynamic: (name: string, value: string) => void;
    selectedList: Record<string, OptionType[]>;
}

export const DynamicForm = <T, U>({
    dataRenderValue,
    formData,
    errors,
    selectedList,
    handleChange,
    handleChangeBool,
    handleChangeSelectDynamic
}: funcionalPropsDynamic<T, U>) => {


    return (
        <Box mt={2} >
            <Grid container spacing={2}>
                {
                    dataRenderValue.fields
                        .filter((field) => field.isVisibleInput)
                        .map((field) => (
                            <Grid size={{ xs: 12, md: 6 }}>
                                {(field.type === "text" || field.type === "number") && (
                                    <CustomInput
                                        id={field.name}
                                        onBlur={(e) => (e)}
                                        label={field.label}
                                        type={field.type}
                                        required={field.validations?.required}
                                        value={(formData[field.name] ?? "").toString()}
                                        isDisabled={field.inputType === "readonly"}
                                        errorMessage={(errors[field.name] ?? "").toString()}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        shrink={true}
                                    />
                                )}
                                {(field.type === "date") && (
                                    <CustomInput
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        onBlur={(e) => (e)}
                                        value={(formData[field.name] ?? "").toString()}
                                        type="date"
                                        id={field.name}
                                        name={field.name}
                                        label={field.label}
                                        errorMessage={(errors[field.name] ?? "").toString()}
                                        shrink={true}
                                    />
                                )}
                                {(field.type === "datetime") && (
                                    <CustomInput
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        onBlur={(e) => (e)}
                                        value={(formData[field.name] ?? "").toString()}
                                        type="datetime-local"
                                        id={field.name}
                                        name={field.name}
                                        label={field.label}
                                        errorMessage={(errors[field.name] ?? "").toString()}
                                        shrink={true}
                                    />
                                )}
                                {(field.type === "boolean") && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formData[field.name] ?? "0")}
                                                id={field.name}
                                                name={field.name}
                                                onChange={(e) => handleChangeBool(field.name, e.target.checked)}
                                            />
                                        }
                                        label={field.label}
                                    />
                                )}
                                {(field.type === "select") && (
                                    <CustomSelect
                                        onChange={(e) => handleChangeSelectDynamic(field.name, e?.value ?? "")}
                                        onBlur={(e) => (e)}
                                        options={selectedList[field.name] || []}
                                        value={
                                            selectedList[field.name].find(
                                                (option) => option.value === formData[field.name]
                                            )
                                        }
                                        id={field.name}
                                        name={field.name}
                                        label={field.label}
                                        errorMessage={(errors[field.name] ?? "").toString()}
                                    />
                                )}
                            </Grid>
                        ))
                }
            </Grid>
        </Box>
    );
}
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useLocation} from "react-router-dom";
import "./form.styles.css";

interface FormProps {
    fields: Array<{}>;
    titleSubmit: string;
    submit: (data: any) => void;
    stateField?: any;
}

export default function Form({fields, titleSubmit, submit, stateField}: FormProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { pathname } = useLocation();

    useEffect(() => {
        if (stateField) {
            const stateEntry = Object.entries(stateField);
            stateEntry.forEach((entry) => {
                const [key, value] = entry;
                setValue(key, value);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(submit)}>
            {
                fields.map((field: any) => {
                    if (field.type === "text" || field.type === "password" || field.type == "date") {
                        return (
                            <input
                                key={field.name} 
                                type={field.type}
                                placeholder={field.placeholder}
                                {...register(`${field.name}`, {required: true})} 
                            />
                        )
                    } else if (field.type === "select") {
                        return (
                            <>
                                <label htmlFor={field.name}>{field.placeholder}</label>
                                <select {...register(`${field.name}`)} id={field.name}>
                                    <option value="">Selecionar...</option>
                                    {
                                        field.options.map((option: any) => (
                                            <option value={option.id}>{option.name}</option>
                                        ))
                                    }
                                </select>
                            </>
                        );
                    }
                    {errors.field.name && <span>This field is required</span>}
                })

            }
            <button type="submit">{titleSubmit}</button>
            {
                pathname !== "/" &&
                <button type="reset">Limpar</button>
            }
        </form>
    );
}
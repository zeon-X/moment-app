import { loginUser } from "@/services/api/auth.service";
import { LoginFormData, LoginFormErrors } from "@/types/auth";
import { saveToSecureStore } from "@/utils/useSecureStorage";
import { validateLoginForm } from "@/utils/validation/auth-validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard } from "react-native";

export const useLogin = () => {


    const router = useRouter();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        identifier: "",
        password: "",
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const handleChange = (field: keyof LoginFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const loginFormValidate = () => {
        const newErrors = validateLoginForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        Keyboard.dismiss();
        if (!loginFormValidate()) return;
        // Login logic here
        setIsLoggingIn(true);
        const data = await loginUser(formData)
        setIsLoggingIn(false);

        if (data.success) {




            saveToSecureStore("token", data?.token);
            saveToSecureStore("user", JSON.stringify(data?.data));

        }
        else {
            setErrors((prev) => ({
                ...prev,
                message: data.message,
            }));
        }

    };


    return { router, formData, errors, handleChange, isLoggingIn, handleLogin }
}
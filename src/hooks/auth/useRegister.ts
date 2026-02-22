import {
    checkUsernameAvailability,
    signUpUser,
} from "@/services/api/auth.service";
import type { RegisterFormData, RegisterFormErrors } from "@/types/auth";
import { validateRegisterForm } from "@/utils/validation/auth-validation";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useRegister = () => {
    const router = useRouter();
    const [isUsernameChecking, setIsUsernameChecking] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<
        boolean | null
    >(null);
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        age: "",
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});

    const handleChange = (field: keyof RegisterFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: field === "username" ? value.trim() : value,
        }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const registerFormValidate = () => {
        const newErrors = validateRegisterForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!formData.username.trim()) {
                setIsUsernameAvailable((prev) => null);
                // setErrors((prev) => ({ ...prev, username: "Username is required" }));
                return;
            } else if (formData.username.trim().length < 3) {
                setIsUsernameAvailable((prev) => null);
                setErrors((prev) => ({
                    ...prev,
                    username: "Username must be at least 3 characters",
                }));
                return;
            }
            setIsUsernameChecking(true);
            const data = await checkUsernameAvailability(formData.username.trim());
            setIsUsernameChecking(false);

            if (data.success) {
                setErrors((prev) => ({
                    ...prev,
                    username: data.available
                        ? undefined
                        : "Username is not available. Please try another.",
                }));
                setIsUsernameAvailable((prev) => data.available || null);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [formData.username]);

    const handleRegister = async () => {
        Keyboard.dismiss();
        if (!registerFormValidate()) return;
        const data = await signUpUser(formData);
        console.log(data);

    };

    return {
        router,
        formData,
        isUsernameAvailable,
        isUsernameChecking,
        errors,
        handleChange,

        handleRegister,
    };
};

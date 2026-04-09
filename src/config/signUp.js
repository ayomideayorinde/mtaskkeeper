import { useState } from "react";

export function SignUpConfig() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return {
        fName, setFName, lName, setLName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword
    }
}
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../context/authContext";

const Register = () => {
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

      const { student_register } = useContext(AuthContext);
    const navigate = useNavigate();

    // const validateUname = (uname) => /^(?=.*[0-9]).{8,}$/.test(password);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[0-9]).{8,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // if (!validateUname(uname)) {
        //     setError("Please enter a valid UserName.");
        //     setLoading(false);
        //     return;
        // }


        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and include a number.");
            setLoading(false);
            return;
        }
        

        try {
            await student_register({uname, email, password });
            setSuccessMessage("Register successful!");
            navigate("/");
        } catch (err) {
            setError(err || "An error occurred during register.");
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Student Register</Typography>
                <Box component="form" onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="UserName"
                        margin="normal"
                        type="text"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        // error={Boolean(error && !validateUname(email))}
                        // helperText={error && !validateUname(email) ? error : ""}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(error && !validateEmail(email))}
                        helperText={error && !validateEmail(email) ? error : ""}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(error && !validatePassword(password))}
                        helperText={error && !validatePassword(password) ? error : ""}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Register"}
                    </Button>
                    {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;

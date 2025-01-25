import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    useTheme,
} from "@mui/material";
import { useApp } from "../AppProvider";
import { fetchWithAuth } from "../utils/api";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useApp();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetchWithAuth("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const { user, token } = response;
            login(user, token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{ mb: 2 }}>
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </form>

                <Typography align="center">
                    Don&amp;t have an account?{" "}
                    <Link
                        to="/register"
                        style={{ 
                            textDecoration: "none", 
                            color: theme.palette.primary.main 
                        }}>
                        Register
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

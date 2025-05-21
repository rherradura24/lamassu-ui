import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "auths/oidcConfig";
import { useLoading } from "components/Spinner/LoadingContext";
import { Landing } from "components/Landing/Landing";

const AuthCallback = () => {
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        userManager.signinRedirectCallback()
            .then(() => {
                navigate("/", { replace: true });
            })
            .catch(err => {
                console.error("Login callback error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return <Landing />;
};

export default AuthCallback;

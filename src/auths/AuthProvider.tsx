import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "oidc-client-ts";
import { cognitoData, isAuthEnabled, isCognitoAuth, userManager } from "./oidcConfig";
import { useLoading } from "components/Spinner/LoadingContext";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginout: boolean;
  signinRedirect: () => void;
  signoutRedirect: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoginout, setIsLoginout] = useState<boolean>(false);
    const { setLoading } = useLoading();

    useEffect(() => {
        if (!isAuthEnabled || isLoginout) {
            setIsLoading(false);
            return;
        }

        setLoading(true);

        userManager.getUser().then(user => {
            if (user && !user.expired) {
                setUser(user);
            }
        }).finally(() => {
            setIsLoading(false);
            setLoading(false);
        });

        userManager.events.addUserLoaded(u => {
            setUser(u);
            setIsLoading(false);
            setLoading(false);
        });

        userManager.events.addUserUnloaded(() => {
            setUser(null);
        });
    }, [isLoginout, setLoading]);

    const isAuthenticated = !isAuthEnabled || !!user;

    const signinRedirect = async () => {
        if (isAuthEnabled) {
            setLoading(true);
            await userManager.signinRedirect();
        }
    };

    const signoutRedirect = async () => {
        if (isAuthEnabled) {
            setLoading(true);
            setIsLoginout(true);

            await userManager.removeUser();

            if (isCognitoAuth) {
                signoutCognitoRedirect();
            } else {
                await userManager.signoutRedirect();
            }
        }
    };

    const signoutCognitoRedirect = () => {
        // Redirect to Cognito’s logout endpoint
        const clientId = cognitoData.clientId;
        const logoutUri = window.location.origin + "/";
        const cognitoDomain = cognitoData.domain;

        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                isLoginout,
                signinRedirect,
                signoutRedirect
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

import React from "react";
import { LoaderWrapper } from "./LoaderWrapper";

const createLoader = WrappedComponent => ({
    onMount,
    onUnmount,
    shouldReload = () => false,
    ...other
}) => {
    if (!WrappedComponent) {
        return <div />;
    }

    return (
        <LoaderWrapper
            onMount={onMount}
            onUnmount={onUnmount}
            shouldReload={shouldReload}
        >
            <WrappedComponent {...other} />
        </LoaderWrapper>
    );
};

export { createLoader };

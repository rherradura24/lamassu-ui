import ContentLoader from 'react-content-loader'

export const SideBarPlaceholder = (props) => {
    return (
        <ContentLoader
            height={54}
            width={320}
            viewBox="0 0 320 54"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{border: "none"}}
            {...props}
        >
            <circle cx="27" cy="27" r="18" />
            <rect x="53" y="14" rx="3" ry="3" width="180" height="13" />
            <rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
            <rect x="67" y="30" rx="3" ry="3" width="74" height="10" />
            <circle cx="305" cy="27" r="8" />
        </ContentLoader>
    )
}

export const MainContentPlaceholder = (props) => {
    return (
        <ContentLoader viewBox="0 0 400 160" height={160} width={400} {...props}>
            <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
            <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
            <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
            <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
            <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
            <rect x="0" y="99" rx="5" ry="5" width="400" height="200" />
        </ContentLoader>
    )
}

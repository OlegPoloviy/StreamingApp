import {useSelector} from "react-redux";

export function MainPage() {
    const user = useSelector(store => store)

    return(
        <>
            {
                user.user && (
                    <h2>Welcome, {user.user.login}</h2>
                )
            }
        </>
    )
}
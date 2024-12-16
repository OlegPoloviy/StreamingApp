import {useSelector} from "react-redux";
import "../../Styles/userAccount.scss"

export function MainPage() {
    const user = useSelector(store => store)

    return(
        <>
            {
                user.user && (
                    <div className={'profile'}>
                        <div className={'profile_container'}>
                            <img src={user.user.image} alt=""/>
                            <h2>{user.user.login}</h2>
                            <p>{user.user.email}</p>
                        </div>

                    </div>

                )
            }
        </>
    )
}
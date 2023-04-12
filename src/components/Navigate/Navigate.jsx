export const Navigate = ({onRouteChange, isSignedIn}) => {
    return (
        <div>
            {
                isSignedIn ?
                    <nav>
                        <a onClick={() => onRouteChange('signout')}>Sign Out</a>
                    </nav>
                    :
                    <nav>
                        <a onClick={() => onRouteChange('signin')}>Sign In</a>
                        <a onClick={() => onRouteChange('register')}>Register</a>
                    </nav>
            }
        </div>
    )
}
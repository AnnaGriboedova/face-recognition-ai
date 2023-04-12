export const SignIn = ({onRouteChange})=>{
    return(
        <div>
            <h1>Sign In</h1>
            <form>
                <fieldset>
                    <div>
                        <label for={'email-address'}>Email</label>
                        <input type={'email'} id={'email-address'}/>
                    </div>
                    <div>
                        <label for={'password'}>Email</label>
                        <input type={'password'} id={'password'}/>
                    </div>
                    <div>
                        <input value={'Sign In'} onClick={()=>onRouteChange('home')} type={"submit"}/>
                    </div>
                    <div>
                        <a href={'#'}>Register</a>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
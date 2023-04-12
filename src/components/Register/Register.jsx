export const Register = ({onRouteChange})=>{
    return (
        <div>
            <h1>Register</h1>
            <form>
                <fieldset>
                    <div>
                        <label htmlFor={'user-name'}>Name</label>
                        <input type={'text'} id={'user-name'}/>
                    </div>
                    <div>
                        <label htmlFor={'email-address'}>Email</label>
                        <input type={'email'} id={'email-address'}/>
                    </div>
                    <div>
                        <label htmlFor={'password'}>Email</label>
                        <input type={'password'} id={'password'}/>
                    </div>
                    <div>
                        <input value={'Register'} onClick={() => onRouteChange('home')} type={"submit"}/>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
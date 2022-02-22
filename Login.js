import React,{useState} from 'react'
import { validEmail, validPassword } from './RegularExpresion';
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import axios from 'axios'


export default function Login(){
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    );
    const [formValues, setFormValues] = useState({
        Email: "",
        password: "",
        
    });
    
    const [formValuesErrors, setFormValuesErrors] = useState({
        EmailErr: null,
        passwordErr: null,
    });
    
    const handleFormChange = (event) => {
        switch (event.target.name) {
            case "Email":
            setFormValues({
            ...formValues,
            Email: event.target.value,
            });
            setFormValuesErrors({
            ...formValuesErrors,
            EmailErr:
                event.target.value.length === 0
                ? "This field is required"
                : validEmail.test( event.target.value)===false ? " Email must be as xxx@xxx.xxx"
                :null,
            });
            break;
    
            case "password":
            setFormValues({
            ...formValues,
            password: event.target.value,
            });
            setFormValuesErrors({
                ...formValuesErrors,
                passwordErr:
                event.target.value.length===0
                ?"This field is required"
                :validPassword.test(event.target.value)===false 
                ? "password must be as P@ssword123"
                :null,
            });
            break;
            default:
            break;
        }
    };
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (
            !formValuesErrors.EmailErr &&
            !formValuesErrors.passwordErr 
        ) {
            axios.post('http://localhost:3000/users',({}))
            .then(res => {
            console.log(res);
            console.log(res.data);
        })
        }
    };
    const handleFailure = (result)=>{
        alert(result);
    }
    const handleLogin = async(googleData)=>{
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
            token: googleData.tokenId,
            }),
            headers: {
            'Content-Type': 'application/json',
            },});
            const data = await res.json();
            setLoginData(data);
            localStorage.setItem('loginData', JSON.stringify(data));
    };
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };

    return(
        <>
        <form className="vh-100" onSubmit={(e) =>  handleSubmitForm(e)} style={{background: "linear-gradient(#2E86C1 ,#138D75  ,#A3E4D7 )"}}>
    <div className="container py-4 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" >
            <div className="card-body p-5 text-center" style={{borderRadius:"1rem"}}>

            <h3 className="mb-5">Login To Your Account</h3>

            <div className="form-outline mb-4">
                <input 
                type="email" 
                id="typeEmailX-2" 
                className="form-control form-control-lg"
                value={formValues.Email}
                onChange={(e) => handleFormChange(e)}  
                placeholder="Email"
                name="Email"
                />
                {formValuesErrors.EmailErr && (
                <div id="EmailHelp" className="form-text text-danger">
                {formValuesErrors.EmailErr}
                </div>
            )}
            </div>
            <div className="form-outline mb-4">
                <input 
                type="password"
                id="typePasswordX-2" 
                className="form-control form-control-lg"
                value={formValues.position}
                onChange={(e) => handleFormChange(e)} 
                placeholder="Password" 
                name="password"
                />
                {formValuesErrors.passwordErr && (
                    <div id="passwordHelp" className="form-text text-danger">
                    {formValuesErrors.passwordErr}
                    </div>
                )}
            </div>

            <button 
            id="login"
            style={{width: "100%"}} 
            className="btn btn-primary btn-lg btn-block" 
            disabled={
                formValuesErrors.EmailErr ||
                formValuesErrors.passwordErr 
            }
            type="submit">Login</button>

                <hr className="my-4"/>
                {
                    loginData?(
                    <div>
                        <h3>You logged in as {loginData.email}</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
            ):(
                <GoogleLogin
            clientId='678175724274-mfoptnppuqqf84525pqv0gk173jdl4e8.apps.googleusercontent.com'
            render={renderProps => (
                <GoogleButton style={{width: '100%', backgroundColor: '#E74C3C  ',boxShadow: '0 0 0 0.5'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
            )}
            className="btn btn-lg btn-primary"
            id="btn"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
            >
            </GoogleLogin>
            )
                }
            
            </div>
        </div>
        </div>
    </div>
    </div>
</form>
        </>
    )
}

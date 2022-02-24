import React,{useState} from 'react'
import { validEmail, validPassword } from './RegularExpresion';
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import axios from 'axios'

export default function Registration () {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    );
    const [formValues, setFormValues] = useState({
        
        FirstName: "",
        LastName: "",
        Email: "",
        UserName: "",
        password: "",
        confirmPassword: ""

    });

    const [formValuesErrors, setFormValuesErrors] = useState({
        FirstNameErr: null,
        LastNameErr: null,
        EmailErr: null,
        UserNameErr: null,
        passwordErr: null,
        confirmPasswordErr: null

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
                            : validEmail.test(event.target.value) === false ? " Email must be as xxx@xxx.xxx"
                                : null,
                });
                break;
            case "UserName":
                setFormValues({
                    ...formValues,
                    UserName: event.target.value,
                });
                setFormValuesErrors({
                    ...formValuesErrors,
                    UserNameErr:
                        event.target.value.length === 0
                            ? "This field is required"
                            : null,
                });
                break;
                case "FirstName":
                    setFormValues({
                        ...formValues,
                        FirstName: event.target.value,
                    });
                    setFormValuesErrors({
                        ...formValuesErrors,
                        FirstNameErr:
                        event.target.value.length === 0 ?
                        "This field is required"
                        :event.target.value.length < 3 ?
                        "First name must be at least 3 characters"
                        : null,
                    });
                    break;
                    case "LastName":
                    setFormValues({
                        ...formValues,
                        LastName: event.target.value,
                    });
                    setFormValuesErrors({
                        ...formValuesErrors,
                        LastNameErr:
                        event.target.value.length === 0 ?
                        "This field is required"
                        :event.target.value.length < 3 ?
                        "Last name must be at least 3 characters"
                        : null,
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
                    event.target.value.length === 0
                        ? "This field is required"
                        : validPassword.test(event.target.value) === false
                        ? "Password must be as P@ssword123"
                        : null,
                });
                break;
            case "confirmPassword":
                setFormValues({
                    ...formValues,
                    confirmPassword: event.target.value,
                });
                setFormValuesErrors({
                    ...formValuesErrors,
                    confirmPasswordErr:
                        event.target.value.length === 0
                        ? "This field is required"
                        : event.target.value !== formValues.password
                        ? "It must match passsword"
                        : null,
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
    return (
        <>
    <form onSubmit={(e) => handleSubmitForm(e)} className="vh-150 " style={{background: "linear-gradient(#2E86C1 ,#138D75  ,#A3E4D7)"}} >
    <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: "15px"}} >
            <div className="card-body p-5 text-center">
                <h3 className=" text-center mb-5">Create Your Free Account</h3>

                <div className="row">
                <div class="col-md-6 mb-4">
                <div class="form-outline">
                    <input
                    placeholder="First Name"
                    type="text" 
                    id="firstNameInput" 
                    className="form-control form-control-lg" 
                    value={formValues.FirstName}
                    onChange={(e) => handleFormChange(e)}
                    name="FirstName"
                    />
                    {
                        formValuesErrors.FirstNameErr&&(
                            <div id="FirstNameHelp" className="form-text text-danger border-danger">
                                {formValuesErrors.FirstNameErr}
                            </div>
                        )}
                </div>
                </div>

                <div className="col-md-6 mb-4">
                <div className="form-outline">
                    <input 
                    placeholder="Last Name"
                    type="text" 
                    id="lastNameInput" 
                    className="form-control form-control-lg"
                    value={formValues.LastName}
                    onChange={(e) => handleFormChange(e)}
                    name="LastName"
                    />
                    {formValuesErrors.LastNameErr&&(
                        <div id="LastNameHelp" className="form-text text-danger">
                            {formValuesErrors.LastNameErr}
                        </div>
                    )}
                </div>
                </div>
                </div>

                <div className="form-outline mb-4">
                <input
                    type="text"
                    placeholder="User Name"
                    className="form-control form-control-lg"
                    id="UserNameInput"
                    aria-describedby="UserNameHelp"
                    value={formValues.UserName}
                    onChange={(e) => handleFormChange(e)}
                    name="UserName"
                />

                {formValuesErrors.UserNameErr && (
                    <div id="UserNameHelp" className="form-text text-danger ">
                        {formValuesErrors.UserNameErr}
                    </div>
                )}
                </div>

                <div className="form-outline mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control form-control-lg"
                    id="EmailInput"
                    aria-describedby="EmailHelp"
                    value={formValues.Email}
                    onChange={(e) => handleFormChange(e)}
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
                    placeholder='Password'
                    className="form-control form-control-lg"
                    id="passwordInput"
                    aria-describedby="passwordHelp"
                    value={formValues.password}
                    onChange={(e) => handleFormChange(e)}
                    name="password"
                />
                
                {formValuesErrors.passwordErr && (
                    <div id="passwordHelp" className="form-text text-danger">
                        {formValuesErrors.passwordErr}
                    </div>
                )}
                </div>

                <div className="form-outline mb-4">
                <input
                    type="password"
                    placeholder='Repeat Password'
                    className="form-control form-control-lg"
                    id="confirmPasswordInput"
                    aria-describedby="confirmPasswordHelp"
                    value={formValues.confirmPassword}
                    onChange={(e) => handleFormChange(e)}
                    name="confirmPassword"
                />
                {formValuesErrors.confirmPasswordErr && (
                    <div id="confirmPasswordHelp" className="form-text text-danger">
                        {formValuesErrors.confirmPasswordErr}
                    </div>
                )}
                </div>

                <div className="d-flex justify-content-center">
                    <button 
                    id="register"
                    style={{width: "100%"}} 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-block"
                    disabled={
                        formValuesErrors.EmailErr ||
                        formValuesErrors.passwordErr 
                    }
                    >Register</button>
                </div>
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
                <GoogleButton style={{width: '100%', backgroundColor: '#dd4b39',boxShadow: '0 0 0 0.5'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
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

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href='./Login.js' className="fw-bold text-body"><u>Login here</u></a></p>

            </div>
            </div>
        </div>
        </div>
    </div>
</form>
        </>
    )
}

import {useContext, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const {token} = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfG4xyt6f5Am972fl5TLKuyzQxKojnZtA';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('parola degistirelemedi hata');
          return res.json().then((data) => {
            let errorMessage = 'Password Changing failed';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPasswordInputRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
// https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfG4xyt6f5Am972fl5TLKuyzQxKojnZtA

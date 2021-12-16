import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';
import {Avatar, Container, Paper, Typography, Grid, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import GoogleLogin from 'react-google-login';

const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      if(isSignUp){
        dispatch(signup(formData, history));
        
      } else {
        dispatch(signin(formData, history));
      }
      console.log(formData);
    };

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleShowPassword = () => {
      console.log('I got here')
      setShowPassword((showPassword) => !showPassword);
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };
    
    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
        console.log('Google login successful');
        dispatch({ type: 'AUTH', data: { token, result }});
        history.push('/posts');
      } catch (err) {
        console.log(err);
      }
      console.log(res);
    }
    const googleFailure = (err) =>{
      console.log(err);
      console.log('Google sign in not successful');
    }

  return (
    <Container className={classes.main} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
          <Typography variant="h5"> {isSignUp ? 'Sign Up': 'Sign In'} </Typography>

          <form className={classes.form} onSubmit={handleSubmit}> 
          {/*THE FORM IS FOR BOTH SIGN UP AND SIGN IN*/}
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name="firstname" label="First Name"  handleChange={handleChange} autoFocus half/>
                                <Input name="lastname" label="Last Name"  handleChange={handleChange} half/>
                            </>
                        )
                    }
                    <Input name="email" label="Email address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password'/> }

                </Grid>
                {/* LOGIN/SIGN UP BUTTON */}
                <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth> 
                  { isSignUp ? 'Sign Up' : 'Sign In' }
                </Button>
                
                {/*LOGIN WITH GOOGLE BUTTON*/}
                <GoogleLogin 
                  clientId="1078584094820-vclbvvha99m6l87g3bop58uosclbcqq8.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button 
                    className={classes.googleButton} 
                    color="primary"
                    fullWidth onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon />} 
                    variant="contained"> Google Sign In</Button> 
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />

               <Grid container justifyContent="flex-end">
                  <Grid item> 
                    <Button onClick={switchMode}> {isSignUp ? "Already have an account ? Sign In" : "Don't have an account ? Sign Up" } </Button>
                  </Grid>
               </Grid>
          </form>
      </Paper>
    </Container>
  )
}

export default Auth


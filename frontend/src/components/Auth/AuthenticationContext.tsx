import  { createContext, useState, useContext, useEffect } from 'react';
import { validateUsername, validatePassword } from '../Helpers/Validation';
import AuthService, { ErrorResponse } from '../../service/AuthService';


export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState((JSON.parse(localStorage.getItem('user')))); // user object includes the role
  const [errors, setErrors] = useState({});


  const login = async (userData: {username:string, password: string}) => {
    console.log("LoGIN EVENT", userData)
    // localStorage.setItem('user', JSON.stringify(userData));
    // setUser(userData);
    setErrors({});

    // Validate username and password
    const usernameError = validateUsername(userData.username);
    const passwordError = validatePassword(userData.password);

    if (usernameError || passwordError) {
      // Set errors and stop the login process
      console.log("Errors found:::::", usernameError, passwordError)
      setErrors({ form: usernameError || passwordError });
      return;
    }

  
    // backend
    try{
      console.log("About to call the backend")
      const response = await AuthService.login(userData.username, userData.password);
      console.log("response FROM THE Backend  ->  ", response)

      if ('message' in response && response['message'] == 'User successfully Authenticatted') {
        if('user' in response){
          console.log("setting access token using setuser......", response.user)
          setUser(response.user); 
        }
        
        //setUser({ token: response.access_token, role: response.role }); // Set the user role
        //return response.role; // Return the role for navigation
      } else {
        setErrors({ form: 'Authentication failed.' });
      }


      // const userDataRes = response as {};
      // userDataRes = userDataRes.data
      // localStorage.setItem('user', JSON.stringify(userDataRes));
      // setUser(userData);
      console.log("Displaying the user....", user)
      return response

    }
    catch(error){
        console.log("Error :  ", error)
        // Handle login error
        if (error instanceof Error) {
          // Handle generic errors
          setErrors({ form: error.message });
          console.log("error set")
        } else if (typeof error === 'object' && error !== null) {
          // Handle errors of type ErrorResponse
          const errorResponse = error as ErrorResponse;
          console.log("Error -> ", error)
          setErrors({ form: errorResponse.message });
        }
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, errors}}>
      {children}
    </AuthContext.Provider>
  );
};

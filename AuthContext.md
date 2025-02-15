AuthContext.js
// username, email values they have be in useContext();

<AuthContext>
    {
        isUserAuthenticated ? 
            <LogInStack>
                LogOut Screen
            <LogInStack>
                :
            <LogoutStack>
                Sign In Screen
                Sign Up Screen
                3rdParty Screen
            <LogoutStack>
    }
<AuthContext>
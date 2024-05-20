import React from "react";
// Components
import { AppNavigator } from "./src/navigator/AppNavigator";
// Context
import { AuthProvider } from "./src/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
};

export default App;

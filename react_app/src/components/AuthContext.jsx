import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [location,setLocation]=useState(null);
  const [gLocation,setGLocation]=useState(null);
  useEffect(() => {     
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setGLocation({
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Enable allow location to view distance details')
            })
}, []);
  const login = (Id) => {
    setUserId(Id);
    setAuthenticated(true);
  };
  const register=(location)=>{
    setLocation(location);
  }
  const logout = () => {
    setUserId(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, authenticated, login, logout,location,register,gLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

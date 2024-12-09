import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { usePathname } from 'expo-router';
import BottomBar from '../components/bottomBar';
import TopBar from '../components/topBar';  
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentRoute = usePathname();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [showTopBar, setShowTopBar] = useState(true);

  // Define the routes where you don't want to show the top or bottom bar
  const excludedRoutes = ['/', '/index', '/auth/register', '/auth/signin'];

  useEffect(() => {
    // Update BottomBar and TopBar visibility based on current route
    if (excludedRoutes.includes(currentRoute)) {
      setShowBottomBar(false);
      setShowTopBar(false);
    } else {
      setShowBottomBar(true);
      setShowTopBar(true);
    }
  }, [currentRoute]);

  return (
    <>
      {/* Conditionally Render TopBar */}
      {showTopBar && <TopBar />}

      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: excludedRoutes.includes(route.path), 
          tabBarStyle: excludedRoutes.includes(currentRoute)
            ? { display: 'none' }
            : {},
        })}
      >
        {/* Define your Tab Screens here */}
      </Tabs>

      {/* Conditionally Render BottomBar */}
      {showBottomBar && <BottomBar />}
    </>
  );
}

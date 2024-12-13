import React, { useState, useEffect } from "react";
import { usePathname, useRouter, Tabs } from "expo-router";
import BottomBar from "../components/bottomBar";
import TopBar from "../components/topBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { account } from "../appwrite/appwriteConfig";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentRoute = usePathname();
  const router = useRouter();
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const excludedRoutes = ["/", "/index", "/register", "/signin", "/settings"];

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await account.get();
        setIsLoggedIn(!!user); // If user is not null, they are logged in
      } catch (error) {
        setIsLoggedIn(false); // If there is an error (e.g., user is not logged in), set to false
      }
    };

    // Check login status on component mount
    checkLoginStatus();

    // Handle deleting sessions when on the index page
    if (currentRoute === "/index") {
      const deleteSessions = async () => {
        try {
          // Log out the user by deleting all sessions
          await account.deleteSession("current"); // Delete current session
          setIsLoggedIn(false); // Update login state
          router.push("/signin"); // Redirect user to sign-in page after logging out
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      };

      deleteSessions(); // Trigger session deletion if on the index page
    }

    // Update TopBar and BottomBar visibility based on current route
    if (excludedRoutes.includes(currentRoute)) {
      setShowBottomBar(false);
      setShowTopBar(false);
    } else {
      setShowBottomBar(true);
      setShowTopBar(true);
    }
  }, [currentRoute, router]);

  return (
    <>
      {/* Conditionally Render TopBar */}
      {showTopBar && <TopBar />}

      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: excludedRoutes.includes(route.path ? route.path : ""), // Hide header for excluded routes
          tabBarStyle: { display: "none" }, // Hide default bottom bar
        })}
      >
        {/* Define your Tab Screens here */}
      </Tabs>

      {/* Conditionally Render Your Custom BottomBar */}
      {showBottomBar && <BottomBar />}
    </>
  );
}

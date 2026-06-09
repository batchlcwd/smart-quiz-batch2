import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Link } from "react-router";
import { Sun, Moon, Book, BrainCog } from "lucide-react";
function MyNavbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log("Changing theme");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 tracking-wide">
        <BrainCog />    
         <span> Quizify</span>
        </Link>

        <div className="flex gap-5 justify-center items-center">
          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>

             <Link to="/features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>

            <Link
              to="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-sm font-medium hover:text-primary"
            >
              Signup
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Mobile button */}
            <Button className="md:hidden">Menu</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;

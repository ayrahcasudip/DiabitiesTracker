import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User, LogOut, Menu, X, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import photo from './image.png';

const DiabetesTrackerNavbar = ({ showProfileMenu, showBackButton = true }) => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    console.log("Logged out successfully");
    navigate('/login');
  };

  const handleNotificationClick = () => {
    console.log("Opening notifications");
    setNotificationCount(0);
  };

  const handlebackClick = () => {
    navigate('/dashboard');
  };

  const navItems = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Features', path: '#' },
    { name: 'Contact', path: '#' },
    { name: 'Blog', path: '/blogs' },
  ];

  

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b w-full md:mx-auto md:w-4/5 ">
     
     <div className='backbutton'>
        {/* Back button that navigates to /dashboard */}
        {showBackButton && (
        <Button
          onClick={handlebackClick}
          className="bg-transparent border-none rounded-full p-2 hover:bg-transparent focus:bg-transparent active:bg-transparent "
        >
          <ArrowLeft className="text-blue-600 bg-transparent" size={24} />
        </Button>
        )}
      </div>
      
      <div className="flex items-center">
        
        <div className="text-2xl font-bold">Diabetes Tracker</div>
      </div>
      
      <div className="flex items-center space-x-3.5">
        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="link"
              className="bg-transparent"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Notification Icon */}
        <Button variant="ghost" size="" onClick={handleNotificationClick} className="relative bg-transparent text-black">
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
              {notificationCount}
            </Badge>
          )}
        </Button>

        

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={photo} alt="User"  className='object-cover'/>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
        )}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="" className="md:hidden mr-2 bg-transparent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start bg-transparent"
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default DiabetesTrackerNavbar;
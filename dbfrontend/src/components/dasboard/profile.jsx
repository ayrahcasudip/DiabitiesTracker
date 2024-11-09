import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Mail, Phone, Edit, TrendingUp, Activity, Droplet } from 'lucide-react';
import DiabetesTrackerNavbar from './component/navbar';
import DiabetesTrackerFooter from './component/footer';

const ProfileDashboard = () => {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    dateOfBirth: '',
    email: '',
    contactnumber: '',
    avatar: '',
    healthStatus: '',
    healthScore: 0,
    lastCheckup: '',
    bloodSugarLevel: 0,
    hba1c: 0,
    weight: 0,
    height: 0,
  });

  const [loading, setLoading] = useState(true);

  const _id = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    if (!_id) {
      console.error("User ID (userId) is missing from localStorage.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://diabities-tracker-api.vercel.app/user/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ _id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        setUser({
          username: data.username,
          fullname: data.fullname,
          dateOfBirth: data.dateOfBirth || 'N/A',
          email: data.email,
          contactnumber: data.contactnumber,
          avatar: data.avatar || '/path-to-avatar.jpg',
          healthStatus: data.healthStatus || "Good",
          healthScore: data.healthScore || 89,
          lastCheckup: data.lastCheckup || '2023-05-01',
          bloodSugarLevel: data.bloodSugarLevel,
          hba1c: data.hba1c || 6.2,
          weight: data.weight || 75,
          height: data.height || 175,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [_id, token]);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI(user.weight, user.height);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <DiabetesTrackerNavbar showProfileMenu={false} />
      </div>
      <div className="container mx-auto p-4 space-y-6 w-full md:mx-auto md:w-4/5">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} alt={user.fullname || 'User Avatar'} />
              <AvatarFallback>
                {(user.fullname && user.fullname.split(' ').map(n => n[0]).join('')) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle>{user.fullname}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-auto">
              <Badge className="flex items-center gap-1" variant={user.healthStatus === "Good" ? "success" : "warning"}>
                <span className={`w-2 h-2 rounded-full ${user.healthStatus === "Good" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                Health Status: {user.healthStatus}
              </Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 opacity-70" />
                <span className="text-sm">Born: {user.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-70" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-70" />
                <span className="text-sm">{user.contactnumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 opacity-70" />
                <span className="text-sm">Last Checkup: {user.lastCheckup}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Overview</CardTitle>
            <CardDescription>Your current health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Health Score</span>
                  <span className="text-sm font-medium">{user.healthScore}%</span>
                </div>
                <Progress value={user.healthScore} className="w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blood Glucose</CardTitle>
                    <Droplet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.bloodSugarLevel} mg/dL</div>
                    <p className="text-xs text-muted-foreground">Target: 80-130 mg/dL before meals</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">HbA1c</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.hba1c}%</div>
                    <p className="text-xs text-muted-foreground">Target: Below 7%</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <DiabetesTrackerFooter />
      </div>
    </>
  );
};

export default ProfileDashboard;
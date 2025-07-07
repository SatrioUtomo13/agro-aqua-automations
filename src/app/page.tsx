import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Fish } from "lucide-react";
import FarmDashboard from "./components/FarmDashboard";
import FisheryDashboard from "./components/FisheryDashboard";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center ">
      <AuthForm />
    </main>
  );
}

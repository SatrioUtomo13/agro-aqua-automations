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
      {/* <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AgroSmart Management System
          </h1>
          <p className="text-lg text-gray-600">
            Smart solution for modern farming and fishery operations
          </p>
        </div>

        <Tabs defaultValue="farm" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="farm" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Farm Management
            </TabsTrigger>
            <TabsTrigger value="fishery" className="flex items-center gap-2">
              <Fish className="w-4 h-4" />
              Fishery Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farm">
            <FarmDashboard />
          </TabsContent>

          <TabsContent value="fishery">
            <FisheryDashboard />
          </TabsContent>
        </Tabs>
      </div> */}

      <AuthForm />
    </main>
  );
}

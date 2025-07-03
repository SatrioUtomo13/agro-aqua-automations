'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Droplets, Thermometer, Sprout, Power } from 'lucide-react'
import { toast } from 'sonner'

const FarmDashboard = () => {
    const [soilMoisture, setSoilMoisture] = useState(65)
    const [autoWatering, setAutoWatering] = useState(false)
    const [isWatering, setIsWatering] = useState(false)
    const [temperature, setTemperature] = useState(24)

    // Simulate real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate soil moisture changes
            setSoilMoisture(prev => {
                let newValue = prev + (Math.random() - 0.5) * 4
                if (isWatering) newValue += 2
                return Math.max(0, Math.min(100, newValue))
            })

            // Simulate temperature changes
            setTemperature(prev => prev + (Math.random() - 0.5) * 2)

            // Auto watering logic
            if (autoWatering && soilMoisture < 30 && !isWatering) {
                setIsWatering(true)
                toast("Auto Watering Activated", {
                    description: "Soil moisture is low. Starting irrigation system."
                })

                setTimeout(() => {
                    setIsWatering(false)
                    toast("Watering Completed.", {
                        description: "Irrigation cycle finished successfully."
                    })
                }, 5000)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [autoWatering, soilMoisture, isWatering, toast])

    const handleManualWatering = () => {
        if (!isWatering) {
            setIsWatering(true)
            toast("Manual Watering Started", {
                description: "Irrigation system activated manually."
            })

            setTimeout(() => {
                setIsWatering(false)
                toast("Watering Completed.", {
                    description: "Manual irrigation cycle finished successfully."
                })
            }, 3000)
        }
    }

    const getMoistureStatus = (moisture: number) => {
        if (moisture > 70) return { status: "Optimal", color: "bg-green-500" }
        if (moisture > 40) return { status: "Good", color: "bg-yellow-500" }
        return { status: "Low", color: "bg-red-500" }
    }

    const moistureStatus = getMoistureStatus(soilMoisture)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Soil Moisture Monitor */}
            <Card className='col-span-1 md:col-span-2 lg:col-span-1'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Soil Moisture</CardTitle>
                    <Droplets className='h-4 w-4 text-blue-500' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold mb-2'>{soilMoisture.toFixed(1)}%</div>
                    <Progress value={soilMoisture} className='mb-2' />
                    <Badge className={`${moistureStatus.color} text-white`}>
                        {moistureStatus.status}
                    </Badge>
                    <p className='text-xs text-muted-foreground mt-2'>
                        Real-time soil moisture monitoring
                    </p>
                </CardContent>
            </Card>

            {/* Temperature Monitor */}
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Soil Temperature</CardTitle>
                    <Thermometer className='h-4 w-4 text-orange-500' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{temperature.toFixed(1)}°C</div>
                    <p className='text-xs text-muted-foreground'>
                        Current soil temperature
                    </p>
                </CardContent>
            </Card>

            {/* Watering Controls */}
            <Card>
                <CardHeader>
                    <CardTitle>Irrigations Control</CardTitle>
                    <Sprout className='h-4 w-4 text-green-500' />
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <label className='text-sm font-medium'>Auto Watering</label>
                        <Switch
                            checked={autoWatering}
                            onCheckedChange={setAutoWatering}
                        />
                    </div>

                    <Button
                        onClick={handleManualWatering}
                        disabled={isWatering}
                        className='w-full'
                        variant={isWatering ? "secondary" : "default"}
                    >
                        <Power className='w-4 h-4 mr-2' />
                        {isWatering ? "Watering..." : "Manual Water"}
                    </Button>

                    {isWatering && (
                        <div className='text-center'>
                            <div className='animate-pulse text-blue-600 text-sm'>
                                💧 Irrigation system active
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Farm Status Overview */}
            <Card className='col-span-1 md:col-span-2 lg:col-span-3'>
                <CardHeader>
                    <CardTitle>Farm Status Overview</CardTitle>
                    <CardDescription>
                        Current status of all farm systems and sensors
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='text-center p-4 bg-green-50 rounded-lg'>
                            <div className='text-2xl font-bold text-green-600'>
                                {autoWatering ? "ON" : "OFF"}
                            </div>
                            <div className='text-sm text-gray-600'>Auto Irrigation</div>
                        </div>

                        <div className='text-center p-4 bg-blue-50 rounded-lg'>
                            <div className='text-2xl font-bold text-blue-600'>
                                {soilMoisture.toFixed(0)}%
                            </div>
                            <div className='text-sm text-gray-600'>Soil Moisture</div>
                        </div>

                        <div className='text-center p-4 bg-orange-50 rounded-lg'>
                            <div className='text-2xl font-bold text-orange-600'>
                                {temperature.toFixed(1)}°C
                            </div>
                            <div className='text-sm text-gray-600'>Temperature</div>
                        </div>

                        <div className='text-center p-4 bg-purple-50 rounded-lg'>
                            <div className='text-2xl font-bold text-purple-600'>
                                {isWatering ? "ACTIVE" : "IDLE"}
                            </div>
                            <div>Water System</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FarmDashboard

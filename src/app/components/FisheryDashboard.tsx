'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Fish, Thermometer, Clock, Settings } from 'lucide-react'
import { toast } from 'sonner'

const FisheryDashboard = () => {
    const [waterTemp, setWaterTemp] = useState(26.5)
    const [autoFeeding, setAutoFeeding] = useState(false)
    const [feedingInterval, setFeedingInterval] = useState(8) // hours
    const [lastFeedTime, setLastFeedTime] = useState<Date | null>(null)
    const [isFeeding, setIsFeeding] = useState(false)
    const [nextFeedingIn, setNextFeedingIn] = useState(0)

    // Simulate real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate water temperature changes
            setWaterTemp(prev => {
                const newTemp = prev + (Math.random() - 0.5) * 0.5
                return Math.max(20, Math.min(35, newTemp))
            })

            // Update feeding countdown
            if (lastFeedTime && autoFeeding) {
                const timeSinceLastFeed = Date.now() - lastFeedTime.getTime()
                const timeUntilNext = (feedingInterval * 60 * 60 * 1000) - timeSinceLastFeed

                if (timeUntilNext <= 0 && !isFeeding) {
                    // Time to feed automatically
                    handleAutoFeeding()
                } else {
                    setNextFeedingIn(Math.max(0, timeUntilNext))
                }
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [lastFeedTime, autoFeeding, feedingInterval, isFeeding])

    const handleAutoFeeding = () => {
        setIsFeeding(true)
        toast("Auto Feeding Activated", {
            description: "Dispending food for the fish automatically."
        })

        setTimeout(() => {
            setIsFeeding(false)
            setLastFeedTime(new Date())
            toast("Feeding Completed.", {
                description: "Fish have been fed successfully."
            })
        }, 3000)
    }

    const handleManualFeeding = () => {
        if (!isFeeding) {
            setIsFeeding(true)
            toast("Manual Feeding Started", {
                description: "Dispending food manually."
            })

            setTimeout(() => {
                setIsFeeding(false)
                setLastFeedTime(new Date())
                toast("Feeding Completed.", {
                    description: "Manual feeding finished successfully."
                })
            }, 3000)
        }
    }

    const getTempStatus = (temp: number) => {
        if (temp >= 24 && temp <= 28) return { status: "Optimal", color: "bg-green-500" }
        if (temp >= 20 && temp <= 32) return { status: "Acceptable", color: "bg-yellow-500" }
        return { status: "Critical", color: "bg-red-500" }
    }

    const tempStatus = getTempStatus(waterTemp)

    const formatTimeRemaining = (miliseconds: number) => {
        const hours = Math.floor(miliseconds / (1000 * 60 * 60))
        const minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}m`
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Water Temperature Monitor */}
            <Card className='col-span-1 md:col-span-2 lg:col-span-1'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Water Temperature</CardTitle>
                    <Thermometer className='h-4 w-4 text-blue-500' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold mb-2'>{waterTemp.toFixed(1)}°C</div>
                    <Progress
                        value={((waterTemp - 20) / (35 - 20)) * 100}
                        className='mb-2'
                    />
                    <Badge className={`${tempStatus.color} text-white`}>
                        {tempStatus.status}
                    </Badge>
                    <p className='text-xs text-muted-foreground mt-2'>
                        Optimal range: 24-28°C
                    </p>
                </CardContent>
            </Card>

            {/* Feeding Controls */}
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Feeding System</CardTitle>
                    <Fish className='h-4 w-4 text-orange-500' />
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <label className='text-sm font-medium'>Auto Feeding</label>
                        <Switch
                            checked={autoFeeding}
                            onCheckedChange={setAutoFeeding}
                        />
                    </div>

                    <Button
                        onClick={handleManualFeeding}
                        disabled={isFeeding}
                        className='w-full'
                        variant={isFeeding ? "secondary" : "default"}
                    >
                        <Fish className='w-4 h-4 mr-2' />
                        {isFeeding ? "Feeding..." : "Feed Now"}
                    </Button>

                    {isFeeding && (
                        <div className='text-center'>
                            <div className='animate-pulse text-orange-600 text-sm'>
                                🐟 Dispending food...
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Feeding Schedule */}
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Feeding Schedule</CardTitle>
                    <Clock className='h-4 w-4 text-purple-500' />
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='interval'>Feeding Interval (hours)</Label>
                        <Input
                            id='interval'
                            type='number'
                            value={feedingInterval}
                            onChange={(e) => setFeedingInterval(Number(e.target.value))}
                            min="1"
                            max="24"
                        />
                    </div>

                    {lastFeedTime && (
                        <div className='text-sm'>
                            <p>Last fed: {lastFeedTime.toLocaleTimeString()}</p>
                            {autoFeeding && nextFeedingIn > 0 && (
                                <p className='text-blue-600'>
                                    Next feeding: {formatTimeRemaining(nextFeedingIn)}
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* System Status */}
            <Card className='col-span-1 md:col-span-2 lg:col-span-3'>
                <CardHeader>
                    <CardTitle>Fishery Status Overview</CardTitle>
                    <CardDescription>
                        Current status of all fishery systems and monitoring.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='text-center p-4 bg-blue-50 rounded-lg'>
                            <div className='text-2xl font-bold text-blue-600'>
                                {waterTemp.toFixed(1)}°C
                            </div>
                            <div className='text-sm text-gray-600'>Water Temp</div>
                        </div>

                        <div className='text-center p-4 bg-orange-50 rounded-lg'>
                            <div className='text-2xl font-bold text-orange-600'>
                                {autoFeeding ? "ON" : "OFF"}
                            </div>
                            <div className='text-sm text-gray-600 '>Auto Feeding</div>
                        </div>

                        <div className='text-center p-4 bg-purple-50 rounded-lg'>
                            <div className='text-2xl font-bold text-purple-600'>
                                {feedingInterval}h
                            </div>
                            <div className='text-sm text-gray-600'>Feed Interval</div>
                        </div>

                        <div className='text-center p-4 bg-green-50 rounded-lg'>
                            <div className='text-2xl font-bold text-green-600'>
                                {isFeeding ? "ACTIVE" : "IDLE"}
                            </div>
                            <div className='text-sm text-gray-600'>Feed System</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Water Quality Alerts */}
            <Card className='col-span-1 md:col-span-2 lg:col-span-3'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Settings className='h-4 w-4' />
                        Water Quality Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-2'>
                        {waterTemp < 24 && (
                            <div className='flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded'>
                                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                <span className='text-sm'>Water temperature is below optimal range</span>
                            </div>
                        )}
                        {waterTemp > 28 && (
                            <div className='flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded'>
                                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                <span className='text-sm'>Water temperature is above optimal range</span>
                            </div>
                        )}
                        {waterTemp >= 24 && waterTemp <= 28 && (
                            <div className='flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span className='text-sm'>All systems operating within optimal parameters</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FisheryDashboard

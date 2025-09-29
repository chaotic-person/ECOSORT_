'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { collectionSchedule } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ScheduleEditor() {
    const [schedule, setSchedule] = useState(collectionSchedule);
    const { toast } = useToast();

    const handleDayChange = (area: string, day: string) => {
        setSchedule(currentSchedule => 
            currentSchedule.map(item => item.area === area ? {...item, day} : item)
        );
    };

    const handleSave = () => {
        console.log('Saving new schedule:', schedule);
        toast({
            title: 'Schedule Updated',
            description: 'The collection schedule has been successfully updated.',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Collection Schedule Editor</CardTitle>
                <CardDescription>Update collection days for each district.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>District</TableHead>
                            <TableHead>Collection Day</TableHead>
                            <TableHead className="hidden sm:table-cell">Waste Types</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schedule.map(item => (
                            <TableRow key={item.area}>
                                <TableCell className="font-medium">{item.area}</TableCell>
                                <TableCell>
                                    <Select value={item.day} onValueChange={(value) => handleDayChange(item.area, value)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {daysOfWeek.map(day => (
                                                <SelectItem key={day} value={day}>{day}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{item.items}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSave}>Update Schedule</Button>
            </CardFooter>
        </Card>
    )
}

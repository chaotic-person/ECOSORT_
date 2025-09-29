import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, Trash2 } from 'lucide-react';

export default function NotificationsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert className="bg-yellow-100/50 dark:bg-yellow-900/20 border-yellow-500/50 text-yellow-800 dark:text-yellow-300 [&>svg]:text-yellow-600">
                    <Trash2 className="h-4 w-4" />
                    <AlertTitle>Dustbin Almost Full!</AlertTitle>
                    <AlertDescription>
                        Your main dustbin is at 90% capacity. Please ensure it's accessible for collection.
                    </AlertDescription>
                </Alert>
                <Alert>
                     <AlertTitle>No new notifications</AlertTitle>
                    <AlertDescription>
                        You're all caught up.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}

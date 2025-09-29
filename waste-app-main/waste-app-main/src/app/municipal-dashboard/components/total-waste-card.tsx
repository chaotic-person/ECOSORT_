import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currentMonthTotal } from "@/lib/data";
import { Layers } from "lucide-react";

export default function TotalWasteCard() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Waste Collected</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{currentMonthTotal.toFixed(1)} Tonnes</div>
                <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
        </Card>
    );
}

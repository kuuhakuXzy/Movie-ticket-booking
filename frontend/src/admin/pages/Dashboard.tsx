import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs';

export default function DashboardPage() {
    return (
        <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
            <Tabs defaultValue="overview" className="space-y-4">
                {/* Header + Tabs in one row */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Hi, Welcome back 👋
                    </h2>
                    <TabsList>
                        <TabsTrigger value="overview" className="mx-2 font-poppins text-lg">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="font-poppins text-lg">
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Tabs content */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Cards */}
                        {[
                            {
                                title: 'Total Revenue',
                                value: '$45,231.89',
                                change: '+20.1% from last month',
                                iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
                            },
                            {
                                title: 'Subscriptions',
                                value: '+2350',
                                change: '+180.1% from last month',
                                iconPath: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
                                iconExtra: '<circle cx="9" cy="7" r="4" />'
                            },
                            {
                                title: 'Sales',
                                value: '+12,234',
                                change: '+19% from last month',
                                iconPath: 'M2 10h20',
                                iconExtra: '<rect width="20" height="14" x="2" y="5" rx="2" />'
                            },
                            {
                                title: 'Active Now',
                                value: '+573',
                                change: '+201 since last hour',
                                iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2'
                            }
                        ].map((card, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: `${card.iconExtra ?? ''}<path d="${card.iconPath}" />` }}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.value}</div>
                                    <p className="text-xs text-muted-foreground">{card.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Bottom section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                                <CardDescription>You made 265 sales this month.</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

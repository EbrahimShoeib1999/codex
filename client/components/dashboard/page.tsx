"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Page Views",
      value: "45.2K",
      change: "+25.8%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Content Pieces",
      value: "126",
      change: "+5.2%",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-8.4%",
      trend: "down",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your website.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          const trendColor = stat.trend === "up" ? "text-green-500" : "text-red-500";

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center pt-1">
                    <TrendIcon
                      className={`mr-1 h-4 w-4 ${trendColor}`}
                    />
                    <p className={`text-xs ${trendColor}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and updates on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Content Updated",
                  description: "Homepage hero section content was modified",
                  time: "2 hours ago",
                },
                {
                  action: "New User Registered",
                  description: "A new user account was created",
                  time: "5 hours ago",
                },
                {
                  action: "Support Ticket Resolved",
                  description: "Ticket #1234 was marked as resolved",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-lg border p-3"
                >
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Performance</CardTitle>
            <CardDescription>
              Key metrics for the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  metric: "Average Load Time",
                  value: "1.2s",
                  change: "-0.3s",
                  trend: "up",
                },
                {
                  metric: "Bounce Rate",
                  value: "32%",
                  change: "-2.4%",
                  trend: "up",
                },
                {
                  metric: "User Engagement",
                  value: "4.5m",
                  change: "+1.2m",
                  trend: "up",
                },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div
                    className={`flex items-center ${
                      metric.trend === "up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
"use client";

import type { User } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Target } from "lucide-react";

interface MyStatsProps {
  user: User;
}

export function MyStats({ user }: MyStatsProps) {
  const progress = Math.min((user.steps.daily / user.dailyGoal) * 100, 100);
  const goalMet = user.steps.daily >= user.dailyGoal;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Target className="text-primary" /> Your Progress
        </CardTitle>
        <CardDescription>Your daily step challenge summary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
        <div className="text-center">
          <p className="text-5xl font-bold font-headline text-primary">{user.steps.daily.toLocaleString()}</p>
          <p className="text-muted-foreground">steps today</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <p className="text-sm font-medium">Daily Goal</p>
            <p className="text-sm text-muted-foreground">{user.dailyGoal.toLocaleString()} steps</p>
          </div>
          <Progress value={progress} />
        </div>
        {goalMet && (
          <div className="flex justify-center pt-2">
            <Badge variant="secondary" className="text-base py-1 px-3 border-green-500/50 text-green-700 bg-green-500/10">
              <Award className="mr-2 h-4 w-4" /> Goal Achieved!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

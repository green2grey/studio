"use client";

import { useState, useEffect } from 'react';
import type { User, Department } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Target, BrainCircuit, Dumbbell } from "lucide-react";
import { getMotivationAction } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

interface MyStatsProps {
  user: User & {
    department: Department;
    departmentRank: number;
    departmentTotalSteps: number;
    challengeTargetSteps: number;
  };
}

export function MyStats({ user }: MyStatsProps) {
  const [motivation, setMotivation] = useState<{ message: string; fitnessTip: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMotivation = async () => {
      if (!user) return;
      setIsLoading(true);
      const res = await getMotivationAction({
        userName: user.name,
        userStepCount: user.steps,
        departmentName: user.department.name,
        departmentRank: user.departmentRank,
        departmentTotalSteps: user.departmentTotalSteps,
        challengeTargetSteps: user.challengeTargetSteps,
      });
      if (res.success && res.data) {
        setMotivation(res.data);
      }
      setIsLoading(false);
    };

    fetchMotivation();
  }, [user]);

  const progress = Math.min((user.steps / user.dailyGoal) * 100, 100);
  const goalMet = user.steps >= user.dailyGoal;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Target className="text-primary" /> Your Progress
          </CardTitle>
          <CardDescription>Your daily step challenge summary.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
          <div className="text-center">
            <p className="text-5xl font-bold font-headline text-primary">{user.steps.toLocaleString()}</p>
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
      
      <Card className="bg-secondary/50 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BrainCircuit className="text-primary" /> AI Coach
          </CardTitle>
          <CardDescription>Personalized motivation to keep you going.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
          {isLoading ? (
            <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-start gap-2 pt-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
            </div>
          ) : motivation ? (
            <>
              <div>
                <p className="font-semibold text-foreground/90">Message for you:</p>
                <p className="text-muted-foreground font-medium italic">"{motivation.message}"</p>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Dumbbell className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground/90">Fitness Tip:</p>
                  <p className="text-muted-foreground">{motivation.fitnessTip}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-center">Could not load motivation at this time.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

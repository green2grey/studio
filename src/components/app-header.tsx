import type { User } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddStepsDialog } from "./add-steps-dialog";

interface AppHeaderProps {
  user: User;
  onAddSteps: (steps: number) => void;
}

export function AppHeader({ user, onAddSteps }: AppHeaderProps) {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-headline font-bold text-primary">StrideSync</h1>
        <div className="flex items-center gap-4">
          <AddStepsDialog onAddSteps={onAddSteps}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Steps
            </Button>
          </AddStepsDialog>
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile person" />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

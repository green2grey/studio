"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddStepsDialogProps {
    children: React.ReactNode;
    onAddSteps: (steps: number) => void;
}

export function AddStepsDialog({ children, onAddSteps }: AddStepsDialogProps) {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (steps > 0) {
      onAddSteps(steps);
    }
    setOpen(false);
    setSteps(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline">Add Your Steps</DialogTitle>
            <DialogDescription>
              Enter the number of steps you've taken. Keep up the great work!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="steps" className="text-right">
                Steps
              </Label>
              <Input 
                id="steps" 
                type="number"
                min="0"
                value={steps > 0 ? steps : ''} 
                onChange={(e) => setSteps(Number(e.target.value))} 
                className="col-span-3"
                placeholder="e.g. 5000"
                />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Steps</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup, FieldSet } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  createJobApplication,
  FormState,
} from "@/lib/actions/job-applications";
import { startTransition, useActionState, useState } from "react";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}
const initialState: FormState = {};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    createJobApplication,
    initialState,
  );

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      formAction(formData);
    });

    if (!state.error) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="w-full h-10 text-sm font-medium cursor-pointer text-zinc-500 hover:text-zinc-600! hover:bg-gray-100 border-dashed border-2 hover:border-solid"
          >
            {" "}
            <Plus className="mr-2 h-4 w-4" /> Add Job
          </Button>
        }
      />
      <DialogContent className="max-w-lg! p-6!">
        <DialogHeader className="mb-3">
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>
            Fill in the details for your new job application.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="columnId" value={columnId} />
          <input type="hidden" name="boardId" value={boardId} />
          <FieldSet className="w-full">
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="xyz Tech"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Software Engineer"
                  required
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="San Francisco, CA"
                />
              </Field>
              <Field>
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="e.g., $100k - $150k"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Label htmlFor="jobUrl">Job URL</Label>
                <Input id="jobUrl" name="jobUrl" placeholder="https://..." />
              </Field>
              <Field>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="React, Typescript, High Pay"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Brief description of the role..."
                />
              </Field>
              <Field>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" rows={3} />
              </Field>
            </FieldGroup>
          </FieldSet>
          {state.error && (
            <p className="text-sm text-red-500 mt-2">{state.error}</p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer rounded-md p-4!"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer rounded-md p-4!"
            >
              {isPending ? "Adding..." : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

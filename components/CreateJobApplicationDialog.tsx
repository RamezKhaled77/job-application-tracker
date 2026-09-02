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

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className="w-full h-10 text-sm font-medium cursor-pointer text-zinc-600 hover:bg-gray-100"
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

          <form>
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
          </form>

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
            <Button type="submit" className="cursor-pointer rounded-md p-4!">
              Add Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

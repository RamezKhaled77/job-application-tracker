"use client";

import { ClientColumn, ClientJobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { updateJobApplication } from "@/lib/actions/job-applications";
import { Plus } from "lucide-react";
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
import { useState } from "react";

interface JobApplicationCardProps {
  job: ClientJobApplication;
  columns: ClientColumn[];
}

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    notes: job.notes || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    columnId: job.columnId || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
  });

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result.error) {
        setIsEditing(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Failed to move job application: ", err);
    }
  }

  async function handleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });
    } catch (err) {
      console.error("Failed to move job application: ", err);
    }
  }
  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg bg-white group shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{job.position}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {job.company}
              </p>
              {job.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {job.description}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {job.jobUrl && (
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-start gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  }
                />

                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Moves</DropdownMenuLabel>

                    {columns.length > 1 && (
                      <>
                        {columns
                          .filter((c) => c._id !== job.columnId)
                          .map((column, key) => (
                            <DropdownMenuItem
                              key={key}
                              onClick={() => handleMove(column._id)}
                            >
                              Move to {column.name}
                            </DropdownMenuItem>
                          ))}
                      </>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-red-100! hover:text-red-700!">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg! p-6!">
          <DialogHeader className="mb-3">
            <DialogTitle>Add Job Application</DialogTitle>
            <DialogDescription>
              Fill in the details for your new job application.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <FieldSet className="w-full">
              <FieldGroup className="grid grid-cols-2 gap-4">
                <Field>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="xyz Tech"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </Field>
                <Field>
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="Software Engineer"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
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
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g., $100k - $150k"
                    value={formData.salary || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <Label htmlFor="jobUrl">Job URL</Label>
                  <Input
                    id="jobUrl"
                    name="jobUrl"
                    placeholder="https://..."
                    value={formData.jobUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, jobUrl: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="React, Typescript, High Pay"
                    value={formData.tags || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
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
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer rounded-md p-4!"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                }
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer rounded-md p-4!"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

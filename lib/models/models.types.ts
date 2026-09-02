import mongoose, { Schema, Document } from "mongoose";

export interface JobApplication extends Document {
  company: string;
  position: string;
  location?: string;
  status: string;
  columnId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  userId: string;
  order: number;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  appliedDate?: Date;
  tags?: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column extends Document {
  name: string;
  boardId: Schema.Types.ObjectId;
  order: number;
  jobApplications: mongoose.Types.ObjectId[] | JobApplication[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Board extends Document {
  name: string;
  userId: string;
  columns: mongoose.Types.ObjectId[] | Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientJobApplication {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  columnId: string;
  boardId: string;
  userId: string;
  order: number;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  appliedDate?: string;
  tags?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientColumn {
  _id: string;
  name: string;
  boardId: string;
  order: number;
  jobApplications: ClientJobApplication[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientBoard {
  _id: string;
  name: string;
  userId: string;
  columns: ClientColumn[];
  createdAt: string;
  updatedAt: string;
}

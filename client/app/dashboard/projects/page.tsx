// client/app/dashboard/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  imageUrl?: string; // Optional image URL
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    name: "",
    client: "",
    status: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setTimeout(() => {
      setProjects([
        {
          id: "p1",
          name: "Website Redesign",
          status: "In Progress",
          client: "ABC Corp",
        },
        {
          id: "p2",
          name: "Mobile App Development",
          status: "Completed",
          client: "XYZ Inc",
        },
        {
          id: "p3",
          name: "E-commerce Platform",
          status: "Pending",
          client: "123 Ltd",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddProjectClick = () => {
    setEditingProject(null);
    setFormData({ name: "", client: "", status: "", imageUrl: "" });
    setSelectedImageFile(null);
    setIsModalOpen(true);
  };

  const handleEditProjectClick = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      client: project.client,
      status: project.status,
      imageUrl: project.imageUrl || "",
    });
    setSelectedImageFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImageFile(e.target.files[0]);
    } else {
      setSelectedImageFile(null);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate image upload
    let imageUrlToSave = formData.imageUrl;
    if (selectedImageFile) {
      imageUrlToSave = URL.createObjectURL(selectedImageFile); // For demo, use Data URL
      // In a real app, you'd upload selectedImageFile to a server
      // and get back the actual image URL.
    }

    setTimeout(() => {
      if (editingProject) {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProject.id
              ? { ...project, ...formData, imageUrl: imageUrlToSave } // Update imageUrl
              : project
          )
        );
      } else {
        const newProject = {
          ...formData,
          id: `p${projects.length + 1}`,
          imageUrl: imageUrlToSave, // Add imageUrl
        };
        setProjects((prev) => [...prev, newProject]);
      }

      setLoading(false);
      setIsModalOpen(false);
      setSelectedImageFile(null); // Reset selected image file
    }, 1000);
  };

  const handleDeleteProject = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setProjects((prev) => prev.filter((project) => project.id !== id));
      setLoading(false);
    }, 500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="section-padding space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Project Management</h1>
          <p className="text-lg text-muted-foreground">
            Manage all projects in your portfolio.
          </p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddProjectClick}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Make changes to the project details here."
                  : "Add a new project to your system."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitProject} className="grid gap-4 py-4">
              {/* Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  disabled={loading}
                />
              </div>

              {/* Client */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="col-span-3"
                  disabled={loading}
                />
              </div>

              {/* Status */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="col-span-3"
                  disabled={loading}
                />
              </div>

              {/* Image Upload */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  className="col-span-3"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </div>

              {/* Image Preview */}
              {(formData.imageUrl || selectedImageFile) && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-span-1"></div> {/* Spacer for alignment */}
                  <div className="col-span-3">
                    <div className="relative h-32 w-32 rounded-md overflow-hidden border">
                      <Image
                        src={selectedImageFile ? URL.createObjectURL(selectedImageFile) : formData.imageUrl || ""}
                        alt="Project Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {loading && projects.length === 0 ? (
        <p>Loading projects...</p>
      ) : (
        <div className="rounded-md border">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.imageUrl && (
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.status}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProjectClick(project)}
                      className="text-primary hover:text-primary/90"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/90 ml-2"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the project.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.section>
  );
}

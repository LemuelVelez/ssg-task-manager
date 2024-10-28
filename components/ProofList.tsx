"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getProofs, deleteProofAndFile } from "@/lib/utils/appwrite"; // Import delete function
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "./ui/button";
import { Badge, statusDisplayMap } from "./ui/badge"; // Import the Badge component

// Define the Proof interface
interface Proof {
  id: string;
  type: "Duty" | "Task";
  fileUrl: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Define the props for the ProofList component
interface ProofListProps {
  proofs: Proof[];
}

// Define the ProofList component
const ProofList: React.FC<ProofListProps> = ({ proofs }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [proofsList, setProofsList] = useState<Proof[]>(proofs);

  // Function to fetch proofs from the database
  const fetchProofs = async () => {
    try {
      const retrievedProofs: Proof[] = await getProofs();
      setProofsList(retrievedProofs);
    } catch (error) {
      console.error("Error fetching proofs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle proof deletion with confirmation
  const handleDeleteProof = async (proofId: string, fileUrl: string | null) => {
    if (!fileUrl) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the proof and its associated file.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const fileId = fileUrl.split("/").slice(-2, -1)[0];
          await deleteProofAndFile(fileId as string, proofId);
          Swal.fire("Deleted!", "The proof has been deleted.", "success");
          fetchProofs(); // Refetch the proofs after deletion
        } catch (error) {
          console.error("Error deleting proof:", error);
          Swal.fire("Error!", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (proofs.length === 0) {
      fetchProofs();
    }
  }, [proofs]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Submitted Proofs</h2>
      {loading ? (
        <p className="text-gray-400">Loading proofs...</p>
      ) : proofsList.length > 0 ? (
        <ul className="space-y-4">
          {proofsList.map((proof) => (
            <li key={proof.id}>
              <Card className="bg-gradient-to-r from-white to-gray-500">
                <CardHeader>
                  <CardTitle>{proof.description}</CardTitle>
                  <CardDescription>
                    Type:{" "}
                    {proof.type === "Duty" ? "Proof of Duty" : "Proof of Task"}
                  </CardDescription>
                  <CardDescription>
                    Status:{" "}
                    <Badge variant={proof.status}>
                      {statusDisplayMap[proof.status]}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {proof.fileUrl ? (
                    <a
                      href={proof.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block max-w-xs"
                    >
                      <img
                        src={proof.fileUrl}
                        alt="Proof"
                        className="w-full h-auto object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const nextSibling = e.currentTarget
                            .nextElementSibling as HTMLSpanElement;
                          if (nextSibling) {
                            nextSibling.style.display = "inline";
                          }
                        }}
                      />
                      <span className="text-blue-400 underline hidden">
                        View {proof.description}
                      </span>
                    </a>
                  ) : (
                    <p className="text-gray-400">No file available</p>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-md flex items-center"
                      onClick={() => handleDeleteProof(proof.id, proof.fileUrl)}
                    >
                      <AiOutlineDelete className="mr-0" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No proofs submitted yet.</p>
      )}
    </div>
  );
};

export default ProofList;
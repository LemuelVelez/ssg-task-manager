"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getProofs, deleteProofAndFile } from "@/lib/utils/appwrite"; // Import combined function

// Define the Proof interface
interface Proof {
  id: string;
  type: "Duty" | "Task";
  fileUrl: string; // Ensure this property is included
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Define the props for the ProofList component
interface ProofListProps {
  proofs: Proof[];
  onUpdateProofStatus: (
    id: string,
    status: "Pending" | "Approved" | "Rejected"
  ) => void;
}

// Define the ProofList component
const ProofList: React.FC<ProofListProps> = ({
  proofs,
  onUpdateProofStatus,
}) => {
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

  // Function to handle proof deletion
  const handleDeleteProof = async (proofId: string, fileUrl: string | null) => {
    if (!fileUrl) return;

    try {
      const fileId = fileUrl.split("/").slice(-2, -1)[0]; // Extract file ID from URL

      // Call the combined delete function for file and proof
      await deleteProofAndFile(fileId as string, proofId);
      console.log("Proof and file deleted successfully");

      // Refetch the proofs after deletion
      fetchProofs();
    } catch (error) {
      console.error("Error deleting proof:", error);
    }
  };

  useEffect(() => {
    if (proofs.length === 0) {
      fetchProofs();
    }
  }, [proofs]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Pending Proof Submissions</h2>
      {loading ? (
        <p className="text-gray-400">Loading proofs...</p>
      ) : proofsList.length > 0 ? (
        <ul className="space-y-4">
          {proofsList.map((proof) => (
            <li key={proof.id}>
              <Card className="bg-gradient-to-r from-white to-gray-200">
                <CardHeader>
                  <CardTitle>{proof.description}</CardTitle>
                  <CardDescription>
                    Type:{" "}
                    {proof.type === "Duty" ? "Proof of Duty" : "Proof of Task"}
                  </CardDescription>
                  <CardDescription>Status: {proof.status}</CardDescription>
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
                          // Fallback if the file is not an image
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
                    <button
                      className="bg-green-600 hover:bg-green-700 p-2 rounded-md"
                      onClick={() => {
                        onUpdateProofStatus(proof.id, "Approved");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-md"
                      onClick={() => {
                        onUpdateProofStatus(proof.id, "Rejected");
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-md"
                      onClick={() => handleDeleteProof(proof.id, proof.fileUrl)}
                    >
                      Delete
                    </button>
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

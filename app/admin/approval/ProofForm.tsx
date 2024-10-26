"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InputFile } from "@/components/ui/input"; // Import InputFile component
import React, { useRef, useState } from "react";
import {
  AiOutlineFileDone,
  AiOutlineMessage,
  AiOutlineSend,
} from "react-icons/ai";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import { createProofs, uploadProofFile } from "@/lib/utils/appwrite"; // Import Appwrite functions
import Swal from "sweetalert2"; // Import SweetAlert2

interface ProofFormProps {
  onAddProof: (
    file: File,
    type: "Duty" | "Task",
    description: string,
    status: "Pending" | "Approved" | "Rejected"
  ) => void;
}

const ProofForm: React.FC<ProofFormProps> = ({ onAddProof }) => {
  // State variables for the proof form
  const [newProofFile, setNewProofFile] = useState<File | null>(null);
  const [newProofType, setNewProofType] = useState<"Duty" | "Task">("Duty");
  const [newProofDescription, setNewProofDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for resetting file input

  // Handle file upload
  const handleProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProofFile(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!newProofFile) {
      await Swal.fire({
        icon: "warning",
        title: "File Required",
        text: "Please upload a file for proof submission.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (newProofDescription.trim() === "") {
      await Swal.fire({
        icon: "warning",
        title: "Description Required",
        text: "Please provide a description for the proof submission.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // Upload the file and get the URL
      const fileUrl = await uploadProofFile(newProofFile);

      // Generate a unique ID (could be generated in the uploadProofFile function or elsewhere)
      const proofId = `proof_${Date.now()}`; // Example: using timestamp for a unique ID

      // Prepare proof data with the file URL
      const proofData = {
        id: proofId, // Use generated unique ID
        type: newProofType,
        file: fileUrl,
        description: newProofDescription,
        status: "Pending" as const,
      };

      // Create the proof document
      const proofResponse = await createProofs(proofData);
      console.log("Proof created:", proofResponse);

      // Notify parent component
      onAddProof(newProofFile, newProofType, newProofDescription, "Pending");

      // Reset form fields
      setNewProofFile(null);
      setNewProofDescription("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Proof Submitted!",
        text: "Your proof has been submitted successfully.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to submit proof:", error);

      // Show error alert
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your proof. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg font-semibold mb-4">Submit Proof</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={newProofType}
          onValueChange={(value) => setNewProofType(value as "Duty" | "Task")}
        >
          <SelectTrigger className="w-full sm:w-auto p-2 bg-gray-700 rounded-md">
            <AiOutlineFileDone className="mr-2" />
            <SelectValue placeholder="Select proof type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Duty">Proof of Duty</SelectItem>
            <SelectItem value="Task">Proof of Task Completion</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <AiOutlineMessage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Textarea
            className="pl-10"
            placeholder="Proof description..."
            value={newProofDescription}
            onChange={(e) => setNewProofDescription(e.target.value)}
          />
        </div>

        <div className="relative flex-shrink">
          <InputFile ref={fileInputRef} onChange={handleProofUpload} />{" "}
          {/* File input */}
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md"
          onClick={handleSubmit}
        >
          <AiOutlineSend className="mr-1" />
          Submit Proof
        </Button>
      </div>
    </div>
  );
};

export default ProofForm;

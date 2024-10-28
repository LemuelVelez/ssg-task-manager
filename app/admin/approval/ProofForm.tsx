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
  const [newProofFile, setNewProofFile] = useState<File | null>(null);
  const [newProofType, setNewProofType] = useState<"Duty" | "Task">("Duty");
  const [newProofDescription, setNewProofDescription] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for submit button
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProofFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!newProofFile || newProofDescription.trim() === "") {
      await Swal.fire({
        icon: "warning",
        title: newProofFile ? "Description Required" : "File Required",
        text: newProofFile
          ? "Please provide a description for the proof submission."
          : "Please upload a file for proof submission.",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true); // Set loading to true when submission starts

    try {
      const fileUrl = await uploadProofFile(newProofFile);
      const proofId = `proof_${Date.now()}`;
      const proofData = {
        id: proofId,
        type: newProofType,
        file: fileUrl,
        description: newProofDescription,
        status: "Pending" as const,
      };

      const proofResponse = await createProofs(proofData);
      onAddProof(newProofFile, newProofType, newProofDescription, "Pending");

      setNewProofFile(null);
      setNewProofDescription("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await Swal.fire({
        icon: "success",
        title: "Proof Submitted!",
        text: "Your proof has been submitted successfully.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to submit proof:", error);
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your proof. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Reset loading state
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
          <InputFile ref={fileInputRef} onChange={handleProofUpload} />
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          <AiOutlineSend className="mr-1" />
          {loading ? "Submitting..." : "Submit Proof"} {/* Toggle text */}
        </Button>
      </div>
    </div>
  );
};

export default ProofForm;

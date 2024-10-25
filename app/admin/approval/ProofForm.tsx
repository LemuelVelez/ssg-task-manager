"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InputFile } from "@/components/ui/input"; // Import InputFile
import React, { useState } from "react";
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

interface ProofFormProps {
  onAddProof: (file: File, type: "duty" | "task", description: string) => void;
}

const ProofForm: React.FC<ProofFormProps> = ({ onAddProof }) => {
  const [newProofFile, setNewProofFile] = useState<File | null>(null);
  const [newProofType, setNewProofType] = useState("duty");
  const [newProofDescription, setNewProofDescription] = useState("");

  const handleProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProofFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!newProofFile || newProofDescription.trim() === "") return;
    onAddProof(
      newProofFile,
      newProofType as "duty" | "task",
      newProofDescription
    );
    setNewProofFile(null);
    setNewProofDescription("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg font-semibold mb-4">Submit Proof</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={newProofType} onValueChange={setNewProofType}>
          <SelectTrigger className="w-full sm:w-auto p-2 bg-gray-700 rounded-md">
            <AiOutlineFileDone className="mr-2" />
            <SelectValue placeholder="Select proof type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="duty">Proof of Duty</SelectItem>
            <SelectItem value="task">Proof of Task Completion</SelectItem>
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
          <InputFile onChange={handleProofUpload} /> {/* Updated file input */}
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

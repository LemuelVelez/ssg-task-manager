import React, { useState } from "react";

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
    onAddProof(newProofFile, newProofType as "duty" | "task", newProofDescription);
    setNewProofFile(null);
    setNewProofDescription("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg font-semibold mb-4">Submit Proof</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="p-2 bg-gray-700 rounded-md"
          value={newProofType}
          onChange={(e) => setNewProofType(e.target.value)}
        >
          <option value="duty">Proof of Duty</option>
          <option value="task">Proof of Task Completion</option>
        </select>
        <input
          type="file"
          className="p-2 bg-gray-700 rounded-md"
          onChange={handleProofUpload}
        />
        <input
          type="text"
          className="p-2 bg-gray-700 rounded-md flex-1"
          placeholder="Proof description..."
          value={newProofDescription}
          onChange={(e) => setNewProofDescription(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md" onClick={handleSubmit}>
          Submit Proof
        </button>
      </div>
    </div>
  );
};

export default ProofForm;

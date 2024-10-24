import React from "react";

interface Proof {
  id: number;
  type: "duty" | "task";
  file: File;
  description: string;
  status: "pending" | "approved" | "rejected";
}

interface ProofListProps {
  proofs: Proof[];
  onUpdateProofStatus: (id: number, status: "approved" | "rejected") => void;
}

const ProofList: React.FC<ProofListProps> = ({ proofs, onUpdateProofStatus }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-4">Pending Proof Submissions</h2>
    {proofs.length > 0 ? (
      <ul className="space-y-4">
        {proofs.map((proof) => (
          <li key={proof.id} className="p-4 bg-gray-700 rounded-md">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="font-medium">{proof.description}</p>
                <p className="text-sm text-gray-400">
                  Type: {proof.type === "duty" ? "Proof of Duty" : "Proof of Task"}
                </p>
                <p className="text-sm text-gray-400">Status: {proof.status}</p>
              </div>
              {proof.file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(proof.file)}
                  alt="Proof"
                  className="max-w-xs max-h-48 object-cover rounded-md"
                />
              ) : (
                <a
                  href={URL.createObjectURL(proof.file)}
                  download={proof.file.name}
                  className="text-blue-400 underline"
                >
                  Download {proof.file.name}
                </a>
              )}
              <div className="flex gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 p-2 rounded-md"
                  onClick={() => onUpdateProofStatus(proof.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-md"
                  onClick={() => onUpdateProofStatus(proof.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-400">No proofs submitted yet.</p>
    )}
  </div>
);

export default ProofList;

import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

const proofs = [
  { id: 1, name: "John Doe", proofType: "Selfie", submittedAt: "2024-10-15" },
  { id: 2, name: "Jane Smith", proofType: "Document", submittedAt: "2024-10-16" },
];

const PendingProofs = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Pending Proof Approvals</h2>
      <div className="grid grid-cols-1 gap-4">
        {proofs.map((proof) => (
          <div key={proof.id} className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">
                  {proof.name} - {proof.proofType}
                </h3>
                <p className="text-gray-600">Submitted: {proof.submittedAt}</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-green-500 text-white p-2 rounded">
                  <FiCheck />
                </button>
                <button className="bg-red-500 text-white p-2 rounded">
                  <FiX />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingProofs;

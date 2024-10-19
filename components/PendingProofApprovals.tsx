import React from "react";

const PendingProofApprovals = () => {
  const proofs = [
    {
      id: 1,
      member: "John Doe",
      image: "/path/to/selfie.jpg",
      submittedOn: "Oct 18, 2024",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {proofs.map((proof) => (
        <div
          key={proof.id}
          className="bg-gray-900 text-white shadow-lg p-4 rounded-lg"
        >
          <h3 className="font-semibold text-white">Member: {proof.member}</h3>
          <p className="text-gray-400">Submitted On: {proof.submittedOn}</p>
          <img
            src={proof.image}
            alt="Selfie proof"
            className="h-40 w-40 object-cover border border-gray-700 rounded-md"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md">
              Approve
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingProofApprovals;

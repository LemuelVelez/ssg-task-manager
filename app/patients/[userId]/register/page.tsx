import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import React from "react";
import { getUser } from "@/lib/actions/patient.actions"; // Ensure you replace this with your user fetching logic if needed

const Register = async () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="SSG Logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />
          <p className="copyright py-12">© 2024 SSG Task Management</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Registration"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

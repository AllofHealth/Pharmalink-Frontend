"use client";
import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import type { VerificationDocuments } from "@/lib/types";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

export default function Verification() {
  const [verificationDocuments, setVerificationDocuments] = useState({
    identificationCard: "",
    medicalLicensce: "",
  });

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof VerificationDocuments
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerificationDocuments((prevDocs) => ({
        ...prevDocs,
        [field]: file.name,
      }));
    }
  };

  return (
    <div className="flex">
      <Image
        src="/assets/images/blockchain-signup-bg.png"
        alt="Doctor using glasses in the lab"
        width={630}
        height={1021}
        className="h-screen object-cover object-top hidden xl:block"
      />
      <section className="min-h-screen my-10 xl:my-0 max-w-[80vw] mx-auto xl:min-w-auto flex flex-col justify-center items-center flex-1">
        <Icon name="AllofHealthLogo" />
        <div className="flex flex-col">
          <h2 className="text-text-black1 text-[1.6rem] sm:text-[2rem] text-center font-medium mb-2">
            VERIFY YOUR IDENTITY
          </h2>
          <p className="text-xs xl:text-base font-normal text-center max-w-[460px] mb-8">
            Kindly add images of your national identification document and
            medical license
          </p>

          <label className="mb-2">Identification card</label>
          <div className="relative border-2 border-dashed bg-[#F8F8FF] border-blue2 rounded-lg p-4 mb-4 text-center cursor-pointer ">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, "identificationCard")}
            />
            {verificationDocuments.identificationCard ? (
              <p className="text-sm text-green-600">
                {verificationDocuments.identificationCard} Uploaded
              </p>
            ) : (
              <div className="my-4">
                <Icon name="Upload" className="mx-auto" />
                <p>Drag & drop files or Browse</p>
                <p>
                  Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
              </div>
            )}
          </div>

          <label className="mb-2">Medical Licensce</label>
          <div className="relative border-2 border-dashed bg-[#F8F8FF] border-blue2 rounded-lg p-4 mb-4 text-center cursor-pointer ">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, "identificationCard")}
            />
            {verificationDocuments.medicalLicensce ? (
              <p className="text-sm text-green-600">
                {verificationDocuments.medicalLicensce} Uploaded
              </p>
            ) : (
              <div className="my-4">
                <Icon name="Upload" className="mx-auto" />
                <p>Drag & drop files or Browse</p>
                <p>
                  Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
              </div>
            )}
          </div>
          <Button
            variant="secondary"
            type="submit"
            className="w-full rounded-[40px] h-14 justify-center text-xl font-normal mt-8"
          >
            {"Register"}
          </Button>
        </div>
      </section>
    </div>
  );
}

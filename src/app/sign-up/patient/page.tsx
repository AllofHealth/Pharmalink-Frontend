'use client';

import addPatient from '@/actions/contract/patient/patient.service.c';
import { Icon } from '@/components/icon/Icon';
import PatientSignUpForm from '@/page_components/patientSignUp/patientSignUpForm';
import Image from 'next/image';

export default function HealthProfessionalSignUp() {
  const testSignUp = async () => {
    const result = await addPatient();
    //This returns an id which will be passed to the database when calling the function
    console.log(Number(result.patientId));
  };
  const handleTestSignUp = () => {
    testSignUp()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex">
      <Image
        src="/assets/images/blockchain-signup-bg.png"
        alt="Doctor using glasses in the lab"
        width={630}
        height={1021}
        className="min-h-screen object-cover object-top hidden xl:block"
      />
      <section className="min-h-screen xl:min-w-auto flex flex-col justify-center items-center flex-1">
        <Icon name="AllofHealthLogo" />
        <div>
          <h2 className="text-text-black1 text-[2rem] text-center font-medium mb-2">
            Create an account
          </h2>
          <p className="text-base font-normal text-center max-w-[460px] mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus
          </p>
          {/**Demo signup button */}
          <button
            onClick={handleTestSignUp}
            className="w-80 xl:w-96 rounded-xl bg-primary-500 text-blue-500 font-medium"
          >
            Sign up test
          </button>
          <PatientSignUpForm />
        </div>
      </section>
    </div>
  );
}

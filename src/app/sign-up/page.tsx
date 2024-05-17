"use client";
import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function SignUp() {
  const router = useRouter();
  const { isConnected } = useAccount();

  const signUp = () => {
    if (isConnected) {
      // Redirect to a different page if a wallet is connected
      router.push("/sign-up/user");
    }
  };

  // useEffect(() => {
  //   if (isConnected) {
  //     // Redirect to a different page if a wallet is connected
  //     router.push("/sign-up/user");
  //   }
  // }, [isConnected, router]);

  return (
    <div className="flex">
      <Image
        src="/assets/images/blockchain-signup-bg.png"
        alt="Doctor using glasses in the lab"
        width={630}
        height={1021}
        className="h-screen object-cover object-top hidden xl:block"
      />
      <section className="min-h-screen xl:min-w-auto flex flex-col justify-center items-center flex-1">
        <Icon name="AllofHealthLogo" />
        <div>
          <h2 className="text-text-black1 text-[2rem] text-center font-medium mb-10">
            Sign up
          </h2>
          <div className="flex gap-10 flex-col">
            {/* <Button variant="primary" className="w-80 xl:w-96 rounded-xl">
              <Icon name="Near" />
              Sign Up with NEAR Blockchain
            </Button>
            <Button variant="primary" className="w-80 xl:w-96 rounded-xl">
              <Icon name="Metamask" />
              Sign Up with Metamask
            </Button> */}
            <ConnectButton />
            <Button
              variant="primary"
              className="rounded-xl text-center justify-self-center w-max mx-auto"
              onClick={() => signUp()}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

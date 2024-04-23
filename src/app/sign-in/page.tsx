"use client";
import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const { open } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      toast.success("Connected Wallet Succesfully");
      router.push("/sign-in/user");
    }
  }, [isConnected, router]);
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
            Sign in
          </h2>
          <div className="flex gap-10 flex-col">
            {/* <Button variant="primary" className="w-80 xl:w-96 rounded-xl">
              <Icon name="Near" />
              Sign in with NEAR Blockchain
            </Button> */}
            <Button
              variant="primary"
              className="w-80 xl:w-96 rounded-xl"
              onClick={() => open()}
            >
              <Icon name="Metamask" />
              Sign in with Metamask
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

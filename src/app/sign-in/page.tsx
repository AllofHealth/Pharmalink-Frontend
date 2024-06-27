"use client";
import { Icon } from "@/components/icon/Icon";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";

export default function SignIn() {
  const router = useRouter();
  const { isConnected } = useAccount();

  const signIn = () => {
    if (isConnected) {
      router.push("/sign-in/user");
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
            <ConnectButton />
            <Button
              variant="primary"
              className="rounded-xl text-center justify-self-center w-max mx-auto"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

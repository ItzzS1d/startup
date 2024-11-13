import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { signIn, signOut } from "@/auth";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();
  
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-word-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5">
          {session && session.user ? (
            <div className="flex items-center gap-5">
              <Link href={"/startup/create"}>Create</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button className="bg-red-500">Logout</Button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Image
                  src={session?.user.image as string}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user"
                />
              </Link>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Button type="submit" className="px-5">
                Signin
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

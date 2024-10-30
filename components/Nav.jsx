"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setDropDown] = useState(false);

  useEffect(() => {
    const UseProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    UseProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>

      {session?.user ? (
        <>
          <div className="sm:flex hidden">
            <div className="flex gap-3 md:gap-5">
              <Link href="create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" className="outline_btn" onClick={signOut}>
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="logo"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
          <div className="sm:hidden flex relative">
            <div className="flex">
              <Image
                src={session?.user.image}
                alt="logo"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setDropDown((prev) => !prev)}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    className="dropdown_link"
                    href="/profile"
                    onClick={() => setDropDown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    className="dropdown_link"
                    href="/create-post"
                    onClick={() => setDropDown(false)}
                  >
                    Create Post
                  </Link>
                  <button
                    className="black_btn mt-5 w-full"
                    type="button"
                    onClick={() => {
                      setDropDown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                className="black_btn"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </nav>
  );
};

export default Nav;

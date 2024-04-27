"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  console.log(isLoading);
  
  return (
    <div className="max-w-3xl space-y-4 sm:text-5xl md:text-6xl font-bold">
      <h1>
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Dotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Dotion is the connected workspace where <br />
        better, faster work happens
      </h3>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size="sm">
            Get Dotion Free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

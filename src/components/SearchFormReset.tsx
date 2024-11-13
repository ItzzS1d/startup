'use client'
import React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <Button type="reset" onClick={reset} className="search-btn text-white">
      <X className="size-5" />
    </Button>
  );
};

export default SearchFormReset;

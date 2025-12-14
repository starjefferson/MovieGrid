"use client"
import { useState } from "react";
import NavBar from "./NavBar";
import ScrollLinked from "./ScrollLinked";

export default function ClientWrapper() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <NavBar setSearchResults={setSearchResults} />
      <ScrollLinked searchResults={searchResults} />
    </>
  );
}

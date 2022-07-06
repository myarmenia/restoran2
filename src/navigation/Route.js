import React from "react";
import { AutoStack } from "./AutoStack";
import { SummaryNavigation } from "./SummaryNavigation";
import { useSelector } from "react-redux";

const Route = () => {
  const { auth } = useSelector(({ auth }) => auth);

  return !auth ? <SummaryNavigation /> : <AutoStack />;
};

export default Route;

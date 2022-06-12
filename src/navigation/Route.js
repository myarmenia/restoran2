import React, { useState } from "react";
import { AutoStack } from "./AutoStack";
import { SummaryNavigation } from "../navigation/SummaryNavigation";
import { useSelector } from "react-redux";

const Route = () => {
  const { auth } = useSelector(({ auth }) => auth);

  return auth ? <SummaryNavigation /> : <AutoStack />;
};

export default Route;

import { T_Resume } from "@/types/resumeInfos";
import { Dispatch, SetStateAction } from "react";

const EndScreen = ({
  data,
  setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  return <div className="h-svh bg-amber-200">EndScreen</div>;
};

export default EndScreen;

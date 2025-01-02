import { useContext } from "react";
import { profileContext } from "../contexts/ProfileContext";

function useProfile() {
  const context = useContext(profileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileContext");
  return context;
}

export default useProfile;

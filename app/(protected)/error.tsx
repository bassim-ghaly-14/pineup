"use client";
import { AppState } from "@/components/common/app-state";
export default function Error({
 error,
 reset,
}:{
 error: Error;
 reset:()=>void;
}){
return (
 <AppState
  type="error"
  title="Something went wrong"
  description={error.message}
 />
);
}
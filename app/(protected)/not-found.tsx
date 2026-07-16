import { AppState } from "src/components/common/app-state";
export default function NotFound(){
 return (
   <AppState
    type="404"
    title="Page Not Found"
    description="The page you are looking for doesn't exist or was moved."
   />
 );
}
import { useState } from "react";

import Stack from "@mui/material/Stack";
import { CreateUserForm } from "../components/create-user-form";
import { RetrieveUserForm } from "../components/retrieve-user-form";

export const HomePage = () => {

   const [formDisplay, setFormDisplay] = useState<boolean>(true);

   const showForm = (): void => {
      setFormDisplay(prev => !prev);
   }

   return (
      <Stack alignItems='center' >
         {formDisplay
            ? <RetrieveUserForm onToggleForm={() => showForm()} />
            : <CreateUserForm onToggleForm={() => showForm()} />
         }
      </Stack>
   );
}
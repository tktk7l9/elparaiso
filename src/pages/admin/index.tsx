import { Auth, Button, IconLogOut } from "@supabase/ui";
import type { ReactNode } from "react";
import React from "react";
import { Headline } from "src/components/Headline";
import { client } from "src/libs/supabase";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();

  if (user) {
    return (
      <>
        <div className="flex justify-end mx-2 my-4">
          <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => client.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </>
    );
  }
  return <>{props.children}</>;
};

const Admin = () => {
  return (
    <Auth.UserContextProvider supabaseClient={client}>
      <Container>
        <Headline />
        <div className="flex justify-center pt-8">
          <div className="w-full sm:w-96">
            <Auth
              supabaseClient={client}
              providers={["github", "google"]}
              socialColors={true}
            />
          </div>
        </div>
      </Container>
    </Auth.UserContextProvider>
  );
};

export default Admin;

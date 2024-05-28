import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.action";

export function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getLinkToken() {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    }

    getLinkToken();
  }, []);

  function onSuccess() {
    return useCallback<PlaidLinkOnSuccess>(
      async (public_token: string) => {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push("/");
      },
      [user],
    );
  }

  const config: PlaidLinkOptions = {
    token: token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </div>
  );
}

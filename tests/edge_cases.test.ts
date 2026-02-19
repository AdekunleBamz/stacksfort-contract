
import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;

describe("Edge Cases", () => {
    it("should fail when initializing twice", () => {
        const signers = [Cl.principal(deployer)];
        const threshold = Cl.uint(1);

        // First initialization
        const result1 = simnet.callPublicFn(
            "multisig",
            "initialize",
            [Cl.list(signers), threshold],
            deployer
        );
        expect(result1.result).toBeOk(Cl.bool(true));

        // Second initialization
        const result2 = simnet.callPublicFn(
            "multisig",
            "initialize",
            [Cl.list(signers), threshold],
            deployer
        );
        // ERR_ALREADY_INITIALIZED (u2)
        expect(result2.result).toBeErr(Cl.uint(2));
    });
});

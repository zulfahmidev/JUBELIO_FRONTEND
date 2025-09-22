import { Suspense } from "react";
import AdjustmentTransaction from "./adjustment-transaction";

export default function ATPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdjustmentTransaction />
        </Suspense>
    );
}

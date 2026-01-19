import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import { RiSparklingFill } from "react-icons/ri";

const features = {
  free: ["Up to 3 resumes", "10 AI credits", "All templates", "Basic export"],
  premium: [
    "Unlimited resumes",
    "Unlimited AI credits",
    "All templates",
    "Priority improvements",
  ],
};

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SubscribePage() {
  const yearlyTotal = 9 * 12;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <RiSparklingFill className="h-3.5 w-3.5 text-primary" />
            Upgrade anytime
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Choose your plan
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Free for starters. Premium for unlimited resumes and AI.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Free */}
          <div className="rounded-xl  bg-background p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Free</div>
                <div className="mt-1 text-3xl font-bold">$0</div>
                <div className="text-xs text-muted-foreground">Forever</div>
              </div>
            </div>
            <FeatureList items={features.free} />
            <div className="mt-6">
              <Button asChild className="w-full bg-muted text-foreground">
                <Link href="/app/resumes">Continue with Free</Link>
              </Button>
            </div>
          </div>

          {/* Premium Monthly */}
          <div className="rounded-xl  bg-background p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  Premium
                </div>
                <div className="mt-1 text-3xl font-bold">$19</div>
                <div className="text-xs text-muted-foreground">per month</div>
              </div>
            <div className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                Monthly
              </div>
            </div>
            <FeatureList items={features.premium} />
            <div className="mt-6">
              <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-500/90">
                Upgrade Monthly
              </Button>
            </div>
          </div>

          {/* Premium Yearly */}
          <div className="rounded-xl  bg-background p-6 ring-3 ring-primary/20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  Premium
                </div>
                <div className="mt-1 text-3xl font-bold">${yearlyTotal}</div>
                <div className="text-xs text-muted-foreground">
                  yearly ({"$9/mo"} billed annually)
                </div>
              </div>
              <div className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                Best value
              </div>
            </div>
            <FeatureList items={features.premium} />
            <div className="mt-6">
              <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-500/90">
                Upgrade Yearly
              </Button>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

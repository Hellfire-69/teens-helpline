import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <OnboardingFlow />
      {children}
    </DashboardLayout>
  );
}

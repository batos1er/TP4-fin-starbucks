import { ReactNode } from "react";
import { Card, SectionContainer, ZodI18nProvider } from "tp-kit/components";


export default async function Layout({ children }: { children: ReactNode }) {
  

  return (
    <SectionContainer>
        <Card className="w-full max-w-md mx-auto my-24">
            <ZodI18nProvider>
                {children}
            </ZodI18nProvider>
        </Card>
    </SectionContainer>
  );
}

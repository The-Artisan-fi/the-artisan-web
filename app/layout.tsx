import './global.css';
import { Suspense } from 'react';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import ApolloWrapper from "@/components/apollo/apollo-provider";
import { AuthProvider } from '@/components/apollo/auth-context-provider';
import ThemeProvider from '@/hooks/use-theme';
import fontVariables from '@/utils/fonts';
import { LoadingFeature } from '@/components/loading/loading-feature';
export const metadata = {
  title: 'Artsn.fi',
  description: 'The Artisan Protocol',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Counter Program', path: '/counter' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${fontVariables} bg-bg`}>
        <Suspense fallback={<LoadingFeature />}>
          <ReactQueryProvider>
            <ClusterProvider>
              <SolanaProvider>
                <ApolloWrapper>
                  <AuthProvider>
                    <ThemeProvider>
                      <div className="max-w-full overflow-x-hidden">
                        <UiLayout links={links}>{children}</UiLayout>
                      </div>
                    </ThemeProvider>
                  </AuthProvider>
                </ApolloWrapper>
              </SolanaProvider>
            </ClusterProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
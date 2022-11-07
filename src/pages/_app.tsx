import { AppProps, type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";

// import { ReactNode } from 'react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      
      <main>{children}</main>
    </>
  );
};

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = (({ Component, pageProps }:AppPropsWithLayout) => {
  // return <Component {...pageProps} />;
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default trpc.withTRPC(MyApp);

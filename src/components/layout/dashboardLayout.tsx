import { PropsWithChildren } from 'hono/jsx'

interface Props {
  title: string
}


const DashboardLayout  = ({ title , children }: PropsWithChildren<Props>) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default DashboardLayout
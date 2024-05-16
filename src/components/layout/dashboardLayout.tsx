import { PropsWithChildren } from 'hono/jsx'



interface SiteData {
  title: string
  description?: string
  image?: string
  children?: any
}

const DashboardLayout  = ({ title ,description,  children }: PropsWithChildren<SiteData>) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
        <script src="//unpkg.com/alpinejs" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default DashboardLayout
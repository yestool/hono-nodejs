import FrontLayout  from '@/components/layout/frontLayout';
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod';
import { getCookie, setCookie } from 'hono/cookie';
import DashboardLayout from '@/components/layout/dashboardLayout';
import { Post } from '@/types/post';
import PostList from '@/components/postlist';




const app = new Hono()

app.get("/", (c) => {
  const sessionCookie = getCookie(c, 'sessionCookie')

  console.log(sessionCookie)
  if (sessionCookie) {
    const posts: Post[] = [
      { id: '1', title: 'Good Morning', body: 'Let us eat breakfast' },
      { id: '2', title: 'Good Afternoon', body: 'Let us eat Lunch' },
      { id: '3', title: 'Good Evening', body: 'Let us eat Dinner' },
      { id: '4', title: 'Good Night', body: 'Let us drink Beer' },
      { id: '5', title: 'こんにちは', body: '昼からビールを飲みます' }
    ]
    return c.html(
      <DashboardLayout title="Dashboard">
        <h1>Dashboard</h1>
        <form method="POST" action="/logout">
          <button>logout</button>
        </form>
        <hr />
        <PostList posts={posts} />
      </DashboardLayout>,
    );
  } else {
    
    return c.html(
      <FrontLayout title="Dashboard">
        <a href="/login">login</a>
      </FrontLayout>,
    );
  }
})


app.get("/login", (c) => {
  return c.html(
    <FrontLayout title='Login'>
      <form method="POST">
        <input name="email" autocomplete="off" />
        <input name="password" />
        <button>login</button>
      </form>
    </FrontLayout>,
  );
});


app.post(
  "/login",
  zValidator(
    "form",
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }),
  ),
  async (c) => {
    const { email, password } = c.req.valid("form");
    if (!email || !password) {
      return c.body("Invalid email or password", 400);
    }
    if (email !== "hono@gmail.com" || password !== "hono") {
      return c.body("Invalid email or password", 400);
    }
  
    const sessionCookie = 'sessionCookie11111111111111111111111111111';
    setCookie(c, 'sessionCookie', sessionCookie)
    return c.redirect("/dashboard");
  },
);


app.get("/dashboard", async (c) => {
  const sessionCookie = getCookie(c, 'sessionCookie')
  if (!sessionCookie) {
    return c.redirect("/login");
  }
  const posts: Post[] = [
    { id: '1', title: 'Good Morning', body: 'Let us eat breakfast' },
    { id: '2', title: 'Good Afternoon', body: 'Let us eat Lunch' },
    { id: '3', title: 'Good Evening', body: 'Let us eat Dinner' },
    { id: '4', title: 'Good Night', body: 'Let us drink Beer' },
    { id: '5', title: 'こんにちは', body: '昼からビールを飲みます' }
  ]
  return c.html(
    <DashboardLayout title="Dashboard">
      <h1>Dashboard</h1>
      <form method="POST" action="/logout">
        <button>logout</button>
      </form>
      <hr />
      <PostList posts={posts} />
    </DashboardLayout>,
  );
});



app.post("/logout", async (c) => {
  const sessionCookie = '';
  setCookie(c, 'sessionCookie', sessionCookie)
  return c.redirect("/");
});

export default app

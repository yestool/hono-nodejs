import { FC } from 'hono/jsx'
import { Post } from '../../types/post';
import DashboardLayout from '../layout/dashboardLayout';

import { html } from 'hono/html'


interface Props {
  posts: Post[]
}

const Footer = ({ posts }: Props) => html`
  <div x-data="{ open: false }">
    <button @click="open = !open">Expand</button>
    <span x-show="open">
        Content...
    </span>
  </div>

  <!-- list posts -->

  <div>
    <h2>Posts List in hono html Helper </h2>
    <ul style="list-style: none; padding: 0; margin: 0; ">
      ${posts.map((post) => html`<li>${post.title}</li>`)}
    </ul>
  </div>
`


const PostList: FC<Props> = ({ posts }: Props) => {
  return (
    <DashboardLayout title={'Posts'}>
      <main>
        <h2>Posts</h2>
        <ul class="posts" style="list-style: none; padding: 0; margin: 0; ">
          {posts.map((post) => (
            <div>{post.title}</div>
          ))}
        </ul>
        <Footer posts={posts} />
      </main>
    </DashboardLayout>
  )
}

export default PostList
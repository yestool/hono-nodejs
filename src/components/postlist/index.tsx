import { FC } from 'hono/jsx'
import { Post } from '../../types/post';
import DashboardLayout from '../layout/dashboardLayout';

import { html } from 'hono/html'


interface Props {
  posts: Post[]
}

// const AlpineWidget = () => (
//   <div dangerouslySetInnerHTML={{__html: alpineTemplate}} />
// );

const Footer = () => html`
  <div x-data="{ open: false }">
    <button @click="open = !open">Expand</button>
    <span x-show="open">
        Content...
    </span>
  </div>
`


const PostList: FC<Props> = ({ posts }: Props) => {
  return (
    <DashboardLayout title={'Posts'}>
      <main>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <div>{post.title}</div>
          ))}
        </ul>
        <Footer />
      </main>
    </DashboardLayout>
  )
}

export default PostList
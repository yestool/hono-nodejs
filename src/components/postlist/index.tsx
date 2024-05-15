import { FC } from 'hono/jsx'
import { Post } from '../../types/post';
import DashboardLayout from '../layout/dashboardLayout';




interface Props {
  posts: Post[]
}

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
      </main>
    </DashboardLayout>
  )
}

export default PostList
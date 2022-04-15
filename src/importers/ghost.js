
export default function extract (DB) {
  const tags = DB.db[0].data.tags.reduce((acc, i) => {
    acc[i.id] = i
    return acc
  }, {})
  const postTags = DB.db[0].data.posts_tags

  function _getTags(post) {
    const connection = postTags.filter(i => i.post_id === post.id)
    return connection.sort((a, b) => {
      return a.order > b.order
    }).map(i => {
      return tags[i.tag_id].slug
    }).join(',')
  }

  function isWanted (post) {
    return post.page === 0
  }

  const finalPosts = DB.db[0].data.posts.filter(i => isWanted(i)).map(i => {
    const p = Object.assign({
      content: i.mobiledoc,
      image: i.feature_image,
      perex: i.custom_excerpt || i.title,
      tags: _getTags(i),
      author: DB.db[0].data.users.find(j => j.id === i.author_id).slug,
      published: i.published_at,
      created: i.created_at
    }, _.pick(i, ['uuid', 'title', 'slug', 'status']))
    return p
  })

  return { posts: finalPosts, tags }

  // DB.db[0].data.posts.filter(i => i.page === 1).map(i => {
  //   const filename = path.join(__dirname, i.slug + '.yaml')
  //   const content = {
  //     updated: i.published_at
  //   }
  //   fs.writeFileSync(filename, content, 'utf-8')
  // })
}
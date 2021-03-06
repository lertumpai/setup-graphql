import {
  ArticleAction,
  Article,
  CommentAction,
  Comment,
} from '../../database/mongo'

module.exports = {
  Mutation: {
    async articleAction(_, { id, action }, { user }) {
      await ArticleAction.update({ authorId: user.id, articleId: id, action })
      return Article.findById(id)
    },
    async commentAction(_, { id, action }, { user }) {
      await CommentAction.update({ authorId: user.id, commentId: id, action })
      return Comment.findById(id)
    },
  },
  Action: {
    __resolveType({ articleId, commentId }){
      if (articleId) {
        return 'ArticleAction'
      }
      if (commentId) {
        return 'CommentAction'
      }

      return null
    },
  },
}

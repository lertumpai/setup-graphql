import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Mutation {
    articleAction(articleId: MID!, action: ActionEnum!): Action
    commentAction(commentId: MID!, action: ActionEnum!): Action
  }
  interface Action {
    authorId: MID!
    action: ActionEnum!
  }
  type ArticleAction implements Action {
    articleId: MID!
    authorId: MID!
    action: ActionEnum!
  }
  type CommentAction implements Action  {
    commentId: MID!
    authorId: MID!
    action: ActionEnum!
  }
  enum ActionEnum {
    like
    unlike
  }
`

module.exports = typeDefs
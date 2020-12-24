import mongoose from 'mongoose'
import Dao from '../dao'

const ArticleSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
  content: { type: String, require: true },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  active: { type: Boolean, default: true },
})

ArticleSchema.index({ active: 1, createdAt: -1 })
ArticleSchema.index({ active: 1, author: 1, createdAt: -1 })

const Article = mongoose.model('Article', ArticleSchema)

export default class ArticleClass extends Dao {
  constructor() {
    super(Article)
  }

  create({ author, content, date }) {
    return Article.create({ author, content, createdAt: date, updatedAt: date })
  }

  findAll({ author, active = true }, { after, before, limit = 10 }) {
    let filter = { active }

    if (author) {
      filter = { ...filter, author }
    }

    return this.queryAfterBeforeLimit(filter, { after, before, limit, sortBy: 'createdAt' })
  }

  async update(id, { content, date }) {
    await this.clear(id)
    return Article.findOneAndUpdate({ _id: id }, { content, updatedAt: date }, { new: true })
  }
}

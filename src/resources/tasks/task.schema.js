const { Schema, Types } = require('mongoose');

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    order: Number,
    description: String,
    userId: Types.ObjectId,
    boardId: Types.ObjectId,
    columnId: Types.ObjectId
  },
  {
    collection: 'tasks',
    versionKey: false
  }
);

module.exports = {
  taskSchema
};

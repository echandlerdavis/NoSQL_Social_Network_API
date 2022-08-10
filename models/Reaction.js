const { Schema, model } = require('mongoose');
//might not need model;


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true,
            max: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method?
        }

    },
    {
    toJSON: {
      getters: true,
    },
    id: false,
  });

  module.exports = reactionSchema;
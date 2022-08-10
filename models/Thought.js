const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            //getter method to format the timestamp query?
        },
        username: {
            type:String,
            required:true,
            //is this automatically connected to the user?
        },
        reactions: [reactionSchema],

    },
    {
        toJSON: {
          getters: true,
        },
      }
);

//id false?

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
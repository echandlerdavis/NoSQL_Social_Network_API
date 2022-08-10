const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique:true,
            required: true, 
            trim:true,
        },
        email: {
            type: String,
            unique:true, 
            required:true,
            validate: {
                validator: function(v){
                    let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
                    return re.test(email)
                }, 
                message: props => `${props.value} is not a valid email address`
            }, 
            match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Please add a valid email address']
            // figure out how to validate email adress.  
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]

    },
    {
    toJSON: {
      getters: true,
    },
    }
)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', userSchema);

// const handleError = (err) => console.error(err);


module.exports = User;
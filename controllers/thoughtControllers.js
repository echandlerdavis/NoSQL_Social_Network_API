const { Thought } = require('../models');

module.exports = {
    //Get all thoughts
    getThoughts(req, res){
        thought.find()
        .then(thought => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    //Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({thought})
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        thought.create(req.body)
        .then((dbthoughtData) => res.json(dbthoughtData)) 
        .catch((err) => res.status(500).json(err));
    },
    //Updates thought
    updateThought(req, res) {
        thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // Delete a thought and associated thoughts
  deleteThought(req, res) {
    thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : thought.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() => res.json({ message: 'thought and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res){Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    //can also do $push:
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));

  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }}
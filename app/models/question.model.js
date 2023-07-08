module.exports = (mongoose) => {
  var schema = mongoose.Schema({
 
    id2:Number,
    type: String,
    courses: String,
    subject: String,
    systems: String,
    topic: String,
    totalPoint: { type: Number, default: 0 },
    question: [Object, { timestamps: true }],
  });
  schema.method('toJSON', function () {
    const { __v, _id, createdAt, ...object } = this.toObject();
    object.id = _id;
    return object;
  });



  const Question = mongoose.model('questions', schema);
  return Question;
};

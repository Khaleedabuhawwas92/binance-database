module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      price: Number,
      name: String,
      published: Boolean,
    
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, createdAt, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  const Courses = mongoose.model('courses', schema);
  return Courses;
};

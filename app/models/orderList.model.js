module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      userName: String,
      userEmail: String,
      userID: String,
      courseName: String,
      price: Number,
      numberPhone: String,
      discrption: String,
      date: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, createdAt, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model('order', schema);
  return Order;
};

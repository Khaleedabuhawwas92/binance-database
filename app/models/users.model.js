const jwt = require('jsonwebtoken');
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      password: { type: String, required: true, trim: true },
      isSuperAdmain: Boolean,
      isAdmain: Boolean,
      myCourses: Array,
      previousQuiz: [Object],
      noteQuiz: [Object],
      resetQuiz: [{ type: Number }],
      flashCard: [Object],
      Omitted: [Object],
      Incorrect: [Object],
      correct: [Object],
      Mark: [Object],
      unused: [Object],
      allMyQustion: [Object],
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  //   schema.method('token', function () {
  //     const token = jwt.sign(
  //       { _id: this._id, isAdmain: this.isAdmain },
  //       'privet'
  //     );
  //     return token;
  //   });

  const Users = mongoose.model('users', schema);
  return Users;
};

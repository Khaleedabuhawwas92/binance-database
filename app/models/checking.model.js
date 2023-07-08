module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         name: String,
         spreads: Number,

      },
      { timestamps: true }
   );

   schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Checking = mongoose.model("checking", schema);
   return Checking;
};

module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         title: { type: String }, // Ensure uniqueness of the email field,
         spreads: { type: Number },
      },
      { timestamps: true }
   );

   schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Tutorial = mongoose.model("symbols", schema);
   return Tutorial;
};

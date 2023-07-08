module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         title: String,
         start: Date,
         end: Date,
         className: String,
         url: String,
         allDay: Boolean,
         published:Boolean,
      },
      { timestamps: true }
   );

   schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Myquizes = mongoose.model("myquizes", schema);
   return Myquizes;
};

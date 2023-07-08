module.exports = (mongoose) => {
   var dateFormat = require("dateformat");
   var schema = mongoose.Schema(
      {
         amount: Number,
         discrption: String,
         published: Boolean,
      },
      { timestamps: true },
      
   );

   schema.method("toJSON", function () {
      const { __v, _id, createdAt, ...object } = this.toObject();
      object.createdAt = dateFormat(createdAt, "yyyy-mm-dd-HH:MM TT");
      object.id = _id;

      return object;
   });

   schema.pre("validate", () => console.log("validate"));
   schema.pre("save", () => console.log("Hello from pre save"));
   const Cash = mongoose.model("dailyCash", schema);
   return Cash;
};

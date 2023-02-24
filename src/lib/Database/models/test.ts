import { Schema, Types, model } from "mongoose";

interface Test {
    _id: Types.ObjectId;
    test: string;
}

const testSchema = new Schema<Test>({
    test: String,
});

const testModel = model<Test>("test", testSchema);

export default testModel;

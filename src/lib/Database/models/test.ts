import mongoose from "mongoose";

interface Test {
    test: string;
}

const testSchema = new mongoose.Schema<Test>({
    test: String,
});

const testModel = mongoose.model<Test>("test", testSchema);

export default testModel;

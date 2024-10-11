import mongoose, { Document, Schema } from "mongoose";

interface IBeneficiary {
  name: string;
  idNumber: string;
}
export interface IProvider extends Document {
  nit: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  providerType: string;
  personType: string;
  beneficiaries: IBeneficiary[];
  bankDetails: {
    bank: string;
    accountNumber: string;
    accountType: string;
  };
  status: string;
}
const BeneficiarySchema: Schema = new Schema({
    name: { type: String, required: true },
    idNumber: { type: String, required: true },
  });

const ProviderSchema: Schema = new Schema({
  nit: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true },
  providerType: { type: String, required: true },
  personType: { type: String, required: true },
  beneficiaries: {type:[BeneficiarySchema], required: true },
  baknDetails: {
    bank: String,
    accountNumber: String,
    accountType: String,
  },
  status: { type: String, default: 'Pending Vallidation' },
});

export default mongoose.model<IProvider>('Provider',ProviderSchema);
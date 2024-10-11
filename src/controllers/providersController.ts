import { Request, Response } from "express";
import Provider, { IProvider } from "../models/Provider";

function handleErrorResponse(res: Response, error: unknown) {
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error occurred" });
  }
}

export const createProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newProvider: IProvider = new Provider(req.body);
  try {
    const saveProvider = await newProvider.save();
    res.status(201).json(saveProvider);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updateProvider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateProvider);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const provider = await Provider.findById(req.params.id);
    res.status(200).json(provider);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
export const getAllProvider = async(req:Request, res:Response): Promise<void>=>{
  try{
    const providers = await Provider.find();
    res.status(200).json(providers)
  }catch(error){
    handleErrorResponse(res,error)
  }
}

export const deleteProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    provider
      ? res.status(200).json({ message: "Provider delete succesful" })
      : res.status(404).json({ message: "Provider not found" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateProvider = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const provider = await Provider.findById(req.params.id);
    provider
      ? res.status(200).json(provider)
      : res.status(404).json({ message: "Provider not found" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

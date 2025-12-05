import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  singleUserService,
  updateUserService,
} from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserService(req.body);
    if (result.rowCount === 1) {
      res.status(200).json({
        success: true,
        message: "data inserted successfully",
        data: result.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "data inserted unsuccessfully",
      error: error,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsersService();
    res.status(200).json({
      success: true,
      message: "User get successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User get unsuccessfully",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await singleUserService(id as number | string);
    if (result.rows.length === 1) {
      res.status(200).json({
        success: true,
        message: "User get successfully",
        data: result.rows,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "User get unsuccessfully",
        data: result.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User get unsuccessfully",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const result = await updateUserService(name, email, id as string | number);
    if (result.rows.length === 1) {
      res.status(200).json({
        success: true,
        message: "User update successfully",
        data: result.rows,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "User update unsuccessfully",
        data: result.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User get unsuccessfully",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await deleteUserService(id as string | number);
    if (result.rowCount === 1) {
      res.status(200).json({
        success: false,
        message: "User Delete Successfully",
        data: result.rows,
      });
    } else {
      res.status(400).json({
        success: true,
        message: "User deleted unsuccessfully",
        data: result.rows,
      });
    }
    console.log(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User deleted unsuccessfully",
      error: error,
    });
  }
  res.status(200).json({
    success: true,
    message: "User Deleted successfully",
  });
};

export const User = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
